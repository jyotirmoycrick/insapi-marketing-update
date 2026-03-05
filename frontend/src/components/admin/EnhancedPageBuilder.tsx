import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut, Save, Plus, Trash2, 
  Edit3, Home, Menu, X, ChevronDown, ChevronRight, Image, Type, MousePointer,
  Grid, Columns, Star, BarChart2, Minus, Square, Eye, Upload, Copy, Move,
  Palette, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Heading,
  ArrowUp, ArrowDown, Check, RefreshCw, ExternalLink, Mail, Server,
  Smartphone, Tablet, Monitor, Layers, Undo, Redo, ZoomIn, ZoomOut, Play
} from 'lucide-react';
import logo from '@/assets/shared/logo.png';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Icon mapping
const iconMap: Record<string, any> = {
  Type, Image, MousePointer, Layout: LayoutDashboard, Grid, Columns, 
  FileText, Star, BarChart2, Minus, Square, Heading
};

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

// Drag & Drop Types
const DND_TYPES = {
  COMPONENT_TEMPLATE: 'component_template',
  COMPONENT_INSTANCE: 'component_instance',
};

// Draggable Component from Library
function DraggableComponentTemplate({ template }: { template: any }) {
  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.COMPONENT_TEMPLATE,
    item: { template },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const IconComp = iconMap[template.icon] || Square;

  return (
    <button
      ref={drag}
      className={`flex flex-col items-center gap-1 p-2 bg-white border rounded hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
      title={template.name}
    >
      <IconComp size={20} className="text-gray-600" />
      <span className="text-xs text-gray-700 truncate w-full text-center">{template.name}</span>
    </button>
  );
}

// Droppable Canvas Area
function DroppableCanvas({ 
  children, 
  onDrop, 
  isOver 
}: { 
  children: React.ReactNode; 
  onDrop: (item: any, index: number) => void;
  isOver: boolean;
}) {
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: [DND_TYPES.COMPONENT_TEMPLATE, DND_TYPES.COMPONENT_INSTANCE],
    drop: (item: any, monitor) => {
      if (!monitor.didDrop()) {
        onDrop(item, -1); // Add to end
      }
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  });

  return (
    <div
      ref={drop}
      className={`min-h-full rounded-lg p-4 transition-colors ${
        canDrop && isOverCurrent ? 'bg-blue-50 border-2 border-blue-400 border-dashed' : ''
      }`}
    >
      {children}
    </div>
  );
}

// Draggable Component Instance
function DraggableComponent({ 
  component, 
  index, 
  onSelect, 
  isSelected, 
  onMove, 
  renderComponent 
}: { 
  component: Component; 
  index: number; 
  onSelect: () => void; 
  isSelected: boolean; 
  onMove: (dragIndex: number, hoverIndex: number) => void;
  renderComponent: (comp: Component) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DND_TYPES.COMPONENT_INSTANCE,
    item: { component, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: DND_TYPES.COMPONENT_INSTANCE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      onClick={onSelect}
      className={`mb-2 transition-all ${isDragging ? 'opacity-30' : ''} ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'
      }`}
    >
      {renderComponent(component)}
    </div>
  );
}

export function EnhancedPageBuilder() {
  const [activeTab, setActiveTab] = useState('builder');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [componentTemplates, setComponentTemplates] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [smtpSettings, setSmtpSettings] = useState({
    smtp_host: '', smtp_port: 587, smtp_user: '', smtp_pass: '',
    admin_email: 'malojyotirmoy@gmail.com', sender_name: 'InsAPI Marketing'
  });
  const [uploads, setUploads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showLayers, setShowLayers] = useState(true);
  const [history, setHistory] = useState<Page[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!token) {
      navigate('/fast-admin');
      return;
    }
    verifyAndLoad();
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (!selectedPage || !selectedPage.page_id) return;

    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    const timer = setTimeout(() => {
      savePage(true); // Silent save
    }, 3000); // Auto-save after 3 seconds of inactivity

    setAutoSaveTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [selectedPage?.components]);

  // Add to history when page changes
  useEffect(() => {
    if (!selectedPage) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(selectedPage)));
    setHistory(newHistory.slice(-20)); // Keep last 20 states
    setHistoryIndex(newHistory.length - 1);
  }, [selectedPage?.components.length]); // Only on structural changes

  const verifyAndLoad = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/verify?token=${token}`);
      const data = await res.json();
      if (!data.valid) {
        handleLogout();
        return;
      }
      loadComponentTemplates();
      loadPages();
      loadContacts();
      loadSmtpSettings();
      loadUploads();
    } catch (e) {
      handleLogout();
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

  const loadPages = async () => {
    try {
      const res = await fetch(`${API_URL}/pages?token=${token}`);
      const data = await res.json();
      setPages(data);
      if (data.length > 0 && !selectedPage) {
        setSelectedPage(data[0]);
      }
    } catch (e) {
      toast.error('Failed to load pages');
    }
  };

  const loadContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts?token=${token}`);
      setContacts(await res.json());
    } catch (e) {}
  };

  const loadSmtpSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings/smtp?token=${token}`);
      const data = await res.json();
      if (data) setSmtpSettings(data);
    } catch (e) {}
  };

  const loadUploads = async () => {
    try {
      const res = await fetch(`${API_URL}/uploads?token=${token}`);
      setUploads(await res.json());
    } catch (e) {}
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/fast-admin');
  };

  // Page operations
  const createNewPage = async () => {
    const pageName = prompt('Enter page name:');
    if (!pageName) return;
    
    const route = '/' + pageName.toLowerCase().replace(/\s+/g, '-');
    const pageId = pageName.toLowerCase().replace(/\s+/g, '-');
    
    try {
      const res = await fetch(`${API_URL}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: pageId,
          page_name: pageName,
          route,
          components: [],
          is_published: false,
          meta: {}
        })
      });
      
      const body = await res.text();
      const data = body ? JSON.parse(body) : {};
      
      if (res.ok) {
        toast.success('Page created');
        loadPages();
      }
    } catch (e) {
      toast.error('Failed to create page');
    }
  };

  const savePage = async (silent = false) => {
    if (!selectedPage) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/pages/${selectedPage.page_id}?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPage)
      });
      
      if (res.ok) {
        if (!silent) toast.success('Page saved');
        loadPages();
      }
    } catch (e) {
      if (!silent) toast.error('Failed to save page');
    } finally {
      setIsLoading(false);
    }
  };

  const publishPage = async () => {
    if (!selectedPage) return;
    
    try {
      await fetch(`${API_URL}/pages/${selectedPage.page_id}/publish?token=${token}`, {
        method: 'POST'
      });
      toast.success('Page published');
      loadPages();
      setSelectedPage({ ...selectedPage, is_published: true });
    } catch (e) {
      toast.error('Failed to publish');
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Delete this page?')) return;
    
    try {
      await fetch(`${API_URL}/pages/${pageId}?token=${token}`, { method: 'DELETE' });
      toast.success('Page deleted');
      loadPages();
      if (selectedPage?.page_id === pageId) setSelectedPage(null);
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  // Undo/Redo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSelectedPage(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSelectedPage(JSON.parse(JSON.stringify(history[newIndex])));
    }
  };

  // Component operations
  const handleDrop = (item: any, targetIndex: number) => {
    if (!selectedPage) return;

    if (item.template) {
      // Dropping from template library
      const newComponent: Component = {
        id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: item.template.type,
        props: { ...item.template.defaultProps },
        styles: { ...item.template.defaultStyles },
        children: [],
        order: targetIndex === -1 ? selectedPage.components.length : targetIndex
      };
      
      const newComponents = [...selectedPage.components];
      if (targetIndex === -1) {
        newComponents.push(newComponent);
      } else {
        newComponents.splice(targetIndex, 0, newComponent);
      }
      
      // Update order
      newComponents.forEach((c, i) => c.order = i);
      
      setSelectedPage({
        ...selectedPage,
        components: newComponents
      });
      setSelectedComponent(newComponent);
      toast.success(`${item.template.name} added`);
    }
  };

  const moveComponent = (dragIndex: number, hoverIndex: number) => {
    if (!selectedPage) return;
    
    const components = [...selectedPage.components];
    const draggedComponent = components[dragIndex];
    
    components.splice(dragIndex, 1);
    components.splice(hoverIndex, 0, draggedComponent);
    
    // Update order
    components.forEach((c, i) => c.order = i);
    
    setSelectedPage({ ...selectedPage, components });
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    if (!selectedPage) return;
    
    const updateComponents = (components: Component[]): Component[] => {
      return components.map(comp => {
        if (comp.id === id) {
          const updated = { ...comp, ...updates };
          if (selectedComponent?.id === id) setSelectedComponent(updated);
          return updated;
        }
        if (comp.children) {
          return { ...comp, children: updateComponents(comp.children) };
        }
        return comp;
      });
    };
    
    setSelectedPage({
      ...selectedPage,
      components: updateComponents(selectedPage.components)
    });
  };

  const deleteComponent = (id: string) => {
    if (!selectedPage) return;
    
    const removeComponent = (components: Component[]): Component[] => {
      return components.filter(comp => {
        if (comp.id === id) return false;
        if (comp.children) {
          comp.children = removeComponent(comp.children);
        }
        return true;
      });
    };
    
    setSelectedPage({
      ...selectedPage,
      components: removeComponent(selectedPage.components)
    });
    if (selectedComponent?.id === id) setSelectedComponent(null);
    toast.success('Component deleted');
  };

  const duplicateComponent = (comp: Component) => {
    if (!selectedPage) return;
    
    const newComp = {
      ...JSON.parse(JSON.stringify(comp)),
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      order: selectedPage.components.length
    };
    
    setSelectedPage({
      ...selectedPage,
      components: [...selectedPage.components, newComp]
    });
    toast.success('Component duplicated');
  };

  // File upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token!);
    
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('File uploaded');
        loadUploads();
        
        if (selectedComponent?.type === 'image') {
          updateComponent(selectedComponent.id, {
            props: { ...selectedComponent.props, src: data.url }
          });
        }
        
        return data.url;
      }
    } catch (e) {
      toast.error('Upload failed');
    }
    return null;
  };

  // SMTP settings
  const saveSmtpSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings/smtp?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpSettings)
      });
      if (res.ok) toast.success('SMTP settings saved');
    } catch (e) {
      toast.error('Failed to save settings');
    }
  };

  const testEmail = async () => {
    try {
      const res = await fetch(`${API_URL}/settings/test-email?token=${token}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) toast.success('Test email sent');
      else toast.error(data.message);
    } catch (e) {
      toast.error('Failed to send test email');
    }
  };

  // Render component preview
  const renderComponentPreview = (comp: Component) => {
    const isSelected = selectedComponent?.id === comp.id;
    const baseClasses = `relative cursor-pointer transition-all rounded ${
      isSelected ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-gray-300'
    }`;

    const style = comp.styles || {};

    switch (comp.type) {
      case 'text':
        return (
          <div className={baseClasses} style={style}>
            <p style={{ textAlign: comp.props.align }}>{comp.props.content}</p>
          </div>
        );
      
      case 'heading':
        const Tag = comp.props.tag as keyof JSX.IntrinsicElements || 'h2';
        return (
          <div className={baseClasses} style={style}>
            <Tag style={{ textAlign: comp.props.align }}>{comp.props.content}</Tag>
          </div>
        );
      
      case 'image':
        return (
          <div className={baseClasses} style={style}>
            {comp.props.src ? (
              <img src={comp.props.src} alt={comp.props.alt} style={{ width: '100%', objectFit: comp.props.objectFit }} />
            ) : (
              <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                <Image size={40} />
              </div>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div className={baseClasses}>
            <button style={style}>{comp.props.text}</button>
          </div>
        );
      
      case 'section':
      case 'flexbox':
        return (
          <div 
            className={`${baseClasses} min-h-[100px] border border-dashed border-gray-300 p-4`}
            style={{ 
              ...style, 
              display: 'flex', 
              flexDirection: comp.props.direction || 'column',
              gap: comp.props.gap,
              justifyContent: comp.props.justify,
              alignItems: comp.props.align
            }}
          >
            {comp.children?.length === 0 && (
              <div className="text-gray-400 text-center p-4">Drop components here</div>
            )}
          </div>
        );
      
      case 'grid':
        return (
          <div 
            className={`${baseClasses} min-h-[100px] border border-dashed border-gray-300 p-4`}
            style={{ 
              ...style, 
              display: 'grid', 
              gridTemplateColumns: `repeat(${comp.props.columns || 3}, 1fr)`,
              gap: comp.props.gap
            }}
          >
            {comp.children?.length === 0 && (
              <div className="text-gray-400 text-center p-4 col-span-full">Drop components here</div>
            )}
          </div>
        );
      
      case 'hero':
        return (
          <div 
            className={baseClasses}
            style={{ 
              ...style,
              backgroundImage: comp.props.backgroundImage ? `url(${comp.props.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}
          >
            {comp.props.overlayColor && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: comp.props.overlayColor }} />
            )}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 className="text-3xl font-bold text-white">{comp.props.title}</h1>
              <p className="text-white/80 mt-2">{comp.props.subtitle}</p>
            </div>
          </div>
        );
      
      case 'stats':
        return (
          <div className={`${baseClasses} flex gap-8 justify-center`} style={style}>
            {comp.props.items?.map((item: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-[#1E3A5F]">{item.number}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        );
      
      case 'form':
        return (
          <div className={baseClasses} style={style}>
            <h3 className="font-bold mb-4">{comp.props.heading}</h3>
            {comp.props.fields?.map((field: any, i: number) => (
              <div key={i} className="mb-3">
                <label className="block text-sm mb-1">{field.label}</label>
                <input type={field.type} className="w-full border rounded px-3 py-2" placeholder={field.label} />
              </div>
            ))}
            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded mt-2">
              {comp.props.buttonText}
            </button>
          </div>
        );
      
      case 'divider':
        return <hr className={baseClasses} style={style} />;
      
      case 'spacer':
        return <div className={baseClasses} style={style} />;
      
      default:
        return (
          <div className={`${baseClasses} p-4 bg-gray-100`}>
            Unknown: {comp.type}
          </div>
        );
    }
  };

  // Device frame sizes
  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1E3A5F] text-white transition-all duration-300 flex flex-col flex-shrink-0`}>
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            {sidebarOpen && <img src={logo} alt="Logo" className="h-8" />}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded">
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {[
              { id: 'builder', icon: LayoutDashboard, label: 'Page Builder' },
              { id: 'media', icon: Image, label: 'Media Library' },
              { id: 'contacts', icon: Users, label: 'Contacts' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-[#4A90E2]' : 'hover:bg-white/10'
                }`}
              >
                <item.icon size={18} />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            ))}
            
            <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10">
              <ExternalLink size={18} />
              {sidebarOpen && <span className="text-sm">View Site</span>}
            </a>
          </nav>

          <div className="p-2 border-t border-white/10">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-red-300">
              <LogOut size={18} />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between flex-shrink-0">
            <h1 className="text-lg font-bold text-gray-800">
              {activeTab === 'builder' && 'Visual Page Builder'}
              {activeTab === 'media' && 'Media Library'}
              {activeTab === 'contacts' && 'Contact Submissions'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            
            {activeTab === 'builder' && selectedPage && (
              <div className="flex items-center gap-2">
                {/* Undo/Redo */}
                <button 
                  onClick={undo} 
                  disabled={historyIndex <= 0}
                  className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Undo"
                >
                  <Undo size={18} />
                </button>
                <button 
                  onClick={redo} 
                  disabled={historyIndex >= history.length - 1}
                  className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                  title="Redo"
                >
                  <Redo size={18} />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-1" />
                
                {/* Device modes */}
                <div className="flex gap-1 bg-gray-100 rounded p-1">
                  <button 
                    onClick={() => setDeviceMode('desktop')} 
                    className={`p-1.5 rounded ${deviceMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    title="Desktop"
                  >
                    <Monitor size={16} />
                  </button>
                  <button 
                    onClick={() => setDeviceMode('tablet')} 
                    className={`p-1.5 rounded ${deviceMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    title="Tablet"
                  >
                    <Tablet size={16} />
                  </button>
                  <button 
                    onClick={() => setDeviceMode('mobile')} 
                    className={`p-1.5 rounded ${deviceMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                    title="Mobile"
                  >
                    <Smartphone size={16} />
                  </button>
                </div>
                
                <div className="w-px h-6 bg-gray-300 mx-1" />
                
                <button onClick={() => setShowPreview(!showPreview)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded flex items-center gap-1.5 text-sm hover:bg-gray-200">
                  <Eye size={16} /> Preview
                </button>
                <button onClick={() => savePage(false)} disabled={isLoading} className="px-3 py-1.5 bg-blue-500 text-white rounded flex items-center gap-1.5 text-sm hover:bg-blue-600 disabled:opacity-50">
                  <Save size={16} /> Save
                </button>
                <button onClick={publishPage} className="px-3 py-1.5 bg-green-500 text-white rounded flex items-center gap-1.5 text-sm hover:bg-green-600">
                  <Check size={16} /> Publish
                </button>
              </div>
            )}
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {/* Page Builder */}
            {activeTab === 'builder' && (
              <div className="h-full flex">
                {/* Pages Panel */}
                <div className="w-48 bg-white border-r p-3 overflow-y-auto flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-sm text-gray-700">Pages</h3>
                    <button onClick={createNewPage} className="p-1 hover:bg-gray-100 rounded" title="New Page">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {pages.map(page => (
                      <div
                        key={page.page_id}
                        className={`group flex items-center justify-between px-2 py-1.5 rounded cursor-pointer text-sm ${
                          selectedPage?.page_id === page.page_id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                        }`}
                        onClick={() => { setSelectedPage(page); setSelectedComponent(null); }}
                      >
                        <span className="truncate">{page.page_name}</span>
                        <div className="hidden group-hover:flex gap-1">
                          {page.is_published && <span className="w-2 h-2 bg-green-500 rounded-full" title="Published" />}
                          <button onClick={(e) => { e.stopPropagation(); deletePage(page.page_id); }} className="text-red-500 hover:text-red-700">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Components Panel */}
                <div className="w-56 bg-gray-50 border-r p-3 overflow-y-auto flex-shrink-0">
                  <h3 className="font-semibold text-sm text-gray-700 mb-3">Components</h3>
                  <div className="text-xs text-gray-500 mb-2">Drag to canvas</div>
                  <div className="grid grid-cols-2 gap-2">
                    {componentTemplates.map(template => (
                      <DraggableComponentTemplate key={template.type} template={template} />
                    ))}
                  </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
                  {selectedPage ? (
                    <div 
                      className="mx-auto bg-white min-h-full rounded-lg shadow-lg transition-all duration-300"
                      style={{ width: getDeviceWidth() }}
                    >
                      <div className="text-xs text-gray-500 px-4 py-2 bg-gray-50 rounded-t-lg flex items-center justify-between border-b">
                        <div className="flex items-center gap-2">
                          <span>Editing:</span>
                          <span className="font-medium">{selectedPage.page_name}</span>
                          <span className="text-gray-400">({selectedPage.route})</span>
                        </div>
                        <span className="text-xs text-gray-400">Auto-save enabled</span>
                      </div>
                      
                      <DroppableCanvas onDrop={handleDrop} isOver={false}>
                        {selectedPage.components.length === 0 ? (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500">
                            <LayoutDashboard size={48} className="mx-auto mb-4 text-gray-300" />
                            <p className="font-medium mb-2">Drag components here</p>
                            <p className="text-sm">Or click components from the left panel to add them</p>
                          </div>
                        ) : (
                          <div className="space-y-1 p-4">
                            {selectedPage.components
                              .sort((a, b) => a.order - b.order)
                              .map((comp, index) => (
                                <DraggableComponent
                                  key={comp.id}
                                  component={comp}
                                  index={index}
                                  onSelect={() => setSelectedComponent(comp)}
                                  isSelected={selectedComponent?.id === comp.id}
                                  onMove={moveComponent}
                                  renderComponent={renderComponentPreview}
                                />
                              ))}
                          </div>
                        )}
                      </DroppableCanvas>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                        <p className="font-medium">Select a page to start editing</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Properties & Layers Panel */}
                <div className="w-80 bg-white border-l flex flex-col flex-shrink-0">
                  {/* Tabs */}
                  <div className="flex border-b">
                    <button 
                      onClick={() => setShowLayers(false)}
                      className={`flex-1 px-4 py-2 text-sm font-medium ${!showLayers ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Properties
                    </button>
                    <button 
                      onClick={() => setShowLayers(true)}
                      className={`flex-1 px-4 py-2 text-sm font-medium ${showLayers ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      Layers
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {showLayers ? (
                      /* Layers Panel */
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-gray-700 mb-3 flex items-center gap-2">
                          <Layers size={16} /> Component Layers
                        </h3>
                        {selectedPage && selectedPage.components.length > 0 ? (
                          <div className="space-y-1">
                            {selectedPage.components.map((comp, index) => (
                              <div
                                key={comp.id}
                                onClick={() => setSelectedComponent(comp)}
                                className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer text-sm ${
                                  selectedComponent?.id === comp.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {iconMap[comp.type] && React.createElement(iconMap[comp.type], { size: 14 })}
                                  <span className="capitalize">{comp.type}</span>
                                </div>
                                <div className="flex gap-1">
                                  <button onClick={(e) => { e.stopPropagation(); duplicateComponent(comp); }} title="Duplicate">
                                    <Copy size={12} />
                                  </button>
                                  <button onClick={(e) => { e.stopPropagation(); deleteComponent(comp.id); }} className="text-red-500" title="Delete">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 text-sm py-8">
                            No components yet
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Properties Panel */
                      selectedComponent ? (
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm text-gray-700">Properties</h3>
                            <div className="flex gap-1">
                              <button onClick={() => duplicateComponent(selectedComponent)} className="p-1 hover:bg-gray-100 rounded" title="Duplicate">
                                <Copy size={14} />
                              </button>
                              <button onClick={() => deleteComponent(selectedComponent.id)} className="p-1 hover:bg-red-100 rounded text-red-500" title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="text-xs text-gray-500 mb-4 px-2 py-1 bg-gray-100 rounded capitalize">
                            {selectedComponent.type}
                          </div>

                          {/* Props Editor */}
                          <div className="space-y-3 mb-6">
                            <h4 className="text-xs font-semibold text-gray-600 uppercase">Content</h4>
                            
                            {Object.entries(selectedComponent.props).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-xs text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                
                                {typeof value === 'boolean' ? (
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={value}
                                      onChange={(e) => updateComponent(selectedComponent.id, {
                                        props: { ...selectedComponent.props, [key]: e.target.checked }
                                      })}
                                      className="rounded"
                                    />
                                    <span className="text-sm">Enabled</span>
                                  </label>
                                ) : key === 'src' || key === 'backgroundImage' ? (
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      value={value as string}
                                      onChange={(e) => updateComponent(selectedComponent.id, {
                                        props: { ...selectedComponent.props, [key]: e.target.value }
                                      })}
                                      className="flex-1 text-sm border rounded px-2 py-1"
                                      placeholder="Image URL"
                                    />
                                    <button
                                      onClick={() => fileInputRef.current?.click()}
                                      className="p-1 border rounded hover:bg-gray-100"
                                      title="Upload"
                                    >
                                      <Upload size={16} />
                                    </button>
                                  </div>
                                ) : key === 'tag' ? (
                                  <select
                                    value={value as string}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      props: { ...selectedComponent.props, [key]: e.target.value }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                  >
                                    <option value="h1">H1</option>
                                    <option value="h2">H2</option>
                                    <option value="h3">H3</option>
                                    <option value="h4">H4</option>
                                    <option value="p">Paragraph</option>
                                  </select>
                                ) : key === 'align' || key === 'justify' ? (
                                  <select
                                    value={value as string}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      props: { ...selectedComponent.props, [key]: e.target.value }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                  >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                    {key === 'justify' && (
                                      <>
                                        <option value="flex-start">Flex Start</option>
                                        <option value="flex-end">Flex End</option>
                                        <option value="space-between">Space Between</option>
                                        <option value="space-around">Space Around</option>
                                      </>
                                    )}
                                  </select>
                                ) : key === 'direction' ? (
                                  <select
                                    value={value as string}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      props: { ...selectedComponent.props, [key]: e.target.value }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                  >
                                    <option value="row">Row</option>
                                    <option value="column">Column</option>
                                    <option value="row-reverse">Row Reverse</option>
                                    <option value="column-reverse">Column Reverse</option>
                                  </select>
                                ) : key === 'columns' ? (
                                  <input
                                    type="number"
                                    min="1"
                                    max="12"
                                    value={value as number}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      props: { ...selectedComponent.props, [key]: parseInt(e.target.value) }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                  />
                                ) : key === 'fields' || key === 'items' ? (
                                  <textarea
                                    value={JSON.stringify(value, null, 2)}
                                    onChange={(e) => {
                                      try {
                                        const parsed = JSON.parse(e.target.value);
                                        updateComponent(selectedComponent.id, {
                                          props: { ...selectedComponent.props, [key]: parsed }
                                        });
                                      } catch {}
                                    }}
                                    className="w-full text-xs border rounded px-2 py-1 font-mono h-32"
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={value as string}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      props: { ...selectedComponent.props, [key]: e.target.value }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Styles Editor */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-gray-600 uppercase">Styles</h4>
                            
                            {Object.entries(selectedComponent.styles).map(([key, value]) => (
                              <div key={key}>
                                <label className="block text-xs text-gray-600 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                
                                {key.toLowerCase().includes('color') ? (
                                  <div className="flex gap-1">
                                    <input
                                      type="color"
                                      value={value as string}
                                      onChange={(e) => updateComponent(selectedComponent.id, {
                                        styles: { ...selectedComponent.styles, [key]: e.target.value }
                                      })}
                                      className="w-8 h-8 rounded border cursor-pointer"
                                    />
                                    <input
                                      type="text"
                                      value={value as string}
                                      onChange={(e) => updateComponent(selectedComponent.id, {
                                        styles: { ...selectedComponent.styles, [key]: e.target.value }
                                      })}
                                      className="flex-1 text-sm border rounded px-2 py-1"
                                    />
                                  </div>
                                ) : (
                                  <input
                                    type="text"
                                    value={value as string}
                                    onChange={(e) => updateComponent(selectedComponent.id, {
                                      styles: { ...selectedComponent.styles, [key]: e.target.value }
                                    })}
                                    className="w-full text-sm border rounded px-2 py-1"
                                    placeholder="e.g., 20px, 1rem, auto"
                                  />
                                )}
                              </div>
                            ))}
                            
                            <button
                              onClick={() => {
                                const styleName = prompt('Style property (e.g., margin, border):');
                                if (styleName) {
                                  updateComponent(selectedComponent.id, {
                                    styles: { ...selectedComponent.styles, [styleName]: '' }
                                  });
                                }
                              }}
                              className="w-full text-xs text-blue-600 hover:text-blue-800 py-2 border border-dashed border-blue-300 rounded hover:bg-blue-50"
                            >
                              + Add Custom Style
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500 text-sm py-12">
                          <Palette size={48} className="mx-auto mb-3 text-gray-300" />
                          <p>Select a component to edit</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Media Library - Same as before */}
            {activeTab === 'media' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2 hover:bg-blue-600"
                  >
                    <Upload size={18} /> Upload File
                  </button>
                  <button onClick={loadUploads} className="p-2 hover:bg-gray-100 rounded">
                    <RefreshCw size={18} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {uploads.map(file => (
                    <div key={file.filename} className="group relative bg-white rounded-lg shadow-sm overflow-hidden">
                      <img src={file.url} alt={file.filename} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => { navigator.clipboard.writeText(file.url); toast.success('URL copied'); }}
                          className="p-2 bg-white rounded hover:bg-gray-100"
                          title="Copy URL"
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete this file?')) {
                              await fetch(`${API_URL}/uploads/${file.filename}?token=${token}`, { method: 'DELETE' });
                              loadUploads();
                            }
                          }}
                          className="p-2 bg-white rounded hover:bg-red-100 text-red-500"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="p-2 text-xs text-gray-600 truncate">{file.filename}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contacts - Same as before */}
            {activeTab === 'contacts' && (
              <div className="p-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {contacts.map(contact => (
                        <tr key={contact._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{contact.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{contact.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">+91 {contact.phone}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{contact.source}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={async () => {
                                if (confirm('Delete?')) {
                                  await fetch(`${API_URL}/contacts/${contact._id}?token=${token}`, { method: 'DELETE' });
                                  loadContacts();
                                }
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {contacts.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No contacts yet</div>
                  )}
                </div>
              </div>
            )}

            {/* Settings - Same as before */}
            {activeTab === 'settings' && (
              <div className="p-6 max-w-2xl">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Mail size={20} /> Email Settings (SMTP)
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                        <input
                          type="text"
                          value={smtpSettings.smtp_host}
                          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_host: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                        <input
                          type="number"
                          value={smtpSettings.smtp_port}
                          onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_port: parseInt(e.target.value) })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Username</label>
                      <input
                        type="email"
                        value={smtpSettings.smtp_user}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_user: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="your-email@gmail.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                      <input
                        type="password"
                        value={smtpSettings.smtp_pass}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_pass: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="App-specific password"
                      />
                      <p className="text-xs text-gray-500 mt-1">For Gmail, use an App Password</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                        <input
                          type="email"
                          value={smtpSettings.admin_email}
                          onChange={(e) => setSmtpSettings({ ...smtpSettings, admin_email: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
                        <input
                          type="text"
                          value={smtpSettings.sender_name}
                          onChange={(e) => setSmtpSettings({ ...smtpSettings, sender_name: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={saveSmtpSettings}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Save size={18} /> Save Settings
                      </button>
                      <button
                        onClick={testEmail}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                      >
                        <Mail size={18} /> Send Test Email
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Preview Modal */}
        {showPreview && selectedPage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-gray-100 px-4 py-2 flex items-center justify-between border-b">
                <span className="font-medium">Preview: {selectedPage.page_name}</span>
                <button onClick={() => setShowPreview(false)} className="p-1 hover:bg-gray-200 rounded">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                {selectedPage.components.map(comp => renderComponentPreview(comp))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
