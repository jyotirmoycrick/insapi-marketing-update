import { useState, useEffect } from 'react';
import { Edit2, Eye, EyeOff, Trash2, Plus, FileText, ExternalLink, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ElementorPageBuilder } from './ElementorPageBuilder';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; // Python server

interface Page {
  _id: string;
  page_id: string;
  page_name: string;
  route: string;
  type: 'static' | 'dynamic' | 'builder';
  is_published: boolean;
  is_editable: boolean;
  created_at: string;
  updated_at: string;
}

interface PageManagerProps {
  token: string;
  onEditPage: (pageId: string) => void;
}

// Predefined static pages that exist in the React app
const STATIC_PAGES = [
  { page_id: 'home', page_name: 'Home Page', route: '/', component: 'HomePage' },
  { page_id: 'services', page_name: 'Services', route: '/services', component: 'ServicesPage' },
  { page_id: 'content-marketing', page_name: 'Content Marketing', route: '/content-marketing', component: 'ContentMarketingPage' },
  { page_id: 'google-ads', page_name: 'Google Ads', route: '/google-ads', component: 'GoogleAdsPage' },
  { page_id: 'meta-ads', page_name: 'Meta Ads', route: '/meta-ads', component: 'MetaAdsPage' },
  { page_id: 'shopify-development', page_name: 'Shopify Development', route: '/shopify-development', component: 'ShopifyPage' },
  { page_id: 'social-media-marketing', page_name: 'Social Media Marketing', route: '/social-media-marketing', component: 'SocialMediaPage' },
  { page_id: 'branding-pr', page_name: 'Branding & PR', route: '/branding-pr', component: 'BuildABrandPage' }
];

export function PageManager({ token, onEditPage }: PageManagerProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [staticPages, setStaticPages] = useState(STATIC_PAGES);
  const [loading, setLoading] = useState(true);
  const [convertingPage, setConvertingPage] = useState<string | null>(null);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (editingPageId) {
    return (
      <ElementorPageBuilder
        pageId={editingPageId}
        token={token}
        onBack={() => {
          setEditingPageId(null);
          loadPages();
        }}
      />
    );
  }

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/pages?token=${token}`);
      const data = await res.json();
      setPages(data);
      
      // Filter out static pages that are already in database
      const dbPageIds = new Set(data.map((p: Page) => p.page_id));
      setStaticPages(STATIC_PAGES.filter(sp => !dbPageIds.has(sp.page_id)));
    } catch (error) {
      toast.error('Failed to load pages');
    } finally {
      setLoading(false);
    }
  };

  const togglePublish = async (pageId: string, currentStatus: boolean) => {
    try {
      const endpoint = !currentStatus ? 'publish' : 'unpublish';
      const res = await fetch(`${API_URL}/pages/${pageId}/${endpoint}?token=${token}`, {
        method: 'POST'
      });

      if (!res.ok) throw new Error('Failed to update');

      toast.success(`Page ${!currentStatus ? 'published' : 'unpublished'}`);
      loadPages();
    } catch (error) {
      toast.error('Failed to update page status');
    }
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const res = await fetch(`${API_URL}/pages/${pageId}?token=${token}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Page deleted successfully');
      loadPages();
    } catch (error) {
      toast.error('Failed to delete page');
    }
  };

  const convertToEditable = async (staticPage: typeof STATIC_PAGES[0]) => {
    setConvertingPage(staticPage.page_id);
    
    try {
      // Create a basic page structure for the static page
      const res = await fetch(`${API_URL}/pages?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_id: staticPage.page_id,
          page_name: staticPage.page_name,
          route: staticPage.route,
          components: [
            {
              id: `comp_${Date.now()}`,
              type: 'heading',
              props: {
                content: `${staticPage.page_name} - Now Editable!`,
                tag: 'h1',
                align: 'center'
              },
              styles: {
                fontSize: '36px',
                fontWeight: 'bold',
                padding: '40px 20px'
              },
              order: 0
            },
            {
              id: `comp_${Date.now() + 1}`,
              type: 'text',
              props: {
                content: 'This page has been converted to an editable format. You can now customize it using the page builder.',
                align: 'center'
              },
              styles: {
                fontSize: '18px',
                padding: '20px'
              },
              order: 1
            }
          ],
          is_published: false,
          meta: {}
        })
      });

      if (!res.ok) throw new Error('Failed to convert');

      toast.success(`${staticPage.page_name} is now editable!`);
      loadPages();
    } catch (error) {
      toast.error('Failed to convert page');
    } finally {
      setConvertingPage(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <RefreshCw className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Page Manager</h2>
        <button
          onClick={() => navigate('/fast-admin/dashboard')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Create New Page
        </button>
      </div>

      {/* Static Pages Section */}
      {staticPages.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Static React Pages (Not Yet Editable)
          </h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-yellow-800">
              These pages are currently hardcoded in React. Click "Make Editable" to convert them to the page builder format.
            </p>
          </div>
          <div className="grid gap-4">
            {staticPages.map((page) => (
              <div key={page.page_id} className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FileText className="text-gray-400" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-800">{page.page_name}</h4>
                    <p className="text-sm text-gray-600">{page.route}</p>
                    <p className="text-xs text-gray-500 mt-1">Component: {page.component}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                    onClick={() => convertToEditable(page)}
                    disabled={convertingPage === page.page_id}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm"
                  >
                    {convertingPage === page.page_id ? 'Converting...' : 'Make Editable'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editable Pages Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Editable Pages ({pages.length})
        </h3>
        <div className="grid gap-4">
          {pages.map((page) => (
            <div key={page._id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <FileText className="text-blue-600" size={24} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-800">{page.page_name}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        page.type === 'builder' ? 'bg-blue-100 text-blue-700' :
                        page.type === 'dynamic' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {page.type}
                      </span>
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
                    <p className="text-sm text-gray-600 mt-1">{page.route}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated: {new Date(page.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublish(page.page_id, page.is_published)}
                    className={`p-2 rounded ${
                      page.is_published
                        ? 'hover:bg-gray-100 text-gray-600'
                        : 'hover:bg-green-100 text-green-600'
                    }`}
                    title={page.is_published ? 'Unpublish' : 'Publish'}
                  >
                    {page.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
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
                    onClick={() => setEditingPageId(page.page_id)}
                    className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                    title="Edit Page"
                  >
                    <Edit2 size={18} />
                  </button>

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
              <p>No editable pages yet. Create one or convert a static page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
