import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, Eye, Plus, Trash2, Copy, ArrowUp, ArrowDown, Settings,
  Type, Image as ImageIcon, MousePointer, Grid, Columns, Square,
  Heading, Minus, FileText, Star, BarChart2, Layout, Menu, X, Upload, Check
} from 'lucide-react';
import { toast } from 'sonner';
import { LayoutPanel } from './panels/LayoutPanel';
import { SpacingPanel } from './panels/SpacingPanel';
import { BackgroundPanel } from './panels/BackgroundPanel';
import { BorderPanel } from './panels/BorderPanel';
import { ShadowPanel } from './panels/ShadowPanel';
import { TypographyPanel } from './panels/TypographyPanel';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  children?: Component[];
  order: number;
}

interface Page {
  page_id: string;
  page_name: string;
  route: string;
  components: Component[];
  is_published: boolean;
  meta: Record<string, any>;
}

interface ElementorPageBuilderProps {
  pageId: string;
  token: string;
  onBack: () => void;
}

const iconMap: Record<string, any> = {
  Type, Image: ImageIcon, MousePointer, Layout, Grid, Columns,
  FileText, Star, BarChart2, Minus, Square, Heading
};

export function ElementorPageBuilder({ pageId, token, onBack }: ElementorPageBuilderProps) {
  const [page, setPage] = useState<Page | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [componentTemplates, setComponentTemplates] = useState<any[]>([]);
  const [draggedTemplate, setDraggedTemplate] = useState<any>(null);
  const [draggedComponent, setDraggedComponent] = useState<{ component: Component; sourceIndex: number } | null>(null);
  const [dropTarget, setDropTarget] = useState<{ index: number; position: 'before' | 'after' | 'inside' } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
    loadComponentTemplates();
  }, [pageId]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isEditing = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.isContentEditable;
      
      if (isEditing) return; // Don't interfere with text editing
      
      if (selectedComponent) {
        // Only Delete key deletes components (not Backspace)
        if (e.key === 'Delete') {
          e.preventDefault();
          deleteComponent(selectedComponent.id);
        } else if (e.key === 'Escape') {
          setSelectedComponent(null);
        } else if (e.ctrlKey && e.key === 'd') {
          e.preventDefault();
          duplicateComponent(selectedComponent);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedComponent, page]);

  const loadPage = async () => {
    try {
      const res = await fetch(`${API_URL}/pages/${pageId}?token=${token}`);
      const data = await res.json();
      setPage(data);
    } catch (e) {
      toast.error('Failed to load page');
    }
  };

  const loadComponentTemplates = async () => {
    try {
      const res = await fetch(`${API_URL}/components/templates`);
      const data = await res.json();
      setComponentTemplates(data.components || []);
    } catch (e) {
      console.error('Failed to load templates');
    }
  };

  const savePage = async () => {
    if (!page) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/pages/${page.page_id}?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(page)
      });
      
      if (res.ok) {
        toast.success('Page saved successfully');
        await loadPage(); // Reload to get updated data
      }
    } catch (e) {
      toast.error('Failed to save page');
    } finally {
      setIsLoading(false);
    }
  };

  const publishPage = async () => {
    if (!page) return;
    
    try {
      await fetch(`${API_URL}/pages/${page.page_id}/publish?token=${token}`, {
        method: 'POST'
      });
      toast.success('✅ Page published');
      await loadPage(); // Reload to get updated status
    } catch (e) {
      toast.error('Failed to publish');
    }
  };

  const unpublishPage = async () => {
    if (!page) return;
    
    try {
      await fetch(`${API_URL}/pages/${page.page_id}/unpublish?token=${token}`, {
        method: 'POST'
      });
      toast.success('Page unpublished');
      await loadPage(); // Reload to get updated status
    } catch (e) {
      toast.error('Failed to unpublish');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingFor) return;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token);
    
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success && selectedComponent) {
        // Update the component with the uploaded image URL
        if (uploadingFor === 'image') {
          updateComponent(selectedComponent.id, {
            props: { ...selectedComponent.props, src: data.url }
          });
        } else if (uploadingFor === 'backgroundImage') {
          updateComponent(selectedComponent.id, {
            props: { ...selectedComponent.props, backgroundImage: data.url }
          });
        }
        toast.success('✅ Image uploaded');
      }
    } catch (e) {
      toast.error('Upload failed');
    } finally {
      setUploadingFor(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const updateComponentStyles = (componentId: string, newStyles: any) => {
    if (!page) return;
    
    const updateInTree = (components: Component[]): Component[] => {
      return components.map(comp => {
        if (comp.id === componentId) {
          const updated = { ...comp, styles: { ...comp.styles, ...newStyles } };
          if (selectedComponent?.id === componentId) setSelectedComponent(updated);
          return updated;
        }
        if (comp.children) {
          return { ...comp, children: updateInTree(comp.children) };
        }
        return comp;
      });
    };
    
    setPage({
      ...page,
      components: updateInTree(page.components)
    });
  };

  const handleImageUploadForPanel = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token);
    
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('✅ Image uploaded');
        return data.url;
      }
      throw new Error('Upload failed');
    } catch (error) {
      toast.error('❌ Upload failed');
      throw error;
    }
  };

  const getStyleString = (styles: any): React.CSSProperties => {
    const css: any = {};
    
    // Layout with unit support
    if (styles.width) css.width = `${styles.width}${styles.widthUnit || 'px'}`;
    if (styles.height) css.height = `${styles.height}${styles.heightUnit || 'px'}`;
    if (styles.minHeight) css.minHeight = `${styles.minHeight}${styles.minHeightUnit || 'px'}`;
    if (styles.flexDirection) css.flexDirection = styles.flexDirection;
    if (styles.justifyContent) css.justifyContent = styles.justifyContent;
    if (styles.alignItems) css.alignItems = styles.alignItems;
    if (styles.gap) css.gap = `${styles.gap}${styles.gapUnit || 'px'}`;
    if (styles.display) css.display = styles.display;
    
    // Spacing
    if (styles.margin) {
      css.marginTop = `${styles.margin.top}px`;
      css.marginRight = `${styles.margin.right}px`;
      css.marginBottom = `${styles.margin.bottom}px`;
      css.marginLeft = `${styles.margin.left}px`;
    }
    if (styles.padding) {
      css.paddingTop = `${styles.padding.top}px`;
      css.paddingRight = `${styles.padding.right}px`;
      css.paddingBottom = `${styles.padding.bottom}px`;
      css.paddingLeft = `${styles.padding.left}px`;
    }
    
    // Background
    if (styles.backgroundColor) css.backgroundColor = styles.backgroundColor;
    if (styles.backgroundImage) {
      css.backgroundImage = `url(${styles.backgroundImage})`;
      css.backgroundPosition = styles.backgroundPosition || 'center center';
      css.backgroundSize = styles.backgroundSize || 'cover';
      css.backgroundRepeat = styles.backgroundRepeat || 'no-repeat';
      css.backgroundAttachment = styles.backgroundAttachment || 'scroll';
    }
    
    // Overlay
    if (styles.overlayColor && styles.overlayOpacity) {
      css.position = 'relative';
    }
    
    // Border
    if (styles.borderStyle && styles.borderStyle !== 'none') {
      css.borderStyle = styles.borderStyle;
      css.borderWidth = `${styles.borderWidth || 1}px`;
      css.borderColor = styles.borderColor || '#000000';
    }
    if (styles.borderRadius) {
      css.borderTopLeftRadius = `${styles.borderRadius.top}px`;
      css.borderTopRightRadius = `${styles.borderRadius.right}px`;
      css.borderBottomRightRadius = `${styles.borderRadius.bottom}px`;
      css.borderBottomLeftRadius = `${styles.borderRadius.left}px`;
    }
    
    // Shadow
    if (styles.boxShadowH !== undefined || styles.boxShadowV !== undefined) {
      const h = styles.boxShadowH || 0;
      const v = styles.boxShadowV || 0;
      const blur = styles.boxShadowBlur || 0;
      const spread = styles.boxShadowSpread || 0;
      const color = styles.boxShadowColor || 'rgba(0,0,0,0.3)';
      css.boxShadow = `${h}px ${v}px ${blur}px ${spread}px ${color}`;
    }
    
    // Typography
    if (styles.fontFamily) css.fontFamily = styles.fontFamily;
    if (styles.fontSize) css.fontSize = `${styles.fontSize}px`;
    if (styles.fontWeight) css.fontWeight = styles.fontWeight;
    if (styles.fontStyle) css.fontStyle = styles.fontStyle;
    if (styles.textDecoration) css.textDecoration = styles.textDecoration;
    if (styles.lineHeight) css.lineHeight = styles.lineHeight;
    if (styles.letterSpacing) css.letterSpacing = `${styles.letterSpacing}px`;
    if (styles.textAlign) css.textAlign = styles.textAlign;
    if (styles.textTransform) css.textTransform = styles.textTransform;
    if (styles.color) css.color = styles.color;
    
    return css;
  };

    // Drag and drop handlers for templates
  const handleTemplateDragStart = (e: React.DragEvent, template: any) => {
    setDraggedTemplate(template);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleTemplateDragEnd = () => {
    setDraggedTemplate(null);
    setDropTarget(null);
  };

  // Drag and drop handlers for existing components
  const handleComponentDragStart = (e: React.DragEvent, component: Component, index: number) => {
    setDraggedComponent({ component, sourceIndex: index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleComponentDragEnd = () => {
    setDraggedComponent(null);
    setDropTarget(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number, canHaveChildren: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    
    if (canHaveChildren && y > height * 0.3 && y < height * 0.7) {
      setDropTarget({ index, position: 'inside' });
    } else if (y < height / 2) {
      setDropTarget({ index, position: 'before' });
    } else {
      setDropTarget({ index, position: 'after' });
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!page) return;

    const components = [...page.components];
    
    if (draggedTemplate) {
      // Adding new component from template
      const newComponent: Component = {
        id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: draggedTemplate.type,
        props: { ...draggedTemplate.defaultProps },
        styles: { ...draggedTemplate.defaultStyles },
        children: [],
        order: 0
      };
      
      if (dropTarget?.position === 'inside') {
        // Add as child
        const parent = components[targetIndex];
        if (parent && (parent.type === 'section' || parent.type === 'flexbox' || parent.type === 'grid')) {
          parent.children = parent.children || [];
          parent.children.push(newComponent);
        }
      } else if (dropTarget?.position === 'before') {
        components.splice(targetIndex, 0, newComponent);
      } else {
        components.splice(targetIndex + 1, 0, newComponent);
      }
      
      toast.success(`${draggedTemplate.name} added`);
    } else if (draggedComponent) {
      // Moving existing component
      const { component, sourceIndex } = draggedComponent;
      
      if (sourceIndex === targetIndex) return;
      
      components.splice(sourceIndex, 1);
      const newIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      
      if (dropTarget?.position === 'inside') {
        const parent = components[newIndex];
        if (parent && (parent.type === 'section' || parent.type === 'flexbox' || parent.type === 'grid')) {
          parent.children = parent.children || [];
          parent.children.push(component);
        }
      } else if (dropTarget?.position === 'before') {
        components.splice(newIndex, 0, component);
      } else {
        components.splice(newIndex + 1, 0, component);
      }
    }
    
    // Update orders
    components.forEach((c, i) => c.order = i);
    
    setPage({ ...page, components });
    setDraggedTemplate(null);
    setDraggedComponent(null);
    setDropTarget(null);
  };

  const addComponent = (template: any) => {
    if (!page) return;
    
    const newComponent: Component = {
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: template.type,
      props: { ...template.defaultProps },
      styles: { ...template.defaultStyles },
      children: [],
      order: page.components.length
    };
    
    setPage({
      ...page,
      components: [...page.components, newComponent]
    });
    setSelectedComponent(newComponent);
    toast.success(`${template.name} added`);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    if (!page) return;
    
    const updateInTree = (components: Component[]): Component[] => {
      return components.map(comp => {
        if (comp.id === id) {
          const updated = { ...comp, ...updates };
          if (selectedComponent?.id === id) setSelectedComponent(updated);
          return updated;
        }
        if (comp.children) {
          return { ...comp, children: updateInTree(comp.children) };
        }
        return comp;
      });
    };
    
    setPage({
      ...page,
      components: updateInTree(page.components)
    });
  };

  const deleteComponent = (id: string) => {
    if (!page) return;
    
    const removeFromTree = (components: Component[]): Component[] => {
      return components.filter(comp => {
        if (comp.id === id) return false;
        if (comp.children) {
          comp.children = removeFromTree(comp.children);
        }
        return true;
      });
    };
    
    setPage({
      ...page,
      components: removeFromTree(page.components)
    });
    
    if (selectedComponent?.id === id) setSelectedComponent(null);
    toast.success('Component deleted');
  };

  const duplicateComponent = (comp: Component) => {
    if (!page) return;
    
    const deepClone = (obj: any): any => JSON.parse(JSON.stringify(obj));
    const newComp = deepClone(comp);
    newComp.id = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    newComp.order = page.components.length;
    
    // Update IDs for all children
    const updateIds = (component: Component) => {
      component.id = `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      if (component.children) {
        component.children.forEach(updateIds);
      }
    };
    if (newComp.children) {
      newComp.children.forEach(updateIds);
    }
    
    setPage({
      ...page,
      components: [...page.components, newComp]
    });
    toast.success('Component duplicated');
  };

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    if (!page) return;
    
    const components = [...page.components];
    const index = components.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= components.length) return;
    
    [components[index], components[newIndex]] = [components[newIndex], components[index]];
    components.forEach((c, i) => c.order = i);
    
    setPage({ ...page, components });
  };

  const renderComponent = (comp: Component, index: number, isChild = false): React.ReactElement => {
    const isSelected = selectedComponent?.id === comp.id;
    const canHaveChildren = ['section', 'flexbox', 'grid'].includes(comp.type);
    const isDropBefore = dropTarget?.index === index && dropTarget?.position === 'before';
    const isDropAfter = dropTarget?.index === index && dropTarget?.position === 'after';
    const isDropInside = dropTarget?.index === index && dropTarget?.position === 'inside';
    
    // Use getStyleString to apply all styles with proper units
    const style = getStyleString(comp.styles);
    
    const componentContent = (() => {
      switch (comp.type) {
        case 'text':
          return <p style={style}>{comp.props.content}</p>;
        
        case 'heading':
          const HeadingTag = comp.props.tag || 'h2';
          return React.createElement(HeadingTag, { style }, comp.props.content);
        
        case 'image':
          return comp.props.src ? (
            <img src={comp.props.src} alt={comp.props.alt} style={{ width: '100%', objectFit: comp.props.objectFit }} />
          ) : (
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
              <ImageIcon size={40} />
            </div>
          );
        
        case 'button':
          return (
            <button style={style} className="px-4 py-2 rounded">
              {comp.props.text}
            </button>
          );
        
        case 'section':
        case 'flexbox':
          return (
            <div 
              style={{ 
                ...style,
                display: 'flex',
                minHeight: '100px',
                border: isDropInside ? '2px solid #3b82f6' : '1px dashed #ddd',
                backgroundColor: isDropInside ? '#eff6ff' : style.backgroundColor
              }}
              onDragOver={(e) => handleDragOver(e, index, true)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {comp.children && comp.children.length > 0 ? (
                comp.children.map((child, childIndex) => (
                  <div key={child.id} className="flex-1">
                    {renderComponent(child, childIndex, true)}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center w-full">
                  Drop components here
                </div>
              )}
            </div>
          );
        
        case 'grid':
          return (
            <div 
              style={{ 
                ...style,
                display: 'grid',
                gridTemplateColumns: `repeat(${comp.props.columns || 3}, 1fr)`,
                minHeight: '100px',
                border: isDropInside ? '2px solid #3b82f6' : '1px dashed #ddd',
                backgroundColor: isDropInside ? '#eff6ff' : style.backgroundColor
              }}
              onDragOver={(e) => handleDragOver(e, index, true)}
              onDrop={(e) => handleDrop(e, index)}
            >
              {comp.children && comp.children.length > 0 ? (
                comp.children.map((child, childIndex) => renderComponent(child, childIndex, true))
              ) : (
                <div className="text-gray-400 text-center col-span-full">
                  Drop components here
                </div>
              )}
            </div>
          );

        case 'form':
          return (
            <div style={style} className="p-6 bg-white rounded-lg shadow">
              <h3 className="font-bold mb-4 text-xl">{comp.props.heading}</h3>
              {comp.props.fields?.map((field: any, i: number) => (
                <div key={i} className="mb-4">
                  <label className="block text-sm font-medium mb-2">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      placeholder={field.label}
                      rows={4}
                    />
                  ) : (
                    <input 
                      type={field.type} 
                      className="w-full border border-gray-300 rounded px-3 py-2" 
                      placeholder={field.label} 
                    />
                  )}
                </div>
              ))}
              <button 
                className="w-full font-bold py-3 rounded mt-2"
                style={{
                  backgroundColor: comp.styles.buttonColor || '#F59E0B',
                  color: comp.styles.buttonTextColor || '#000000'
                }}
              >
                {comp.props.buttonText}
              </button>
            </div>
          );
        
        case 'hero':
          return (
            <div 
              style={{ 
                ...style,
                backgroundImage: comp.props.backgroundImage ? `url(${comp.props.backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                minHeight: '400px',
                padding: '80px 40px'
              }}
            >
              {comp.props.overlayColor && (
                <div style={{ 
                  position: 'absolute', 
                  inset: 0, 
                  backgroundColor: comp.props.overlayColor,
                  opacity: comp.props.overlayOpacity || 0.5
                }} />
              )}
              <div style={{ position: 'relative', zIndex: 1 }} className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{comp.props.title}</h1>
                <p className="text-xl text-white/90 mb-6">{comp.props.subtitle}</p>
                {comp.props.buttonText && (
                  <button className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600">
                    {comp.props.buttonText}
                  </button>
                )}
              </div>
            </div>
          );
        
        case 'stats':
          return (
            <div className="flex flex-wrap gap-8 justify-center" style={style}>
              {comp.props.items?.map((item: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-4xl font-bold text-blue-600">{item.number}</div>
                  <div className="text-sm text-gray-600 mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          );
        
        case 'divider':
          return <hr style={style} className="my-4" />;
        
        case 'spacer':
          return <div style={{ height: comp.props.height || '40px', ...style }} />;
        
        default:
          return <div className="p-4 bg-gray-100 rounded">Unknown: {comp.type}</div>;
      }
    })();

    return (
      <div key={comp.id} className="relative">
        {isDropBefore && (
          <div className="h-1 bg-blue-500 rounded mb-2" />
        )}
        
        <div
          draggable={!isChild}
          onDragStart={(e) => !isChild && handleComponentDragStart(e, comp, index)}
          onDragEnd={handleComponentDragEnd}
          onDragOver={(e) => handleDragOver(e, index, canHaveChildren)}
          onDrop={(e) => handleDrop(e, index)}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedComponent(comp);
          }}
          className={`
            relative transition-all cursor-move
            ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}
            ${isChild ? 'mb-0' : 'mb-4'}
          `}
          style={style}
        >
          {isSelected && (
            <div className="absolute -top-8 left-0 bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center gap-2 z-10">
              <span>{comp.type}</span>
              <button onClick={(e) => { e.stopPropagation(); moveComponent(comp.id, 'up'); }} className="hover:bg-blue-600 px-1 rounded">
                <ArrowUp size={12} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); moveComponent(comp.id, 'down'); }} className="hover:bg-blue-600 px-1 rounded">
                <ArrowDown size={12} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); duplicateComponent(comp); }} className="hover:bg-blue-600 px-1 rounded">
                <Copy size={12} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} className="hover:bg-red-600 px-1 rounded">
                <Trash2 size={12} />
              </button>
            </div>
          )}
          
          {componentContent}
        </div>
        
        {isDropAfter && (
          <div className="h-1 bg-blue-500 rounded mt-2" />
        )}
      </div>
    );
  };

  if (!page) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <X size={20} />
          </button>
          <div>
            <h1 className="font-bold text-lg">{page.page_name}</h1>
            <p className="text-sm text-gray-500">
              {page.route}
              <span className="mx-2">•</span>
              <span className={page.is_published ? 'text-green-600' : 'text-yellow-600'}>
                {page.is_published ? '✅ Published' : '📝 Draft'}
              </span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2"
          >
            <Eye size={18} />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
          <button 
            onClick={savePage} 
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={18} />
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          {page.is_published ? (
            <button 
              onClick={unpublishPage}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded flex items-center gap-2"
            >
              <X size={18} />
              Unpublish
            </button>
          ) : (
            <button 
              onClick={publishPage}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-2"
            >
              <Check size={18} />
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Components */}
        {!showPreview && (
          <div className="w-64 bg-white border-r overflow-y-auto p-4">
            <h3 className="font-semibold mb-4">Components</h3>
            <p className="text-xs text-gray-500 mb-4">Drag to canvas</p>
            
            <div className="space-y-2">
              {componentTemplates.map(template => {
                const IconComp = iconMap[template.icon] || Square;
                return (
                  <div
                    key={template.type}
                    draggable
                    onDragStart={(e) => handleTemplateDragStart(e, template)}
                    onDragEnd={handleTemplateDragEnd}
                    onClick={() => addComponent(template)}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg cursor-move transition-all"
                  >
                    <IconComp size={20} className="text-gray-600" />
                    <span className="text-sm font-medium">{template.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg min-h-screen">
            {showPreview ? (
              <div className="p-8">
                {page.components.map((comp, index) => (
                  <div key={comp.id} className="mb-4">
                    {renderComponent(comp, index)}
                  </div>
                ))}
              </div>
            ) : (
              <div 
                className="p-8"
                onDragOver={(e) => {
                  e.preventDefault();
                  if (page.components.length === 0) {
                    e.dataTransfer.dropEffect = 'copy';
                  }
                }}
                onDrop={(e) => {
                  if (page.components.length === 0 && draggedTemplate) {
                    e.preventDefault();
                    addComponent(draggedTemplate);
                  }
                }}
              >
                {page.components.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-400">
                    <Layout size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Drag components here to start building</p>
                    <p className="text-sm mt-2">or click on components to add them</p>
                  </div>
                ) : (
                  page.components.map((comp, index) => renderComponent(comp, index))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Style Controls */}
        {!showPreview && selectedComponent && (
          <div className="w-80 bg-white border-l overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 z-10">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">
                  {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Settings
                </h3>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            <div className="pb-20">
              {/* Content Properties Section */}
              <div className="border-b p-4">
                <h4 className="font-semibold mb-3 text-sm text-gray-700">Content</h4>
                
                {selectedComponent.type === 'text' && (
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-600">Text Content</label>
                    <textarea
                      value={selectedComponent.props.content || ''}
                      onChange={(e) => updateComponent(selectedComponent.id, {
                        props: { ...selectedComponent.props, content: e.target.value }
                      })}
                      className="w-full border rounded px-3 py-2 text-sm"
                      rows={4}
                    />
                  </div>
                )}

                {selectedComponent.type === 'heading' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Heading Text</label>
                      <input
                        type="text"
                        value={selectedComponent.props.content || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, content: e.target.value }
                        })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Heading Tag</label>
                      <select
                        value={selectedComponent.props.tag || 'h2'}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, tag: e.target.value }
                        })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      >
                        <option value="h1">H1</option>
                        <option value="h2">H2</option>
                        <option value="h3">H3</option>
                        <option value="h4">H4</option>
                        <option value="h5">H5</option>
                        <option value="h6">H6</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedComponent.type === 'button' && (
                  <div>
                    <label className="block text-xs font-medium mb-2 text-gray-600">Button Text</label>
                    <input
                      type="text"
                      value={selectedComponent.props.text || ''}
                      onChange={(e) => updateComponent(selectedComponent.id, {
                        props: { ...selectedComponent.props, text: e.target.value }
                      })}
                      className="w-full border rounded px-3 py-2 text-sm"
                    />
                  </div>
                )}

                {selectedComponent.type === 'image' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Image URL</label>
                      <input
                        type="text"
                        value={selectedComponent.props.src || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, src: e.target.value }
                        })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border rounded px-3 py-2 mb-2 text-sm"
                      />
                      <button
                        onClick={() => {
                          setUploadingFor('image');
                          fileInputRef.current?.click();
                        }}
                        className="w-full px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center gap-2 text-sm"
                      >
                        <Upload size={14} />
                        Upload Image
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Alt Text</label>
                      <input
                        type="text"
                        value={selectedComponent.props.alt || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, alt: e.target.value }
                        })}
                        placeholder="Image description"
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                )}

                {selectedComponent.type === 'hero' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Title</label>
                      <input
                        type="text"
                        value={selectedComponent.props.title || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, title: e.target.value }
                        })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Subtitle</label>
                      <input
                        type="text"
                        value={selectedComponent.props.subtitle || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, subtitle: e.target.value }
                        })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 text-gray-600">Button Text</label>
                      <input
                        type="text"
                        value={selectedComponent.props.buttonText || ''}
                        onChange={(e) => updateComponent(selectedComponent.id, {
                          props: { ...selectedComponent.props, buttonText: e.target.value }
                        })}
                        className="w-full border rounded px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Phase 1 & 2 Panels */}
              <LayoutPanel
                styles={selectedComponent.styles}
                onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
                componentType={selectedComponent.type}
              />
              
              <SpacingPanel
                styles={selectedComponent.styles}
                onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
              />
              
              <BackgroundPanel
                styles={selectedComponent.styles}
                onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
                onUpload={handleImageUploadForPanel}
              />
              
              <BorderPanel
                styles={selectedComponent.styles}
                onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
              />
              
              <ShadowPanel
                styles={selectedComponent.styles}
                onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
              />
              
              {/* Typography Panel - Only for text elements */}
              {['text', 'heading', 'button'].includes(selectedComponent.type) && (
                <TypographyPanel
                  styles={selectedComponent.styles}
                  onChange={(newStyles) => updateComponentStyles(selectedComponent.id, newStyles)}
                />
              )}

              {/* Actions */}
              <div className="border-t p-4 space-y-2">
                <button
                  onClick={() => duplicateComponent(selectedComponent)}
                  className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Copy size={16} />
                  Duplicate
                </button>
                <button
                  onClick={() => deleteComponent(selectedComponent.id)}
                  className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  Delete (Del)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
}
