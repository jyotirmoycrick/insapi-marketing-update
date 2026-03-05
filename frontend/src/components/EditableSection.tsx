import { ReactNode, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../app/components/ui/dialog';
import { Button } from '../app/components/ui/button';
import { Input } from '../app/components/ui/input';
import { Textarea } from '../app/components/ui/textarea';
import { Label } from '../app/components/ui/label';
import { contentAPI } from '../services/api';

interface EditableSectionProps {
  children: ReactNode;
  sectionId: string;
  sectionName: string;
  page: string;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'number';
    value: any;
  }[];
  onSave?: (data: any) => void;
}

export const EditableSection = ({
  children,
  sectionId,
  sectionName,
  page,
  fields,
  onSave
}: EditableSectionProps) => {
  const { isEditMode } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: field.value }), {})
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleClick = () => {
    if (isEditMode) {
      setIsOpen(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save each field to the backend
      for (const field of fields) {
        await contentAPI.createOrUpdateContent({
          page,
          section: sectionId,
          key: field.key,
          value: formData[field.key],
          type: field.type
        });
      }
      
      if (onSave) {
        onSave(formData);
      }
      
      setIsOpen(false);
      // Reload page to show changes
      window.location.reload();
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`relative ${isEditMode ? 'cursor-pointer hover:ring-4 hover:ring-yellow-400 hover:ring-opacity-50 transition-all' : ''}`}
        style={isEditMode ? { outline: '2px dashed rgba(234, 179, 8, 0.3)' } : {}}
      >
        {isEditMode && (
          <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold shadow-lg">
            ✏️ {sectionName}
          </div>
        )}
        {children}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {sectionName}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.key}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    rows={4}
                  />
                ) : (
                  <Input
                    id={field.key}
                    type={field.type}
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
