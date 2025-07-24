"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const { content } = useLanguage();
  const navigation = content?.navigation || {};
  const contactInfo = content?.contact?.info || {};

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">GP</span>
              </div>
              <span className="text-xl font-bold">
                {content?.site?.title || 'Golden Petrol'}
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              {content?.site?.description || 'Premium petroleum products and services'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                {navigation.about || 'About Us'}
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                {navigation.services || 'Our Services'}
              </Link>
              <Link href="/products" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                {navigation.products || 'Our Products'}
              </Link>
              <Link href="/network" className="block text-gray-300 hover:text-yellow-400 transition-colors duration-200">
                {navigation.network || 'Our Network'}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{contactInfo.phone}</span>
                </div>
              )}
              {contactInfo.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{contactInfo.email}</span>
                </div>
              )}
              {contactInfo.hours && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300 text-sm">{contactInfo.hours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            {contactInfo.address && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1" />
                <span className="text-gray-300 text-sm">{contactInfo.address}</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {content?.site?.title || 'Golden Petrol'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}