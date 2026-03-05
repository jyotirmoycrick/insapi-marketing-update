import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut, Save, Plus, Trash2, 
  Eye, Upload, Copy, RefreshCw, ExternalLink, Mail, 
  Image, Type, MousePointer, Grid, Columns, Star, BarChart2, Minus, Square, 
  Heading, ArrowUp, ArrowDown, Check, X, Menu, Palette, Layers,
  Monitor, Tablet, Smartphone, Undo, Redo
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

export function ImprovedAdminDashboard() {
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
  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showProperties, setShowProperties] = useState(true);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
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
      const res = await fetch(`${API_URL}/pages?token=${token}`, {
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
      
      if (res.ok) {
        toast.success('Page created');
        loadPages();
      }
    } catch (e) {
      toast.error('Failed to create page');
    }
  };

  const savePage = async () => {
    if (!selectedPage) return;
    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/pages/${selectedPage.page_id}?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPage)
      });
      
      if (res.ok) {
        toast.success('✅ Page saved successfully');
        loadPages();
      }
    } catch (e) {
      toast.error('Failed to save page');
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
      toast.success('✅ Page published');
      loadPages();
      setSelectedPage({ ...selectedPage, is_published: true });
    } catch (e) {
      toast.error('Failed to publish');
    }
  };

  const unpublishPage = async () => {
    if (!selectedPage) return;
    
    try {
      await fetch(`${API_URL}/pages/${selectedPage.page_id}/unpublish?token=${token}`, {
        method: 'POST'
      });
      toast.success('Page unpublished');
      loadPages();
      setSelectedPage({ ...selectedPage, is_published: false });
    } catch (e) {
      toast.error('Failed to unpublish');
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Delete this page? This action cannot be undone.')) return;
    
    try {
      await fetch(`${API_URL}/pages/${pageId}?token=${token}`, { method: 'DELETE' });
      toast.success('Page deleted');
      loadPages();
      if (selectedPage?.page_id === pageId) setSelectedPage(null);
    } catch (e) {
      toast.error('Failed to delete');
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, template: any) => {
    setDraggedComponent(template);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (!selectedPage || !draggedComponent) return;

    const newComponent: Component = {
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: draggedComponent.type,
      props: { ...draggedComponent.defaultProps },
      styles: { ...draggedComponent.defaultStyles },
      children: [],
      order: index !== undefined ? index : selectedPage.components.length
    };
    
    const newComponents = [...selectedPage.components];
    if (index !== undefined) {
      newComponents.splice(index, 0, newComponent);
    } else {
      newComponents.push(newComponent);
    }
    
    // Update order
    newComponents.forEach((c, i) => c.order = i);
    
    setSelectedPage({
      ...selectedPage,
      components: newComponents
    });
    setSelectedComponent(newComponent);
    toast.success(`${draggedComponent.name} added`);
  };

  // Component operations with drag support
  const handleComponentDragStart = (e: React.DragEvent, component: Component, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('componentIndex', index.toString());
  };

  const handleComponentDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!selectedPage) return;
    
    const dragIndex = parseInt(e.dataTransfer.getData('componentIndex'));
    if (dragIndex === dropIndex) return;
    
    const components = [...selectedPage.components];
    const [draggedItem] = components.splice(dragIndex, 1);
    components.splice(dropIndex, 0, draggedItem);
    
    // Update order
    components.forEach((c, i) => c.order = i);
    
    setSelectedPage({ ...selectedPage, components });
    setDragOverIndex(null);
  };

  const addComponent = (template: any) => {
    if (!selectedPage) return;
    
    const newComponent: Component = {
      id: `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: template.type,
      props: { ...template.defaultProps },
      styles: { ...template.defaultStyles },
      children: [],
      order: selectedPage.components.length
    };
    
    setSelectedPage({
      ...selectedPage,
      components: [...selectedPage.components, newComponent]
    });
    setSelectedComponent(newComponent);
    toast.success(`${template.name} added`);
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

  const moveComponent = (id: string, direction: 'up' | 'down') => {
    if (!selectedPage) return;
    
    const components = [...selectedPage.components];
    const index = components.findIndex(c => c.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= components.length) return;
    
    [components[index], components[newIndex]] = [components[newIndex], components[index]];
    components.forEach((c, i) => c.order = i);
    
    setSelectedPage({ ...selectedPage, components });
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
        toast.success('✅ File uploaded');
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
      if (res.ok) toast.success('✅ SMTP settings saved');
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
      if (data.success) toast.success('✅ Test email sent');
      else toast.error(data.message);
    } catch (e) {
      toast.error('Failed to send test email');
    }
  };

  // Render component preview
  const renderComponentPreview = (comp: Component, index: number) => {
    const isSelected = selectedComponent?.id === comp.id;
    const isDragOver = dragOverIndex === index;
    
    const style = comp.styles || {};

    const componentContent = (() => {
      switch (comp.type) {
        case 'text':
          return <p style={{ textAlign: comp.props.align }}>{comp.props.content}</p>;
        
        case 'heading':
          const Tag = comp.props.tag as keyof JSX.IntrinsicElements || 'h2';
          return <Tag style={{ textAlign: comp.props.align }}>{comp.props.content}</Tag>;
        
        case 'image':
          return comp.props.src ? (
            <img src={comp.props.src} alt={comp.props.alt} style={{ width: '100%', objectFit: comp.props.objectFit }} />
          ) : (
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
              <Image size={40} />
            </div>
          );
        
        case 'button':
          return <button style={style}>{comp.props.text}</button>;
        
        case 'section':
        case 'flexbox':
          return (
            <div 
              style={{ 
                ...style, 
                display: 'flex', 
                flexDirection: comp.props.direction || 'column',
                gap: comp.props.gap,
                justifyContent: comp.props.justify,
                alignItems: comp.props.align,
                minHeight: '100px',
                border: '1px dashed #ddd',
                padding: '20px'
              }}
            >
              {comp.children?.length === 0 && (
                <div className="text-gray-400 text-center">Drop components here</div>
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
                gap: comp.props.gap,
                minHeight: '100px',
                border: '1px dashed #ddd',
                padding: '20px'
              }}
            >
              {comp.children?.length === 0 && (
                <div className="text-gray-400 text-center col-span-full">Drop components here</div>
              )}
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
                minHeight: '300px',
                padding: '60px 40px'
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
            <div className="flex gap-8 justify-center" style={style}>
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
            <div style={style}>
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
          return <hr style={style} />;
        
        case 'spacer':
          return <div style={style} />;
        
        default:
          return <div className="p-4 bg-gray-100">Unknown: {comp.type}</div>;
      }
    })();

    return (
      <div
        key={comp.id}
        draggable
        onDragStart={(e) => handleComponentDragStart(e, comp, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleComponentDrop(e, index)}
        onClick={() => setSelectedComponent(comp)}
        className={`
          relative mb-2 transition-all cursor-move rounded
          ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}
          ${isDragOver ? 'border-t-4 border-blue-500' : ''}
        `}
        style={style}
      >
        {componentContent}
      </div>
    );
  };

  // Get device width
  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1E3A5F] text-white transition-all duration-300 flex flex-col flex-shrink-0 shadow-xl`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && <img src={logo} alt="Logo" className="h-8" />}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-[#4A90E2] shadow-lg' : 'hover:bg-white/10'
              }`}
            >
              <item.icon size={18} />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
          
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
            <ExternalLink size={18} />
            {sidebarOpen && <span className="text-sm font-medium">View Site</span>}
          </a>
        </nav>

        <div className="p-2 border-t border-white/10">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-red-300 transition-colors">
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between flex-shrink-0 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {activeTab === 'builder' && '🎨 Visual Page Builder'}
              {activeTab === 'media' && '🖼️ Media Library'}
              {activeTab === 'contacts' && '👥 Contact Submissions'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h1>
            {selectedPage && activeTab === 'builder' && (
              <p className="text-sm text-gray-500 mt-1">
                Editing: <span className="font-medium text-gray-700">{selectedPage.page_name}</span>
                <span className="mx-2">•</span>
                <span className={`${selectedPage.is_published ? 'text-green-600' : 'text-yellow-600'}`}>
                  {selectedPage.is_published ? '✅ Published' : '📝 Draft'}
                </span>
              </p>
            )}
          </div>
          
          {activeTab === 'builder' && selectedPage && (
            <div className="flex items-center gap-2">
              {/* Device modes */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setDeviceMode('desktop')} 
                  className={`p-2 rounded-md transition-all ${deviceMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Desktop View"
                >
                  <Monitor size={18} />
                </button>
                <button 
                  onClick={() => setDeviceMode('tablet')} 
                  className={`p-2 rounded-md transition-all ${deviceMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Tablet View"
                >
                  <Tablet size={18} />
                </button>
                <button 
                  onClick={() => setDeviceMode('mobile')} 
                  className={`p-2 rounded-md transition-all ${deviceMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  title="Mobile View"
                >
                  <Smartphone size={18} />
                </button>
              </div>
              
              <div className="w-px h-8 bg-gray-300" />
              
              <button onClick={() => setShowPreview(!showPreview)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-200 transition-colors font-medium">
                <Eye size={18} /> Preview
              </button>
              <button onClick={savePage} disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-600 disabled:opacity-50 transition-colors font-medium shadow-sm">
                <Save size={18} /> {isLoading ? 'Saving...' : 'Save'}
              </button>
              {selectedPage.is_published ? (
                <button onClick={unpublishPage} className="px-4 py-2 bg-yellow-500 text-black rounded-lg flex items-center gap-2 text-sm hover:bg-yellow-600 transition-colors font-medium shadow-sm">
                  <X size={18} /> Unpublish
                </button>
              ) : (
                <button onClick={publishPage} className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-green-600 transition-colors font-medium shadow-sm">
                  <Check size={18} /> Publish
                </button>
              )}
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Page Builder */}
          {activeTab === 'builder' && (
            <div className="h-full flex">
              {/* Pages Panel */}
              <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-gray-700">Pages</h3>
                  <button onClick={createNewPage} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="New Page">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-1">
                  {pages.map(page => (
                    <div
                      key={page.page_id}
                      className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-all ${
                        selectedPage?.page_id === page.page_id ? 'bg-blue-50 text-blue-700 shadow-sm' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => { setSelectedPage(page); setSelectedComponent(null); }}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FileText size={14} className="flex-shrink-0" />
                        <span className="truncate">{page.page_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {page.is_published && <span className="w-2 h-2 bg-green-500 rounded-full" title="Published" />}
                        <button 
                          onClick={(e) => { e.stopPropagation(); deletePage(page.page_id); }} 
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Components Library */}
              {showComponentLibrary && (
                <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto flex-shrink-0 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-gray-700">Components</h3>
                    <button onClick={() => setShowComponentLibrary(false)} className="p-1 hover:bg-gray-100 rounded">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Drag to canvas or click to add</p>
                  <div className="grid grid-cols-2 gap-2">
                    {componentTemplates.map(template => {
                      const IconComp = iconMap[template.icon] || Square;
                      return (
                        <button
                          key={template.type}
                          draggable
                          onDragStart={(e) => handleDragStart(e, template)}
                          onClick={() => addComponent(template)}
                          className="flex flex-col items-center gap-2 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all cursor-move active:scale-95"
                          title={template.name}
                        >
                          <IconComp size={22} className="text-gray-600" />
                          <span className="text-xs text-gray-700 text-center font-medium">{template.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Canvas */}
              <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                {selectedPage ? (
                  <div 
                    className="mx-auto bg-white rounded-xl shadow-xl transition-all duration-300 overflow-hidden"
                    style={{ width: getDeviceWidth(), minHeight: '600px' }}
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{selectedPage.route}</span>
                      </div>
                      <span className="text-xs text-gray-500">Live Preview</span>
                    </div>
                      
                    <div 
                      className="p-6"
                      onDragOver={(e) => handleDragOver(e)}
                      onDrop={(e) => handleDrop(e)}
                    >
                      {selectedPage.components.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center text-gray-500 bg-gray-50">
                          <LayoutDashboard size={64} className="mx-auto mb-4 text-gray-300" />
                          <p className="font-medium text-lg mb-2">Drag components here</p>
                          <p className="text-sm">Or click components from the left panel to add them</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {selectedPage.components
                            .sort((a, b) => a.order - b.order)
                            .map((comp, index) => renderComponentPreview(comp, index))}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <FileText size={80} className="mx-auto mb-4 text-gray-300" />
                      <p className="font-medium text-lg">Select a page to start editing</p>
                      <p className="text-sm mt-2">Choose from the pages list on the left</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Properties Panel */}
              {showProperties && selectedComponent && (
                <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 shadow-sm">
                  <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm text-gray-700">Properties</h3>
                      <div className="flex gap-1">
                        <button onClick={() => moveComponent(selectedComponent.id, 'up')} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Move Up">
                          <ArrowUp size={14} />
                        </button>
                        <button onClick={() => moveComponent(selectedComponent.id, 'down')} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Move Down">
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => duplicateComponent(selectedComponent)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Duplicate">
                          <Copy size={14} />
                        </button>
                        <button onClick={() => deleteComponent(selectedComponent.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors" title="Delete">
                          <Trash2 size={14} />
                        </button>
                        <button onClick={() => setShowProperties(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors ml-2">
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 px-2 py-1.5 bg-gray-50 rounded-lg capitalize font-medium">
                      {selectedComponent.type}
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Props Editor */}
                    <div className="space-y-4 mb-6">
                      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                        <Palette size={14} /> Content
                      </h4>
                      
                      {Object.entries(selectedComponent.props).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          
                          {typeof value === 'boolean' ? (
                            <label className="flex items-center gap-2 cursor-pointer">
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
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Image URL"
                              />
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="row">Row (Horizontal)</option>
                              <option value="column">Column (Vertical)</option>
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
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                              className="w-full text-xs border border-gray-300 rounded-lg px-3 py-2 font-mono h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="JSON format"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value as string}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                props: { ...selectedComponent.props, [key]: e.target.value }
                              })}
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Styles Editor */}
                    <div className="space-y-4 pt-6 border-t border-gray-200">
                      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-2">
                        <Palette size={14} /> Styles
                      </h4>
                      
                      {Object.entries(selectedComponent.styles).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 capitalize">
                            {key.replace(/([A-Z])/g, ' $1')}
                          </label>
                          
                          {key.toLowerCase().includes('color') ? (
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={value as string}
                                onChange={(e) => updateComponent(selectedComponent.id, {
                                  styles: { ...selectedComponent.styles, [key]: e.target.value }
                                })}
                                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                              />
                              <input
                                type="text"
                                value={value as string}
                                onChange={(e) => updateComponent(selectedComponent.id, {
                                  styles: { ...selectedComponent.styles, [key]: e.target.value }
                                })}
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                                placeholder="#000000"
                              />
                            </div>
                          ) : (
                            <input
                              type="text"
                              value={value as string}
                              onChange={(e) => updateComponent(selectedComponent.id, {
                                styles: { ...selectedComponent.styles, [key]: e.target.value }
                              })}
                              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                              placeholder="e.g., 20px, 1rem, auto"
                            />
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={() => {
                          const styleName = prompt('CSS property name (e.g., margin, border):');
                          if (styleName) {
                            updateComponent(selectedComponent.id, {
                              styles: { ...selectedComponent.styles, [styleName]: '' }
                            });
                          }
                        }}
                        className="w-full text-sm text-blue-600 hover:text-blue-800 py-2.5 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-all font-medium"
                      >
                        + Add Custom Style
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Show properties button when panel is hidden */}
              {!showProperties && selectedComponent && (
                <button
                  onClick={() => setShowProperties(true)}
                  className="fixed right-4 bottom-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                  title="Show Properties"
                >
                  <Palette size={20} />
                </button>
              )}

              {/* Show component library button when hidden */}
              {!showComponentLibrary && (
                <button
                  onClick={() => setShowComponentLibrary(true)}
                  className="fixed left-72 bottom-4 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
                  title="Show Components"
                >
                  <Layers size={20} />
                </button>
              )}
            </div>
          )}

          {/* Media Library */}
          {activeTab === 'media' && (
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2.5 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors font-medium shadow-sm"
                >
                  <Upload size={20} /> Upload File
                </button>
                <button onClick={loadUploads} className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                  <RefreshCw size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {uploads.map(file => (
                  <div key={file.filename} className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                    <img src={file.url} alt={file.filename} className="w-full h-40 object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2 pb-3">
                      <button
                        onClick={() => { navigator.clipboard.writeText(file.url); toast.success('✅ URL copied'); }}
                        className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                        title="Copy URL"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Delete this file?')) {
                            await fetch(`${API_URL}/uploads/${file.filename}?token=${token}`, { method: 'DELETE' });
                            loadUploads();
                            toast.success('File deleted');
                          }
                        }}
                        className="p-2 bg-white rounded-lg hover:bg-red-100 text-red-500 transition-colors shadow-lg"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="p-2 text-xs text-gray-600 truncate border-t border-gray-100">{file.filename}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts */}
          {activeTab === 'contacts' && (
            <div className="p-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Source</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map(contact => (
                      <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{contact.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{contact.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">+91 {contact.phone}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{contact.source}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={async () => {
                              if (confirm('Delete this contact?')) {
                                await fetch(`${API_URL}/contacts/${contact._id}?token=${token}`, { method: 'DELETE' });
                                loadContacts();
                                toast.success('Contact deleted');
                              }
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contacts.length === 0 && (
                  <div className="p-12 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-3 text-gray-300" />
                    <p className="font-medium">No contacts yet</p>
                    <p className="text-sm mt-1">Form submissions will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div className="p-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Mail size={24} className="text-blue-500" /> Email Settings (SMTP)
                </h2>
                
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Host</label>
                      <input
                        type="text"
                        value={smtpSettings.smtp_host}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_host: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Port</label>
                      <input
                        type="number"
                        value={smtpSettings.smtp_port}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_port: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Username</label>
                    <input
                      type="email"
                      value={smtpSettings.smtp_user}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_user: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">SMTP Password</label>
                    <input
                      type="password"
                      value={smtpSettings.smtp_pass}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, smtp_pass: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="App-specific password"
                    />
                    <p className="text-xs text-gray-500 mt-2">💡 For Gmail, use an App Password (not your regular password)</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                      <input
                        type="email"
                        value={smtpSettings.admin_email}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, admin_email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Sender Name</label>
                      <input
                        type="text"
                        value={smtpSettings.sender_name}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, sender_name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-6">
                    <button
                      onClick={saveSmtpSettings}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition-colors font-medium shadow-sm"
                    >
                      <Save size={20} /> Save Settings
                    </button>
                    <button
                      onClick={testEmail}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 transition-colors font-medium"
                    >
                      <Mail size={20} /> Send Test Email
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
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
              <span className="font-semibold text-gray-800">Preview: {selectedPage.page_name}</span>
              <button onClick={() => setShowPreview(false)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <X size={22} />
              </button>
            </div>
            <div className="p-8 bg-white">
              {selectedPage.components.map((comp, index) => renderComponentPreview(comp, index))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
