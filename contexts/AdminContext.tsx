"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updateContent: (language: 'en' | 'ar', path: string, value: any) => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminStatus = localStorage.getItem('adminLoggedIn');
      if (adminStatus === 'true') {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminLoggedIn', 'true');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminLoggedIn');
    }
  };

  const updateContent = async (language: 'en' | 'ar', path: string, value: any): Promise<boolean> => {
    try {
      console.log('Updating content:', { language, path, value });
      
      // For WebContainer environment, we'll simulate the update
      // In a real deployment, this would use the API route
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the content in memory (for demo purposes)
      const contentKey = `content_${language}`;
      const currentContent = JSON.parse(localStorage.getItem(contentKey) || '{}');
      
      // Update the content at the specified path
      const pathParts = path.split('.');
      let current = currentContent;
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = value;
      
      // Save to localStorage
      localStorage.setItem(contentKey, JSON.stringify(currentContent));
      
      // Trigger webhook simulation
      try {
        console.log('Webhook triggered:', {
          action: 'content_updated',
          language,
          path,
          timestamp: new Date().toISOString()
        });
      } catch (webhookError) {
        console.warn('Webhook simulation failed:', webhookError);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update content:', error);
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, login, logout, updateContent }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}