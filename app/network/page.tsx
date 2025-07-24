"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Navigation, Users, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Network() {
  const { content, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  const networkContent = content?.network || {};
  const regions = networkContent.regions || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {networkContent.title || 'Our Network'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {networkContent.subtitle || 'Find Golden Petrol stations near you'}
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Nationwide Coverage</h2>
              <p className="text-gray-600 text-lg mb-8">
                With over 150 strategically located service stations across the country, 
                Golden Petrol ensures you're never far from premium fuel and exceptional service.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Building className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">150+</div>
                  <div className="text-gray-600">Stations</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">4</div>
                  <div className="text-gray-600">Regions</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Network Map" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-yellow-600 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Our Regional Network
            </h2>
            <p className="text-xl text-gray-600">
              Serving communities across all major regions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-lg text-navy-900">{region.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-yellow-600">{region.stations}</div>
                    <div className="text-sm text-gray-600">Stations</div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-semibold text-navy-900 text-sm mb-2">Major Cities:</h4>
                    {region.cities?.map((city, cityIndex) => (
                      <div key={cityIndex} className="text-gray-600 text-sm">{city}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Station Locator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
            Find Your Nearest Station
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use our station locator to find the closest Golden Petrol station to your location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Enter your location"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-semibold flex items-center justify-center">
              <Navigation className="w-4 h-4 mr-2" />
              Find Stations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}