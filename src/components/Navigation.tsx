import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { getAssetPath } from "../utils/assetPath";
import { 
  Phone, 
  MapPin, 
  Menu,
  Home,
  Car,
  Plane,
  Users,
  Calendar,
  MapIcon,
  Shield,
  Euro,
  Phone as PhoneIcon,
  HelpCircle
} from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const pages = [
  { id: 'home', name: 'Home', icon: Home },
  { id: 'services', name: 'Services', icon: Car },
  { id: 'airport', name: 'Airport Transfers', icon: Plane },
  { id: 'corporate', name: 'Corporate', icon: Users },
  { id: 'events', name: 'Special Events', icon: Calendar },
  { id: 'tours', name: 'City Tours', icon: MapIcon },
  { id: 'fleet', name: 'Fleet', icon: Car },
  { id: 'about', name: 'About Us', icon: Users },
  { id: 'safety', name: 'Safety & Standards', icon: Shield },
  { id: 'pricing', name: 'Pricing', icon: Euro },
  { id: 'book', name: 'Book Now', icon: Calendar },
  { id: 'contact', name: 'Contact', icon: PhoneIcon },
  { id: 'faq', name: 'FAQ', icon: HelpCircle }
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled past hero section (adjust threshold as needed)
      setIsScrolled(currentScrollY > 100);
      
      // Hide/show navigation based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide nav
        setIsVisible(false);
      } else {
        // Scrolling up - show nav
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => handlePageChange('home')}
        >
          <img 
            src="/src/assets/logo.png" 
            alt="My French Driver Logo" 
            className="w-1 h-1 lg:w-1 lg:h-1 object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {pages.slice(0, 7).map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageChange(page.id)}
              className={`relative text-sm transition-all duration-300 group ${
                currentPage === page.id ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <span className="relative z-10">{page.name}</span>
              {/* Hover underline animation */}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                currentPage === page.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
              {/* Hover background effect */}
              <span className="absolute inset-0 bg-primary/5 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
            </button>
          ))}
          <div className="group relative">
            <button className="relative text-sm transition-all duration-300 hover:text-primary group">
              <span className="relative z-10">More</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="absolute inset-0 bg-primary/5 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-card/95 backdrop-blur-md border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {pages.slice(7).map((page) => (
                <button
                  key={page.id}
                  onClick={() => handlePageChange(page.id)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center space-x-3 group/item ${
                    currentPage === page.id ? 'text-primary bg-primary/10' : ''
                  }`}
                >
                  <page.icon className="w-4 h-4 group-hover/item:scale-110 transition-transform duration-200" />
                  <span>{page.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        {/* Contact Info & CTA */}
        <div className="flex items-center space-x-4">
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group">
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>+33 1 42 60 30 30</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200 group">
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>Paris & Île-de-France</span>
            </div>
          </div>
          <Button 
            onClick={() => handlePageChange('book')}
            className="hidden md:flex relative overflow-hidden group hover:scale-105 transition-all duration-200"
          >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Button>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden p-2 hover:bg-primary/10 hover:scale-105 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="text-center pb-4 border-b border-border/50">
                  <img 
                    src="/src/assets/logo.png" 
                    alt="My French Driver Logo" 
                    className="w-14 h-14 object-contain mx-auto mb-3 hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <div className="space-y-2">
                  {pages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.id}
                        onClick={() => handlePageChange(page.id)}
                        className={`w-full text-left p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 flex items-center space-x-3 group ${
                          currentPage === page.id ? 'bg-primary/10 text-primary' : ''
                        }`}
                      >
                        <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                        <span>{page.name}</span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>+33 1 42 60 30 30</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group">
                    <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Paris & Île-de-France</span>
                  </div>
                  <Button 
                    onClick={() => handlePageChange('book')}
                    className="w-full hover:scale-105 transition-all duration-200 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Book Now</span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}