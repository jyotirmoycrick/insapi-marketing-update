import { Mail, Phone, Menu, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAbsoluteUploadUrl } from '@/utils/urlHelper';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'; // Python server

interface NavItem {
  label: string;
  path: string;
  type: 'link' | 'dropdown' | 'button';
  children?: Array<{ label: string; path: string; order: number }>;
  isVisible: boolean;
  openInNewTab?: boolean;
  order: number;
}

interface NavigationSettings {
  logo?: string;
  logoAlt?: string;
  contactEmail?: string;
  contactPhone?: string;
  showContactInfo?: boolean;
}

interface HeaderProps {
  // Reserved for future use
}

export function DynamicHeader(_props: HeaderProps) {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [settings, setSettings] = useState<NavigationSettings>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<Set<number>>(new Set());
  const dropdownRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadNavigation();
  }, []);

  const loadNavigation = async () => {
    try {
      const res = await fetch(`${API_URL}/navigation/main-menu`);
      const data = await res.json();
      setNavItems(data.items || []);
      setSettings(data.settings || {});
    } catch (error) {
      console.error('Failed to load navigation:', error);
      // Fallback to default navigation
      setNavItems([
        { label: 'Home', path: '/', type: 'link', isVisible: true, order: 0 }
      ]);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let clickedInside = false;
      dropdownRefs.current.forEach((ref) => {
        if (ref && ref.contains(event.target as Node)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) {
        setOpenDropdowns(new Set());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdowns(new Set());
    setMobileOpenDropdowns(new Set());
  }, [location.pathname]);

  const toggleDropdown = (order: number) => {
    const newDropdowns = new Set(openDropdowns);
    if (newDropdowns.has(order)) {
      newDropdowns.delete(order);
    } else {
      newDropdowns.add(order);
    }
    setOpenDropdowns(newDropdowns);
  };

  const toggleMobileDropdown = (order: number) => {
    const newDropdowns = new Set(mobileOpenDropdowns);
    if (newDropdowns.has(order)) {
      newDropdowns.delete(order);
    } else {
      newDropdowns.add(order);
    }
    setMobileOpenDropdowns(newDropdowns);
  };

  const handleNavClick = (path: string, openInNewTab?: boolean) => {
    if (openInNewTab) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
    setMobileMenuOpen(false);
    setOpenDropdowns(new Set());
  };

  const isActive = (path: string) => location.pathname === path;
  const isDropdownActive = (item: NavItem) => {
    if (item.type !== 'dropdown' || !item.children) return false;
    return item.children.some(child => location.pathname === child.path);
  };

  const visibleItems = navItems.filter(item => item.isVisible).sort((a, b) => a.order - b.order);

  // Get absolute logo URL
  const logoSrc = settings.logo ? getAbsoluteUploadUrl(settings.logo) : '/src/assets/shared/logo.png';

  return (
    <header className="bg-white border-b sticky top-0 z-50" data-testid="header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div 
            className="cursor-pointer flex-shrink-0"
            onClick={() => handleNavClick('/')}
            data-testid="header-logo"
            style={{ minWidth: '120px', width: '120px' }}
          >
            <img
              src={logoSrc} 
              alt={settings.logoAlt || 'InsAPI Marketing'} 
              width={120}
              height={48}
              loading="eager"
              fetchPriority="high"
              className="h-8 md:h-10 lg:h-12"
              style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" data-testid="desktop-nav">
            {visibleItems.map((item) => {
              if (item.type === 'dropdown' && item.children && item.children.length > 0) {
                return (
                  <div 
                    key={item.order} 
                    className="relative"
                    ref={(el) => {
                      if (el) dropdownRefs.current.set(item.order, el);
                    }}
                  >
                    <button 
                      onClick={() => toggleDropdown(item.order)}
                    className={`text-sm xl:text-base flex items-center gap-1 transition-colors cursor-pointer ${
                        isDropdownActive(item) 
                          ? 'text-[#4A90E2] font-semibold' 
                          : 'text-[#1E3A5F] hover:text-[#4A90E2]'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdowns.has(item.order) ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    <div className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[220px] z-50 border border-gray-100 transition-all duration-200 origin-top ${
                      openDropdowns.has(item.order)
                        ? 'opacity-100 scale-100 visible' 
                        : 'opacity-0 scale-95 invisible'
                    }`}>
                      {item.children.sort((a, b) => a.order - b.order).map((child) => (
                        <button
                          key={child.path}
                          onClick={() => handleNavClick(child.path)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                            isActive(child.path)
                              ? 'text-[#4A90E2] bg-blue-50 font-semibold' 
                              : 'text-[#1E3A5F] hover:bg-gray-50 hover:text-[#4A90E2]'
                          }`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              if (item.type === 'button') {
                return (
                  <button
                    key={item.order}
                    onClick={() => handleNavClick(item.path, item.openInNewTab)}
                    className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7BC2] transition-colors text-sm xl:text-base font-medium cursor-pointer"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <button
                  key={item.order}
                  onClick={() => handleNavClick(item.path, item.openInNewTab)}
                  className={`text-sm xl:text-base transition-colors cursor-pointer ${
                    isActive(item.path)
                      ? 'text-[#4A90E2] font-semibold' 
                      : 'text-[#1E3A5F] hover:text-[#4A90E2]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          
          {/* Desktop Contact Info */}
          {settings.showContactInfo && (
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {settings.contactPhone && (
                <a 
                  href={`tel:${settings.contactPhone}`} 
                  className="flex items-center gap-2 text-xs lg:text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden lg:inline">{settings.contactPhone}</span>
                </a>
              )}
              {settings.contactEmail && (
                <a 
                  href={`mailto:${settings.contactEmail}`} 
                  className="flex items-center gap-2 text-xs lg:text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors cursor-pointer"
                >
                  <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden lg:inline">{settings.contactEmail}</span>
                </a>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#1E3A5F] p-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 border-t bg-white" data-testid="mobile-nav">
            <div className="flex flex-col gap-1">
              {visibleItems.map((item) => {
                if (item.type === 'dropdown' && item.children && item.children.length > 0) {
                  return (
                    <div key={item.order} className="border-t border-b my-1">
                      <button
                        onClick={() => toggleMobileDropdown(item.order)}
                        className={`w-full flex items-center justify-between px-4 py-3 transition-colors cursor-pointer ${
                          isDropdownActive(item) ? 'text-[#4A90E2] font-semibold' : 'text-[#1E3A5F]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                          mobileOpenDropdowns.has(item.order) ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-200 ${
                        mobileOpenDropdowns.has(item.order) ? 'max-h-[400px]' : 'max-h-0'
                      }`}>
                        <div className="py-2 pl-4 space-y-1">
                          {item.children.sort((a, b) => a.order - b.order).map((child) => (
                            <button
                              key={child.path}
                              onClick={() => handleNavClick(child.path)}
                              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer ${
                                isActive(child.path)
                                  ? 'text-[#4A90E2] bg-blue-50 font-semibold'
                                  : 'text-[#1E3A5F] hover:bg-gray-50 hover:text-[#4A90E2]'
                              }`}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.type === 'button') {
                  return (
                    <button
                      key={item.order}
                      onClick={() => handleNavClick(item.path, item.openInNewTab)}
                      className="mx-4 my-2 px-4 py-3 bg-[#4A90E2] text-white rounded-lg hover:bg-[#3A7BC2] transition-colors text-center font-medium cursor-pointer"
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={item.order}
                    onClick={() => handleNavClick(item.path, item.openInNewTab)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                      isActive(item.path)
                        ? 'text-[#4A90E2] bg-blue-50 font-semibold' 
                        : 'text-[#1E3A5F] hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              {/* Contact Info */}
              {settings.showContactInfo && (settings.contactPhone || settings.contactEmail) && (
                <div className="border-t mt-2 pt-4 px-4 space-y-3">
                  {settings.contactPhone && (
                    <a 
                      href={`tel:${settings.contactPhone}`} 
                      className="flex items-center gap-3 text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors cursor-pointer"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{settings.contactPhone}</span>
                    </a>
                  )}
                  {settings.contactEmail && (
                    <a 
                      href={`mailto:${settings.contactEmail}`} 
                      className="flex items-center gap-3 text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{settings.contactEmail}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
