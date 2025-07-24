"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdmin } from '@/contexts/AdminContext';
import { Menu, X, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { language, setLanguage, content } = useLanguage();
  const { isLoggedIn, logout } = useAdmin();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = content?.navigation || {};

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'products', href: '/products' },
    { key: 'network', href: '/network' },
    { key: 'contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GP</span>
            </div>
            <span className="text-2xl font-bold text-navy-900">
              {content?.site?.title || 'Golden Petrol'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 font-medium"
              >
                {navigation[item.key] || item.key}
              </Link>
            ))}
            
            {/* Admin Button */}
            {!isLoggedIn ? (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  {navigation.admin || 'Admin'}
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    {navigation.admin || 'Admin'}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-gray-500" />
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-yellow-600 transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navigation[item.key] || item.key}
                </Link>
              ))}
              
              <div className="flex items-center justify-between pt-4 border-t">
                <Link href="/admin">
                  <Button variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
                    {navigation.admin || 'Admin'}
                  </Button>
                </Link>
                
                <button
                  onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                  className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
                >
                  {language === 'en' ? 'العربية' : 'English'}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}