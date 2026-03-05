import { Mail, Phone, Menu, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/shared/logo.png';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

const services = [
  { id: 'branding-pr', label: 'Branding & PR', path: '/branding-pr' },
  { id: 'content-marketing', label: 'Content Marketing', path: '/content-marketing' },
  { id: 'google-ads', label: 'Google Ads', path: '/google-ads' },
  { id: 'meta-ads', label: 'Meta Ads', path: '/meta-ads' },
  { id: 'shopify', label: 'Shopify Development', path: '/shopify-development' },
  { id: 'social-media', label: 'Social Media Marketing', path: '/social-media-marketing' },
];

export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const handleServiceClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const isActive = (path: string) => location.pathname === path;
  const isServicePage = services.some(s => location.pathname === s.path);

  return (
    <header className="bg-white border-b sticky top-0 z-50" data-testid="header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          <div 
            className="cursor-pointer"
            onClick={handleHomeClick}
            data-testid="header-logo"
          >
            <img src={logo} alt="InsAPI Marketing" className="h-8 md:h-10 lg:h-12 w-auto" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" data-testid="desktop-nav">
            <a 
              href="/" 
              onClick={handleHomeClick} 
              className={`text-sm xl:text-base transition-colors ${isActive('/') && !isServicePage ? 'text-[#4A90E2] font-semibold' : 'text-[#1E3A5F] hover:text-[#4A90E2]'}`}
              data-testid="nav-home"
            >
              Home
            </a>
            
            {/* Services Dropdown - Click to toggle */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`text-sm xl:text-base flex items-center gap-1 transition-colors ${isServicePage ? 'text-[#4A90E2] font-semibold' : 'text-[#1E3A5F] hover:text-[#4A90E2]'}`}
                data-testid="nav-services-dropdown"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu with animation */}
              <div className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[220px] z-50 border border-gray-100 transition-all duration-200 origin-top ${
                servicesDropdownOpen 
                  ? 'opacity-100 scale-100 visible' 
                  : 'opacity-0 scale-95 invisible'
              }`}>
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.path)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      isActive(service.path) 
                        ? 'text-[#4A90E2] bg-blue-50 font-semibold' 
                        : 'text-[#1E3A5F] hover:bg-gray-50 hover:text-[#4A90E2]'
                    }`}
                    data-testid={`nav-${service.id}`}
                  >
                    {service.label}
                  </button>
                ))}
              </div>
            </div>
            
            <a href="#about" onClick={handleAboutClick} className="text-[#1E3A5F] hover:text-[#4A90E2] text-sm xl:text-base" data-testid="nav-about">About</a>
            <a href="#" className="text-[#1E3A5F] hover:text-[#4A90E2] text-sm xl:text-base" data-testid="nav-blog">Blog</a>
            <a href="#" className="text-[#1E3A5F] hover:text-[#4A90E2] text-sm xl:text-base" data-testid="nav-contact">Contact</a>
          </nav>
          
          {/* Desktop Contact Info */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-2 text-xs lg:text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors">
              <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden lg:inline">+1 234 567 890</span>
            </a>
            <a href="mailto:info@insapimarketing.com" className="flex items-center gap-2 text-xs lg:text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors">
              <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden lg:inline">info@insapimarketing.com</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#1E3A5F] p-2"
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
              {/* Home */}
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  isActive('/') && !isServicePage ? 'text-[#4A90E2] bg-blue-50 font-semibold' : 'text-[#1E3A5F] hover:bg-gray-50'
                }`}
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              
              {/* Services - Collapsible */}
              <div className="border-t border-b my-1">
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between px-4 py-3 transition-colors ${
                    isServicePage ? 'text-[#4A90E2] font-semibold' : 'text-[#1E3A5F]'
                  }`}
                  data-testid="mobile-services-toggle"
                >
                  <span>Services</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-200 ${
                  mobileServicesOpen ? 'max-h-[400px]' : 'max-h-0'
                }`}>
                  <div className="py-2 pl-4 space-y-1">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => handleServiceClick(service.path)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive(service.path)
                            ? 'text-[#4A90E2] bg-blue-50 font-semibold'
                            : 'text-[#1E3A5F] hover:bg-gray-50 hover:text-[#4A90E2]'
                        }`}
                        data-testid={`mobile-nav-${service.id}`}
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Other Links */}
              <button onClick={handleAboutClick} className="w-full text-left px-4 py-3 text-[#1E3A5F] hover:bg-gray-50 rounded-lg transition-colors" data-testid="mobile-nav-about">
                About
              </button>
              <button className="w-full text-left px-4 py-3 text-[#1E3A5F] hover:bg-gray-50 rounded-lg transition-colors" data-testid="mobile-nav-blog">
                Blog
              </button>
              <button className="w-full text-left px-4 py-3 text-[#1E3A5F] hover:bg-gray-50 rounded-lg transition-colors" data-testid="mobile-nav-contact">
                Contact
              </button>
              
              {/* Contact Info */}
              <div className="border-t mt-2 pt-4 px-4 space-y-3">
                <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+1 234 567 890</span>
                </a>
                <a href="mailto:info@insapimarketing.com" className="flex items-center gap-3 text-sm text-[#1E3A5F] hover:text-[#4A90E2] transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>info@insapimarketing.com</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
