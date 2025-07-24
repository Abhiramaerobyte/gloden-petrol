"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Target, Heart, Lightbulb, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const { content, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  const aboutContent = content?.about || {};
  const values = aboutContent.values || [];

  const valueIcons = [Award, Target, Heart, Lightbulb, Shield];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {aboutContent.title || 'About Golden Petrol'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {aboutContent.subtitle || 'Excellence in Petroleum Services'}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {aboutContent.content || 'Golden Petrol has been at the forefront of the petroleum industry...'}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">Mission</h3>
                  <p className="text-gray-600">
                    {aboutContent.mission || 'To provide premium petroleum products and services...'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-2">Vision</h3>
                  <p className="text-gray-600">
                    {aboutContent.vision || 'To be the leading petroleum company in the region...'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpg?auto=compress&cs=tinysrgb&w=800" 
                alt="About Us" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-yellow-600 opacity-20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {values.map((value, index) => {
              const IconComponent = valueIcons[index] || Award;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900">{value}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones in our growth</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { year: '1998', event: 'Company Founded' },
              { year: '2005', event: '50 Stations Milestone' },
              { year: '2015', event: '100 Stations Network' },
              { year: '2024', event: '150+ Stations Nationwide' }
            ].map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{milestone.year}</span>
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{milestone.event}</h3>
                <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}