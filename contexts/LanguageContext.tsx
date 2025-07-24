"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import enContent from '../content/en.json';
import arContent from '../content/ar.json';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  content: any;
  isLoading: boolean;
  refreshContent: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const contentMap = {
  en: enContent,
  ar: arContent
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [content, setContent] = useState(contentMap.en);
  const [isLoading, setIsLoading] = useState(false);

  const refreshContent = async () => {
    try {
      setIsLoading(true);
      
      // Check for updated content in localStorage (for WebContainer demo)
      const contentKey = `content_${language}`;
      const updatedContent = localStorage.getItem(contentKey);
      
      if (updatedContent) {
        try {
          const parsedContent = JSON.parse(updatedContent);
          // Merge with static content to ensure all fields exist
          const mergedContent = { ...contentMap[language], ...parsedContent };
          setContent(mergedContent);
          console.log('Content refreshed from localStorage');
        } catch (parseError) {
          console.error('Failed to parse updated content, using static content');
          setContent(contentMap[language]);
        }
      } else {
        setContent(contentMap[language]);
      }
    } catch (error) {
      console.error('Failed to refresh content:', error);
      setContent(contentMap[language]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setContent(contentMap[language]);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Listen for content updates
    const handleContentUpdate = () => {
      refreshContent();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('contentUpdated', handleContentUpdate);
      return () => {
        window.removeEventListener('contentUpdated', handleContentUpdate);
      };
    }
  }, [language]);

  const changeLanguage = (lang: 'en' | 'ar') => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: changeLanguage, 
      content, 
      isLoading,
      refreshContent
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}