import { useAdmin } from '../contexts/AdminContext';
import { Button } from '../app/components/ui/button';

export const AdminToolbar = () => {
  const { isAdmin, isEditMode, setIsEditMode, logout, user } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            👤 {user?.name || 'Admin'}
          </span>
          <div className="h-4 w-px bg-gray-600" />
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? 'default' : 'outline'}
            size="sm"
            className={isEditMode ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-gray-800 hover:bg-gray-700 text-white border-gray-600'}
          >
            {isEditMode ? '✏️ Edit Mode ON' : '👁️ View Mode'}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {isEditMode ? 'Click any section to edit' : 'Enable edit mode to make changes'}
          </span>
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};
