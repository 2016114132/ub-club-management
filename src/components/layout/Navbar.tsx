'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, Button } from '@/components/ui';

export default function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  const publicLinks = [
    { href: '/', label: 'Home' },
    { href: '/feed', label: 'Feed' },
    { href: '/clubs', label: 'Clubs' },
  ];

  const studentLinks = [
    { href: '/feed', label: 'Feed' },
    { href: '/my-clubs', label: 'My Clubs' },
    { href: '/clubs', label: 'Explore' },
    { href: '/events', label: 'Events' },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/requests', label: 'Requests' },
  ];

  const navLinks = isAdmin ? adminLinks : isAuthenticated ? studentLinks : publicLinks;

  return (
    <nav className="bg-gradient-to-r from-primary via-primary to-primary-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={isAdmin ? '/admin' : isAuthenticated ? '/feed' : '/'} className="flex items-center gap-2.5 group hover:text-white">
            <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
              <span className="text-base font-bold text-white">U</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">UBCMS</span>
            {isAdmin && (
              <span className="text-xs bg-gold/90 text-primary-dark px-2 py-0.5 rounded-full font-semibold">Admin</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary ${
                  isActive(link.href) 
                    ? 'bg-gold text-primary-dark font-semibold' 
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/10 transition-colors duration-200 cursor-pointer"
                >
                  <Avatar fallback={user?.name || 'User'} size="sm" />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg py-1.5 text-text-dark border border-gray-100 overflow-hidden animate-fade-in">
                    <div className="px-3 py-2.5 border-b border-gray-100 bg-gray-50/50">
                      <p className="font-semibold text-sm text-text-dark">{user?.name}</p>
                      <p className="text-xs text-text-gray truncate">{user?.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 text-text-gray" />
                        <span>My Profile</span>
                      </Link>
                    </div>

                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-3 py-2 hover:bg-danger/5 w-full text-left text-danger transition-colors text-sm cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login"
                className="px-3 py-1.5 text-sm font-semibold border-2 border-white/40 text-white rounded-lg hover:bg-white/15 hover:border-white/60 transition-all duration-150"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(link.href) ? 'bg-gold text-primary-dark font-semibold' : 'text-white/90 hover:bg-white/15 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
