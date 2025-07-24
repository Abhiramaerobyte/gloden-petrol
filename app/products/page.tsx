"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Fuel, Check, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Products() {
  const { content, isLoading } = useLanguage();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  const productsContent = content?.products || {};
  const categories = productsContent.categories || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {productsContent.title || 'Our Products'}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {productsContent.subtitle || 'Premium petroleum products for every vehicle'}
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-navy-900 mb-4">{category.name}</h2>
                <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products?.map((product, productIndex) => (
                  <Card key={productIndex} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-600 transition-colors duration-300">
                        <Fuel className="w-8 h-8 text-yellow-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <CardTitle className="text-xl text-navy-900">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center mb-6">{product.description}</p>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-navy-900 mb-3 flex items-center">
                          <Star className="w-4 h-4 text-yellow-600 mr-2" />
                          Key Features:
                        </h4>
                        {product.features?.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-yellow-600" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Assurance Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Quality Assurance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Every drop of fuel meets international quality standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Laboratory Tested',
                description: 'Every batch is tested in our certified laboratories',
                icon: '🔬'
              },
              {
                title: 'International Standards',
                description: 'Complies with ASTM and ISO fuel quality standards',
                icon: '🏆'
              },
              {
                title: 'Regular Monitoring',
                description: 'Continuous quality monitoring at all locations',
                icon: '📊'
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}