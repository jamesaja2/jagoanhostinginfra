import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { schoolInfo } from '@/data/school';

const navItems = [
  { name: 'Beranda', href: '/' },
  { name: 'Wawasan', href: '/wawasan' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'FAQ', href: '/faq' },
];

const parentsMenuItems = [
  { name: 'Ekstrakulikuler', href: '/ekstrakulikuler' },
  { name: 'Galeri', href: '/galeri' },
  { name: 'Wawasan', href: '/wawasan' },
  { name: 'FAQ', href: '/faq' },
  { name: 'PCPDB', href: '/pcpdb' },
  { name: 'Pengumuman', href: '/pengumuman' },
  { name: 'Login', href: '/login' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-school-primary/95 backdrop-blur-md shadow-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="p-2 bg-school-accent/10 rounded-xl group-hover:bg-school-accent/20 transition-colors"
            >
              <GraduationCap className="w-8 h-8 text-school-accent" />
            </motion.div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold text-school-text leading-tight">
                {schoolInfo.shortName}
              </p>
              <p className="text-xs text-school-text-muted">
                {schoolInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-school-accent ${
                  isActive(item.href) 
                    ? 'text-school-accent' 
                    : 'text-school-text-muted'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-school-accent rounded-full"
                  />
                )}
              </Link>
            ))}

            {/* Parents Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-school-text-muted hover:text-school-accent">
                  Parents
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-school-secondary/95 backdrop-blur-md border-school-accent/20"
              >
                {parentsMenuItems.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.href}
                      className={`text-sm transition-colors duration-200 ${
                        isActive(item.href) 
                          ? 'text-school-accent bg-school-accent/10' 
                          : 'text-school-text hover:text-school-accent hover:bg-school-accent/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-school-text">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-school-secondary/95 backdrop-blur-md border-school-accent/20">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="text-center pb-4 border-b border-school-accent/20">
                  <p className="text-lg font-bold text-school-text">{schoolInfo.shortName}</p>
                  <p className="text-sm text-school-text-muted">{schoolInfo.tagline}</p>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href) 
                          ? 'text-school-accent bg-school-accent/10' 
                          : 'text-school-text hover:text-school-accent hover:bg-school-accent/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile Parents Menu */}
                <div className="border-t border-school-accent/20 pt-4">
                  <p className="text-sm font-medium text-school-text-muted mb-3 px-3">
                    Parents Menu
                  </p>
                  <div className="space-y-2">
                    {parentsMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(item.href) 
                            ? 'text-school-accent bg-school-accent/10' 
                            : 'text-school-text-muted hover:text-school-accent hover:bg-school-accent/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}