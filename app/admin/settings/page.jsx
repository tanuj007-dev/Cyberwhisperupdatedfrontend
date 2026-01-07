'use client';

import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Textarea, Toggle, Toast } from '@/components/ui';
import {
    Settings as SettingsIcon, Globe, Image as ImageIcon, Search,
    Bell, Link as LinkIcon, Save, Upload, X, Mail,
    Twitter, Facebook, Linkedin, Youtube, Instagram,
    FileText, Shield, AlertTriangle
} from 'lucide-react';

const Settings = () => {
    const { siteSettings, updateSiteSettings } = useAdmin();

    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({ ...siteSettings });
    const [logoPreview, setLogoPreview] = useState(formData.logo || '');
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [hasChanges, setHasChanges] = useState(false);

    const tabs = [
        { id: 'general', name: 'General', icon: Globe },
        { id: 'seo', name: 'SEO', icon: Search },
        { id: 'social', name: 'Social Links', icon: LinkIcon },
        { id: 'features', name: 'Features', icon: SettingsIcon },
    ];

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        setHasChanges(true);
    };

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [platform]: value
            }
        });
        setHasChanges(true);
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                setFormData({ ...formData, logo: reader.result });
                setHasChanges(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateSiteSettings(formData);
        setHasChanges(false);
        showToast('Settings saved successfully!', 'success');
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
                    <p className="text-gray-600">Manage your site configuration</p>
                </div>
                <Button
                    onClick={handleSave}
                    variant="primary"
                    className="flex items-center gap-2"
                    disabled={!hasChanges}
                >
                    <Save size={18} />
                    Save Changes
                </Button>
            </div>

            {/* Tabs & Content */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Tab Navigation */}
                <div className="lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span className="font-medium">{tab.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="flex-1">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-violet-100 rounded-lg">
                                    <Globe className="text-violet-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                                    <p className="text-sm text-gray-500">Basic site configuration</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <Input
                                    label="Site Name"
                                    name="siteName"
                                    value={formData.siteName || ''}
                                    onChange={handleChange}
                                    placeholder="Your Site Name"
                                />

                                <Textarea
                                    label="Site Description"
                                    name="siteDescription"
                                    value={formData.siteDescription || ''}
                                    onChange={handleChange}
                                    placeholder="A brief description of your site..."
                                    rows={3}
                                />

                                {/* Logo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Site Logo
                                    </label>
                                    <div className="flex items-start gap-4">
                                        {logoPreview ? (
                                            <div className="relative">
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo preview"
                                                    className="w-32 h-20 object-contain border border-gray-200 rounded-xl bg-gray-50"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setLogoPreview('');
                                                        setFormData({ ...formData, logo: '' });
                                                        setHasChanges(true);
                                                    }}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-violet-400 transition-colors">
                                                <Upload className="text-gray-400" size={24} />
                                                <span className="text-xs text-gray-500 mt-1">Upload</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            <p>Recommended: 200x60px</p>
                                            <p>Max size: 1MB</p>
                                        </div>
                                    </div>
                                </div>

                                <Input
                                    label="Contact Email"
                                    name="contactEmail"
                                    type="email"
                                    value={formData.contactEmail || ''}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                />

                                <Textarea
                                    label="Footer Text"
                                    name="footerText"
                                    value={formData.footerText || ''}
                                    onChange={handleChange}
                                    placeholder="© 2026 Your Company. All rights reserved."
                                    rows={2}
                                />
                            </div>
                        </div>
                    )}

                    {/* SEO Settings */}
                    {activeTab === 'seo' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Search className="text-emerald-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Default SEO</h3>
                                    <p className="text-sm text-gray-500">Search engine optimization settings</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <Input
                                    label="Default SEO Title"
                                    name="defaultSeoTitle"
                                    value={formData.defaultSeoTitle || ''}
                                    onChange={handleChange}
                                    placeholder="Default page title for SEO"
                                />

                                <Textarea
                                    label="Default Meta Description"
                                    name="defaultSeoDescription"
                                    value={formData.defaultSeoDescription || ''}
                                    onChange={handleChange}
                                    placeholder="Default meta description for search engines..."
                                    rows={3}
                                />

                                <Input
                                    label="Default Keywords"
                                    name="defaultSeoKeywords"
                                    value={formData.defaultSeoKeywords || ''}
                                    onChange={handleChange}
                                    placeholder="keyword1, keyword2, keyword3"
                                />

                                <Input
                                    label="Google Analytics ID"
                                    name="analyticsId"
                                    value={formData.analyticsId || ''}
                                    onChange={handleChange}
                                    placeholder="UA-XXXXXXXX-X or G-XXXXXXXX"
                                />

                                {/* SEO Preview */}
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-xs text-gray-500 mb-2">Search Preview</p>
                                    <div className="space-y-1">
                                        <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                                            {formData.defaultSeoTitle || 'Your Page Title'}
                                        </p>
                                        <p className="text-green-700 text-sm">https://yoursite.com</p>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {formData.defaultSeoDescription || 'Your meta description will appear here...'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Links */}
                    {activeTab === 'social' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <LinkIcon className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                                    <p className="text-sm text-gray-500">Connect your social media profiles</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { platform: 'twitter', icon: Twitter, color: 'text-sky-500', placeholder: 'https://twitter.com/username' },
                                    { platform: 'facebook', icon: Facebook, color: 'text-blue-600', placeholder: 'https://facebook.com/page' },
                                    { platform: 'linkedin', icon: Linkedin, color: 'text-blue-700', placeholder: 'https://linkedin.com/company/name' },
                                    { platform: 'youtube', icon: Youtube, color: 'text-red-600', placeholder: 'https://youtube.com/channel' },
                                    { platform: 'instagram', icon: Instagram, color: 'text-pink-600', placeholder: 'https://instagram.com/username' },
                                ].map(({ platform, icon: Icon, color, placeholder }) => (
                                    <div key={platform} className="flex items-center gap-3">
                                        <div className={`p-2 bg-gray-100 rounded-lg ${color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <input
                                            type="url"
                                            value={formData.socialLinks?.[platform] || ''}
                                            onChange={(e) => handleSocialChange(platform, e.target.value)}
                                            placeholder={placeholder}
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features Settings */}
                    {activeTab === 'features' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <SettingsIcon className="text-purple-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Feature Settings</h3>
                                    <p className="text-sm text-gray-500">Enable or disable site features</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <FileText className="text-gray-600" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">Enable Comments</p>
                                            <p className="text-sm text-gray-500">Allow comments on blog posts</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        name="enableComments"
                                        checked={formData.enableComments ?? true}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Mail className="text-gray-600" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">Newsletter Signup</p>
                                            <p className="text-sm text-gray-500">Show newsletter subscription form</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        name="enableNewsletter"
                                        checked={formData.enableNewsletter ?? true}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="text-amber-600" size={20} />
                                        <div>
                                            <p className="font-medium text-gray-900">Maintenance Mode</p>
                                            <p className="text-sm text-amber-700">Enable to show maintenance page to visitors</p>
                                        </div>
                                    </div>
                                    <Toggle
                                        name="maintenanceMode"
                                        checked={formData.maintenanceMode ?? false}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Info Note */}
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 flex items-start gap-3">
                <Shield className="text-violet-600 flex-shrink-0 mt-0.5" size={20} />
                <div>
                    <p className="text-sm font-medium text-violet-800">Frontend Demo Mode</p>
                    <p className="text-sm text-violet-600">
                        These settings are stored in local state for demonstration purposes. In a production app, changes would be saved to a database.
                    </p>
                </div>
            </div>

            {/* Toast */}
            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
};

export default Settings;
