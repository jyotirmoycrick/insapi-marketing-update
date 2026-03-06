import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { Edit2, Upload } from 'lucide-react';
import { toast } from 'sonner';

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

export function LivePageRenderer() {
  const { pageId } = useParams<{ pageId: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, isEditMode } = useAdmin();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    loadPage();
  }, [pageId]);

  const loadPage = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/pages/${pageId}`);
      
      if (!res.ok) {
        throw new Error('Page not found');
      }
      
      const data = await res.json();
      
      // Allow admins to view unpublished pages
      if (!data.is_published && !isAdmin) {
        throw new Error('Page not published');
      }
      
      setPage(data);
      
      // Update page title
      if (data.meta?.title) {
        document.title = data.meta.title;
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const updateComponent = async (componentId: string, updates: any) => {
    if (!page || !token) return;

    const updateInTree = (components: Component[]): Component[] => {
      return components.map(comp => {
        if (comp.id === componentId) {
          return { ...comp, ...updates };
        }
        if (comp.children) {
          return { ...comp, children: updateInTree(comp.children) };
        }
        return comp;
      });
    };

    const updatedPage = {
      ...page,
      components: updateInTree(page.components)
    };

    setPage(updatedPage);

    // Save to backend
    try {
      await fetch(`${API_URL}/pages/${page.page_id}?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPage)
      });
      toast.success('✅ Updated');
    } catch (e) {
      toast.error('Failed to save');
    }
  };

  const handleImageUpload = async (componentId: string, field: 'src' | 'backgroundImage') => {
    if (!token) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (!file) return;

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
          updateComponent(componentId, {
            props: { [field]: data.url }
          });
        }
      } catch (e) {
        toast.error('Upload failed');
      }
    };

    input.click();
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

  const renderComponent = (comp: Component): React.ReactElement | null => {
    const style = getStyleString(comp.styles);
    const isEditable = isAdmin && isEditMode;

    switch (comp.type) {
      case 'text':
        return (
          <div key={comp.id} className="relative group">
            <p 
              style={style}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable) {
                  updateComponent(comp.id, {
                    props: { ...comp.props, content: e.currentTarget.textContent }
                  });
                }
              }}
            >
              {comp.props.content}
            </p>
            {isEditable && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  <Edit2 size={12} className="inline" /> Click to edit
                </span>
              </div>
            )}
          </div>
        );
      
      case 'heading':
        const HeadingTag = comp.props.tag || 'h2';
        return (
          <div key={comp.id} className="relative group">
            {React.createElement(
              HeadingTag,
              {
                style,
                contentEditable: isEditable,
                suppressContentEditableWarning: true,
                onBlur: (e: any) => {
                  if (isEditable) {
                    updateComponent(comp.id, {
                      props: { ...comp.props, content: e.currentTarget.textContent }
                    });
                  }
                }
              },
              comp.props.content
            )}
            {isEditable && (
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  <Edit2 size={12} className="inline" /> Click to edit
                </span>
              </div>
            )}
          </div>
        );
      
      case 'image':
        if (!comp.props.src) return null;
        return (
          <div key={comp.id} className="relative group">
            <img 
              src={comp.props.src} 
              alt={comp.props.alt || ''} 
              style={style}
            />
            {isEditable && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleImageUpload(comp.id, 'src')}
                  className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Upload size={16} />
                  Change Image
                </button>
              </div>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div key={comp.id} className="relative group inline-block">
            <a
              href={comp.props.link || '#'}
              style={style}
              className="inline-block px-6 py-3 rounded font-medium text-center"
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable) {
                  updateComponent(comp.id, {
                    props: { ...comp.props, text: e.currentTarget.textContent }
                  });
                }
              }}
            >
              {comp.props.text}
            </a>
            {isEditable && (
              <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  <Edit2 size={12} className="inline" /> Click to edit
                </span>
              </div>
            )}
          </div>
        );
      
      case 'section':
      case 'flexbox':
        return (
          <div 
            key={comp.id}
            style={{ 
              ...style,
              display: 'flex'
            }}
          >
            {comp.children?.map(child => renderComponent(child))}
          </div>
        );
      
      case 'grid':
        return (
          <div 
            key={comp.id}
            style={{ 
              ...style,
              display: 'grid',
              gridTemplateColumns: `repeat(${comp.props.columns || 3}, 1fr)`
            }}
          >
            {comp.children?.map(child => renderComponent(child))}
          </div>
        );
      
      case 'form':
        return (
          <form 
            key={comp.id}
            style={style}
            className="p-6 bg-white rounded-lg shadow-lg"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: Record<string, any> = {};
              
              formData.forEach((value, key) => {
                data[key] = value;
              });
              
              try {
                const res = await fetch(`${API_URL}/contact/submit`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    name: data.fullName || data.name,
                    email: data.email,
                    phone: data.phone,
                    subject: comp.props.heading || 'Contact Form',
                    source: page?.page_name || 'website'
                  })
                });
                
                const result = await res.json();
                
                if (result.status === 'success') {
                  alert(result.message || 'Thank you! We will contact you soon.');
                  e.currentTarget.reset();
                } else {
                  alert('Failed to submit form. Please try again.');
                }
              } catch (error) {
                alert('Failed to submit form. Please try again.');
              }
            }}
          >
            <h3 className="font-bold mb-4 text-xl">{comp.props.heading}</h3>
            {comp.props.fields?.map((field: any, i: number) => (
              <div key={i} className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea 
                    name={field.name}
                    required={field.required}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder={field.label}
                    rows={4}
                  />
                ) : (
                  <input 
                    type={field.type}
                    name={field.name}
                    required={field.required}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder={field.label} 
                  />
                )}
              </div>
            ))}
            <button 
              type="submit"
              className="w-full font-bold py-3 rounded mt-2 transition-colors hover:opacity-90"
              style={{
                backgroundColor: comp.styles.buttonColor || '#F59E0B',
                color: comp.styles.buttonTextColor || '#000000'
              }}
            >
              {comp.props.buttonText}
            </button>
          </form>
        );
      
      case 'hero':
        return (
          <div 
            key={comp.id}
            className="relative group"
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
            <div style={{ position: 'relative', zIndex: 1 }} className="text-center max-w-4xl mx-auto">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable) {
                    updateComponent(comp.id, {
                      props: { ...comp.props, title: e.currentTarget.textContent }
                    });
                  }
                }}
              >
                {comp.props.title}
              </h1>
              <p 
                className="text-xl md:text-2xl text-white/90 mb-6"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable) {
                    updateComponent(comp.id, {
                      props: { ...comp.props, subtitle: e.currentTarget.textContent }
                    });
                  }
                }}
              >
                {comp.props.subtitle}
              </p>
              {comp.props.buttonText && (
                <a 
                  href={comp.props.buttonLink || '#'}
                  className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (isEditable) {
                      updateComponent(comp.id, {
                        props: { ...comp.props, buttonText: e.currentTarget.textContent }
                      });
                    }
                  }}
                >
                  {comp.props.buttonText}
                </a>
              )}
            </div>
            {isEditable && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => handleImageUpload(comp.id, 'backgroundImage')}
                  className="bg-blue-500 text-white px-3 py-2 rounded shadow-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Upload size={16} />
                  Change Background
                </button>
              </div>
            )}
          </div>
        );
      
      case 'stats':
        return (
          <div key={comp.id} className="flex flex-wrap gap-8 justify-center py-8" style={style}>
            {comp.props.items?.map((item: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {item.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'divider':
        return <hr key={comp.id} style={style} className="my-4" />;
      
      case 'spacer':
        return <div key={comp.id} style={{ height: comp.props.height || '40px', ...style }} />;
      
      default:
        console.warn('Unknown component type:', comp.type);
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="text-blue-600 hover:underline">Go back home</a>
        </div>
      </div>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {page.components
        .sort((a, b) => a.order - b.order)
        .map(comp => renderComponent(comp))}
    </div>
  );
}
