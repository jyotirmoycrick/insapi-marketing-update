import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, GripVertical, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; // Python server

interface NavItem {
  _id?: string;
  label: string;
  path: string;
  type: 'link' | 'dropdown' | 'button';
  children?: Array<{ label: string; path: string; order: number }>;
  icon?: string;
  order: number;
  isVisible: boolean;
  openInNewTab?: boolean;
  cssClass?: string;
}

interface NavigationSettings {
  logo?: string;
  logoAlt?: string;
  contactEmail?: string;
  contactPhone?: string;
  showContactInfo?: boolean;
}

interface NavigationManagerProps {
  token: string;
}

export function NavigationManager({ token }: NavigationManagerProps) {
  const [items, setItems] = useState<NavItem[]>([]);
  const [settings, setSettings] = useState<NavigationSettings>({});
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    try {
      const res = await fetch(`${API_URL}/navigation/main-menu`);
      const data = await res.json();
      setItems(data.items || []);
      setSettings(data.settings || {});
    } catch (error) {
      toast.error('Failed to load navigation');
    }
  };

  const saveNavigation = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/navigation/main-menu?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, settings })
      });

      if (!res.ok) throw new Error('Failed to save');

      toast.success('Navigation saved successfully');
      loadNavigation();
    } catch (error) {
      toast.error('Failed to save navigation');
    } finally {
      setIsSaving(false);
    }
  };

  const addNewItem = () => {
    const newItem: NavItem = {
      label: 'New Item',
      path: '/',
      type: 'link',
      order: items.length,
      isVisible: true,
      children: []
    };
    setEditingItem(newItem);
    setIsAddingNew(true);
  };

  const saveItem = () => {
    if (!editingItem) return;

    if (isAddingNew) {
      setItems([...items, editingItem]);
    } else {
      setItems(items.map(item => 
        item.order === editingItem.order ? editingItem : item
      ));
    }

    setEditingItem(null);
    setIsAddingNew(false);
  };

  const deleteItem = (order: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.order !== order).map((item, idx) => ({
        ...item,
        order: idx
      })));
    }
  };

  const toggleVisibility = (order: number) => {
    setItems(items.map(item =>
      item.order === order ? { ...item, isVisible: !item.isVisible } : item
    ));
  };

  const moveItem = (order: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const index = newItems.findIndex(item => item.order === order);
    
    if (direction === 'up' && index > 0) {
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    } else if (direction === 'down' && index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    }

    // Update orders
    newItems.forEach((item, idx) => item.order = idx);
    setItems(newItems);
  };

  const addChildItem = (parentOrder: number) => {
    const parent = items.find(item => item.order === parentOrder);
    if (!parent) return;

    const newChild = {
      label: 'New Sub-item',
      path: '/',
      order: (parent.children || []).length
    };

    setItems(items.map(item =>
      item.order === parentOrder
        ? { ...item, type: 'dropdown' as const, children: [...(item.children || []), newChild] }
        : item
    ));
  };

  const removeChildItem = (parentOrder: number, childOrder: number) => {
    setItems(items.map(item =>
      item.order === parentOrder
        ? {
            ...item,
            children: (item.children || [])
              .filter(child => child.order !== childOrder)
              .map((child, idx) => ({ ...child, order: idx }))
          }
        : item
    ));
  };

  const toggleExpanded = (order: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(order)) {
      newExpanded.delete(order);
    } else {
      newExpanded.add(order);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Navigation Manager</h2>
        <div className="flex gap-2">
          <button
            onClick={addNewItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Item
          </button>
          <button
            onClick={saveNavigation}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Save size={20} />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Navigation Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Logo URL</label>
            <input
              type="text"
              value={settings.logo || ''}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="/path/to/logo.png"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Logo Alt Text</label>
            <input
              type="text"
              value={settings.logoAlt || ''}
              onChange={(e) => setSettings({ ...settings, logoAlt: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Company Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail || ''}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="info@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contact Phone</label>
            <input
              type="text"
              value={settings.contactPhone || ''}
              onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="+91 1234567890"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.showContactInfo || false}
              onChange={(e) => setSettings({ ...settings, showContactInfo: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium">Show Contact Info in Header</span>
          </label>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.order} className="bg-white rounded-lg shadow-md">
            <div className="flex items-center gap-3 p-4">
              <GripVertical className="text-gray-400 cursor-move" size={20} />
              
              <div className="flex-1 grid grid-cols-4 gap-3 items-center">
                <div className="font-medium">{item.label}</div>
                <div className="text-sm text-gray-600">{item.path}</div>
                <div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    item.type === 'dropdown' ? 'bg-purple-100 text-purple-700' :
                    item.type === 'button' ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => toggleVisibility(item.order)}
                    className="p-2 hover:bg-gray-100 rounded"
                    title={item.isVisible ? 'Hide' : 'Show'}
                  >
                    {item.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  
                  {item.type === 'dropdown' && (
                    <button
                      onClick={() => toggleExpanded(item.order)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      {expandedItems.has(item.order) ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  )}
                  
                  <button
                    onClick={() => moveItem(item.order, 'up')}
                    disabled={index === 0}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                  >
                    ↑
                  </button>
                  
                  <button
                    onClick={() => moveItem(item.order, 'down')}
                    disabled={index === items.length - 1}
                    className="p-2 hover:bg-gray-100 rounded disabled:opacity-30"
                  >
                    ↓
                  </button>
                  
                  <button
                    onClick={() => { setEditingItem(item); setIsAddingNew(false); }}
                    className="p-2 hover:bg-blue-100 text-blue-600 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                  
                  <button
                    onClick={() => deleteItem(item.order)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Dropdown Children */}
            {item.type === 'dropdown' && expandedItems.has(item.order) && (
              <div className="border-t bg-gray-50 p-4 ml-12">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-sm">Dropdown Items</h4>
                  <button
                    onClick={() => addChildItem(item.order)}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Sub-item
                  </button>
                </div>
                
                {(item.children || []).map((child, childIdx) => (
                  <div key={childIdx} className="flex items-center gap-3 mb-2 bg-white p-3 rounded">
                    <input
                      type="text"
                      value={child.label}
                      onChange={(e) => {
                        const newItems = [...items];
                        const parentItem = newItems.find(i => i.order === item.order);
                        if (parentItem && parentItem.children) {
                          parentItem.children[childIdx].label = e.target.value;
                          setItems(newItems);
                        }
                      }}
                      className="flex-1 px-3 py-1 border rounded"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={child.path}
                      onChange={(e) => {
                        const newItems = [...items];
                        const parentItem = newItems.find(i => i.order === item.order);
                        if (parentItem && parentItem.children) {
                          parentItem.children[childIdx].path = e.target.value;
                          setItems(newItems);
                        }
                      }}
                      className="flex-1 px-3 py-1 border rounded"
                      placeholder="Path"
                    />
                    <button
                      onClick={() => removeChildItem(item.order, child.order)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isAddingNew ? 'Add New Item' : 'Edit Item'}
              </h3>
              <button onClick={() => { setEditingItem(null); setIsAddingNew(false); }}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Label</label>
                <input
                  type="text"
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Path</label>
                <input
                  type="text"
                  value={editingItem.path}
                  onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={editingItem.type}
                  onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="link">Link</option>
                  <option value="dropdown">Dropdown</option>
                  <option value="button">Button</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingItem.openInNewTab || false}
                    onChange={(e) => setEditingItem({ ...editingItem, openInNewTab: e.target.checked })}
                    className="rounded"
                  />
                  <span className="text-sm">Open in new tab</span>
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={saveItem}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditingItem(null); setIsAddingNew(false); }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
