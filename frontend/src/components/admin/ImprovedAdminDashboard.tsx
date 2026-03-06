import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Users, Settings, LogOut, Save, Plus, Trash2, 
  Upload, Copy, RefreshCw, ExternalLink, Mail, 
  Image, Menu, Edit2, X
} from 'lucide-react';
import logo from '@/assets/shared/logo.png';
import { toast } from 'sonner';
import { NavigationManager } from './NavigationManager';
import { PageManager } from './PageManager';
import { ElementorPageBuilder } from './ElementorPageBuilder';
import { getAbsoluteUploadUrl } from '../../utils/urlHelper';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface Page {
  page_id: string;
  page_name: string;
  route: string;
  components: any[];
  is_published: boolean;
  meta: Record<string, any>;
}

export function ImprovedAdminDashboard() {
  const [activeTab, setActiveTab] = useState('builder');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [smtpSettings, setSmtpSettings] = useState({
    smtp_host: '', smtp_port: 587, smtp_user: '', smtp_pass: '',
    admin_email: 'malojyotirmoy@gmail.com', sender_name: 'InsAPI Marketing'
  });
  const [uploads, setUploads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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

  // If editing a page in builder, show ElementorPageBuilder
  if (editingPageId && token) {
    return (
      <ElementorPageBuilder
        pageId={editingPageId}
        token={token}
        onBack={() => {
          setEditingPageId(null);
          setActiveTab('builder');
          loadPages();
        }}
      />
    );
  }

  const verifyAndLoad = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/verify?token=${token}`);
      const data = await res.json();
      if (!data.valid) {
        // Session is invalid, logout silently
        localStorage.removeItem('admin_token');
        navigate('/fast-admin');
        return;
      }
      loadPages();
      loadContacts();
      loadSmtpSettings();
      loadUploads();
    } catch (e) {
      // Network error or server issue, logout silently
      localStorage.removeItem('admin_token');
      navigate('/fast-admin');
    }
  };

  const loadPages = async () => {
    try {
      const res = await fetch(`${API_URL}/pages?token=${token}`);
      
      // Handle 401 Unauthorized - session expired
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/fast-admin');
        return;
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Validate data is an array
      if (!Array.isArray(data)) {
        console.error('Pages data is not an array:', data);
        setPages([]);
        toast.error('Failed to load pages');
        return;
      }
      
      setPages(data);
      if (data.length > 0 && !selectedPage) {
        setSelectedPage(data[0]);
      }
    } catch (e) {
      console.error('Failed to load pages:', e);
      setPages([]);
      toast.error('Failed to load pages');
    }
  };

  const loadContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/contacts?token=${token}`);
      
      // Handle 401 Unauthorized - session expired
      if (res.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/fast-admin');
        return;
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Validate data is an array
      if (!Array.isArray(data)) {
        console.error('Contacts data is not an array:', data);
        setContacts([]);
        return;
      }
      
      setContacts(data);
    } catch (e) {
      console.error('Failed to load contacts:', e);
      setContacts([]);
    }
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
    // Don't show toast on logout - it's expected behavior
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
            { id: 'pages', icon: FileText, label: 'Page Manager' },
            { id: 'navigation', icon: Menu, label: 'Navigation' },
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
              {activeTab === 'pages' && '📄 Page Manager'}
              {activeTab === 'navigation' && '🧭 Navigation Manager'}
              {activeTab === 'media' && '🖼️ Media Library'}
              {activeTab === 'contacts' && '👥 Contact Submissions'}
              {activeTab === 'settings' && '⚙️ Settings'}
            </h1>
          </div>
          

        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {/* Page Builder - Simple Page List */}
          {activeTab === 'builder' && (
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Page Builder</h2>
                    <p className="text-gray-600 mt-1">Select a page to edit with the visual builder</p>
                  </div>
                  <button
                    onClick={createNewPage}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus size={20} />
                    Create New Page
                  </button>
                </div>

                <div className="grid gap-4">
                  {pages.map(page => (
                    <div
                      key={page.page_id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">{page.page_name}</h3>
                            {page.is_published ? (
                              <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                                Published
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                Draft
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{page.route}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {page.components?.length || 0} components
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingPageId(page.page_id)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Edit2 size={18} />
                            Edit Page
                          </button>
                          
                          <a
                            href={page.route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 hover:bg-gray-100 rounded text-gray-600"
                            title="View Page"
                          >
                            <ExternalLink size={18} />
                          </a>

                          <button
                            onClick={() => deletePage(page.page_id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded"
                            title="Delete Page"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {pages.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FileText size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No pages yet. Create one to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Page Manager */}
          {activeTab === 'pages' && token && (
            <PageManager 
              token={token} 
              onEditPage={(pageId) => {
                setEditingPageId(pageId);
              }}
            />
          )}

          {/* Navigation Manager */}
          {activeTab === 'navigation' && token && (
            <NavigationManager token={token} />
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
                {uploads.map(file => {
                  const absoluteUrl = getAbsoluteUploadUrl(file.url);
                  return (
                    <div key={file.filename} className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                      <img src={absoluteUrl} alt={file.filename} className="w-full h-40 object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-2 pb-3">
                        <button
                          onClick={() => { 
                            navigator.clipboard.writeText(absoluteUrl); 
                            toast.success('✅ Full URL copied to clipboard!'); 
                          }}
                          className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                          title="Copy Full URL"
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
                      <div className="p-2 text-xs text-gray-600 truncate border-t border-gray-100" title={absoluteUrl}>
                        {file.filename}
                      </div>
                    </div>
                  );
                })}
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
    </div>
  );
}
