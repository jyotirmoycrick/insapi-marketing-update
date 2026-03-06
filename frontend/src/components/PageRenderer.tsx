import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdmin } from '../contexts/AdminContext';
import { Edit2, Upload } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface ComponentItem {
  id: string;
  type: string;
  props: any;
  styles?: React.CSSProperties;
  order?: number;
  children?: ComponentItem[];
}

interface PageData {
  page_id: string;
  page_name: string;
  route: string;
  components: ComponentItem[];
  meta?: {
    title?: string;
    description?: string;
  };
  is_published: boolean;
}

interface PageRendererProps {
  pageId?: string;
  isPreview?: boolean;
}

export function PageRenderer({ pageId, isPreview = false }: PageRendererProps) {

  const { slug } = useParams();

  const finalPageId = pageId || slug;

  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin, isEditMode } = useAdmin();
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!finalPageId) return;
    loadPage();
  }, [finalPageId]);

  const loadPage = async () => {
    try {

      setLoading(true);
      setError(null);

      const res = await fetch(`${API_URL}/pages/${finalPageId}`);

      if (!res.ok) throw new Error("Page not found");

      const data = await res.json();

      // Allow admins to view unpublished pages
      if (!isPreview && !data.is_published && !isAdmin) {
        throw new Error("Page not found");
      }

      setPageData(data);

      if (data.meta?.title) {
        document.title = data.meta.title;
      }

    } catch (err: any) {

      console.error(err);
      setError(err.message || "Failed to load page");

    } finally {

      setLoading(false);

    }
  };

  const updateComponent = async (componentId: string, updates: any) => {
    if (!pageData || !token) return;

    const updateInTree = (components: ComponentItem[]): ComponentItem[] => {
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
      ...pageData,
      components: updateInTree(pageData.components)
    };

    setPageData(updatedPage);

    // Save to backend
    try {
      await fetch(`${API_URL}/pages/${pageData.page_id}?token=${token}`, {
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
            props: { ...pageData?.components.find(c => c.id === componentId)?.props, [field]: data.url }
          });
        }
      } catch (e) {
        toast.error('Upload failed');
      }
    };

    input.click();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading page...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!pageData || !pageData.components || pageData.components.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>This page has no content.</p>
      </div>
    );
  }

  const sortedComponents = [...pageData.components].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const renderComponent = (component: ComponentItem): React.ReactElement | null => {
    const isEditable = isAdmin && isEditMode;

    switch (component.type) {
      case 'text':
        return (
          <div key={component.id} className="relative group">
            <p 
              style={component.styles}
              contentEditable={isEditable}
              suppressContentEditableWarning
              onBlur={(e) => {
                if (isEditable) {
                  updateComponent(component.id, {
                    props: { ...component.props, content: e.currentTarget.textContent }
                  });
                }
              }}
            >
              {component.props.content}
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
        const HeadingTag = component.props.tag || 'h2';
        return (
          <div key={component.id} className="relative group">
            {React.createElement(
              HeadingTag,
              {
                style: component.styles,
                contentEditable: isEditable,
                suppressContentEditableWarning: true,
                onBlur: (e: any) => {
                  if (isEditable) {
                    updateComponent(component.id, {
                      props: { ...component.props, content: e.currentTarget.textContent }
                    });
                  }
                }
              },
              component.props.content
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
        if (!component.props.src) return null;
        return (
          <div key={component.id} className="relative group">
            <img 
              src={component.props.src} 
              alt={component.props.alt || ''} 
              style={component.styles}
            />
            {isEditable && (
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleImageUpload(component.id, 'src')}
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
          <div key={component.id} className="relative group inline-block">
            <a
              href={component.props.link || '#'}
              style={component.styles}
              className="inline-block px-6 py-3 rounded font-medium text-center"
            >
              <span
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable) {
                    updateComponent(component.id, {
                      props: { ...component.props, text: e.currentTarget.textContent }
                    });
                  }
                }}
              >
                {component.props.text}
              </span>
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
            key={component.id}
            style={{ 
              ...component.styles, 
              display: 'flex', 
              flexDirection: component.props.direction || 'column',
              gap: component.props.gap || '20px',
              justifyContent: component.props.justify,
              alignItems: component.props.align
            }}
          >
            {component.children?.map(child => renderComponent(child))}
          </div>
        );
      
      case 'grid':
        return (
          <div 
            key={component.id}
            style={{ 
              ...component.styles, 
              display: 'grid', 
              gridTemplateColumns: `repeat(${component.props.columns || 3}, 1fr)`,
              gap: component.props.gap || '20px'
            }}
          >
            {component.children?.map(child => renderComponent(child))}
          </div>
        );
      
      case 'form':
        return (
          <form 
            key={component.id}
            style={component.styles}
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
                    subject: component.props.heading || 'Contact Form',
                    source: pageData?.page_name || 'website'
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
            <h3 className="font-bold mb-4 text-xl">{component.props.heading}</h3>
            {component.props.fields?.map((field: any, i: number) => (
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
                backgroundColor: component.styles?.buttonColor || '#F59E0B',
                color: component.styles?.buttonTextColor || '#000000'
              }}
            >
              {component.props.buttonText}
            </button>
          </form>
        );
      
      case 'hero':
        return (
          <div 
            key={component.id}
            className="relative group"
            style={{ 
              ...component.styles,
              backgroundImage: component.props.backgroundImage ? `url(${component.props.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              minHeight: '400px',
              padding: '80px 40px'
            }}
          >
            {component.props.overlayColor && (
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                backgroundColor: component.props.overlayColor,
                opacity: component.props.overlayOpacity || 0.5
              }} />
            )}
            <div style={{ position: 'relative', zIndex: 1 }} className="text-center max-w-4xl mx-auto">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable) {
                    updateComponent(component.id, {
                      props: { ...component.props, title: e.currentTarget.textContent }
                    });
                  }
                }}
              >
                {component.props.title}
              </h1>
              <p 
                className="text-xl md:text-2xl text-white/90 mb-6"
                contentEditable={isEditable}
                suppressContentEditableWarning
                onBlur={(e) => {
                  if (isEditable) {
                    updateComponent(component.id, {
                      props: { ...component.props, subtitle: e.currentTarget.textContent }
                    });
                  }
                }}
              >
                {component.props.subtitle}
              </p>
              {component.props.buttonText && (
                <a 
                  href={component.props.buttonLink || '#'}
                  className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <span
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                      if (isEditable) {
                        updateComponent(component.id, {
                          props: { ...component.props, buttonText: e.currentTarget.textContent }
                        });
                      }
                    }}
                  >
                    {component.props.buttonText}
                  </span>
                </a>
              )}
            </div>
            {isEditable && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => handleImageUpload(component.id, 'backgroundImage')}
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
          <div key={component.id} className="flex flex-wrap gap-8 justify-center py-8" style={component.styles}>
            {component.props.items?.map((item: any, i: number) => (
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
        return <hr key={component.id} style={component.styles} className="my-4" />;
      
      case 'spacer':
        return <div key={component.id} style={{ height: component.props.height || '40px', ...component.styles }} />;
      
      default:
        console.warn('Unknown component type:', component.type);
        return null;
    }
  };

  return (
    <div className="page-renderer">
      {sortedComponents.map((component) => renderComponent(component))}
    </div>
  );
}