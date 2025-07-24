"use client";

import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogIn, Settings, FileText, Globe, Upload, Webhook } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Admin() {
  const { isLoggedIn, login } = useAdmin();
  const { language } = useLanguage();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(credentials.username, credentials.password);
    if (!success) {
      setLoginError('Invalid credentials');
    } else {
      setLoginError('');
      setCredentials({ username: '', password: '' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl text-navy-900">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  required
                />
              </div>
              {loginError && (
                <p className="text-red-600 text-sm">{loginError}</p>
              )}
              <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage your website content and settings</p>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Media</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="flex items-center space-x-2">
              <Webhook className="w-4 h-4" />
              <span>Webhooks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <ContentEditor />
          </TabsContent>

          <TabsContent value="media">
            <MediaManager />
          </TabsContent>

          <TabsContent value="settings">
            <Settings />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhookManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ContentEditor() {
  const { language, content } = useLanguage();
  const { updateContent } = useAdmin();
  const [editingPath, setEditingPath] = useState('');
  const [editingValue, setEditingValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (path: string, value: any) => {
    setEditingPath(path);
    setEditingValue(typeof value === 'string' ? value : JSON.stringify(value, null, 2));
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let valueToSave;
      try {
        valueToSave = JSON.parse(editingValue);
      } catch {
        valueToSave = editingValue;
      }
      
      console.log('Saving content:', { language, editingPath, valueToSave });
      const success = await updateContent(language, editingPath, valueToSave);
      
      if (success) {
        console.log('Content saved successfully');
        setIsEditing(false);
        // Refresh content to show changes immediately
        if (typeof window !== 'undefined') {
          // Trigger a custom event to refresh content
          window.dispatchEvent(new CustomEvent('contentUpdated'));
        }
      } else {
        console.error('Failed to save content');
        alert('Failed to save content. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('An error occurred while saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderContentSection = (obj: any, parentPath = '') => {
    if (!obj) return null;
    
    return Object.entries(obj || {}).map(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={currentPath} className="mb-6">
            <h3 className="text-lg font-semibold text-navy-900 mb-3 capitalize">{key}</h3>
            <div className="ml-4 space-y-4">
              {renderContentSection(value, currentPath)}
            </div>
          </div>
        );
      }

      return (
        <div key={currentPath} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 p-3 bg-gray-100 rounded-lg text-sm">
              {Array.isArray(value) ? JSON.stringify(value, null, 2) : String(value)}
            </div>
            <Button
              onClick={() => handleEdit(currentPath, value)}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy-900">Content Management</h2>
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium">Language: {language.toUpperCase()}</span>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {renderContentSection(content)}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
            <p className="text-sm text-gray-600 mb-2">Path: {editingPath}</p>
            <textarea
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MediaManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setSelectedFile(null);
        // Refresh media list
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy-900">Media Management</h2>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Media</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
            <Button
              type="submit"
              disabled={!selectedFile || uploading}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Media files will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy-900">System Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Language
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600">
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Maintenance Mode
            </label>
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Enable maintenance mode</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WebhookManager() {
  const [webhookUrl, setWebhookUrl] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-navy-900">Webhook Management</h2>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-webhook-endpoint.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
          </div>
          
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            Save Webhook URL
          </Button>
          
          <div className="mt-6">
            <h4 className="font-semibold text-navy-900 mb-2">Test Webhook</h4>
            <Button variant="outline">
              Send Test Payload
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}