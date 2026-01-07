'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Select, Textarea, Toggle, Card, Toast } from '@/components/ui';
import { X } from 'lucide-react';

const AddUser = () => {
    const router = useRouter();
    const { addUser } = useAdmin();

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        skills: [],
        social_links: { twitter: '', linkedin: '', github: '' },
        biography: '',
        role_id: 3,
        status: 'active',
        is_instructor: false,
        image: '',
        title: ''
    });

    const [skillInput, setSkillInput] = useState('');
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSocialLinkChange = (platform, value) => {
        setFormData({
            ...formData,
            social_links: { ...formData.social_links, [platform]: value }
        });
    };

    const addSkill = () => {
        if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skillInput.trim()]
            });
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove)
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.password.trim()) newErrors.password = 'Password is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const userData = {
            ...formData,
            role_id: parseInt(formData.role_id)
        };

        addUser(userData);
        showToast('User created successfully!', 'success');

        setTimeout(() => {
            router.push('/admin/users');
        }, 1500);
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const roleOptions = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Instructor' },
        { value: 3, label: 'Student' },
        { value: 4, label: 'Guest' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New User</h1>
                <p className="text-gray-600">Create a new user account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card title="Basic Information">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="John"
                                required
                                error={errors.first_name}
                            />
                            <Input
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                                error={errors.last_name}
                            />
                        </div>

                        <Input
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Senior Developer"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                error={errors.email}
                            />
                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1234567890"
                                required
                                error={errors.phone}
                            />
                        </div>

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            required
                            error={errors.password}
                        />

                        <Textarea
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Full address"
                            rows={2}
                        />

                        <Input
                            label="Profile Image URL"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                </Card>

                {/* Professional Details */}
                <Card title="Professional Details">
                    <div className="space-y-4">
                        <Textarea
                            label="Biography"
                            name="biography"
                            value={formData.biography}
                            onChange={handleChange}
                            placeholder="Brief bio about the user"
                            rows={4}
                        />

                        {/* Skills */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                    placeholder="Add a skill and press Enter"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <Button type="button" onClick={addSkill} variant="primary" size="md">
                                    Add
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills.map((skill, index) => (
                                    <div key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="hover:text-blue-900"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Social Links */}
                <Card title="Social Links">
                    <div className="space-y-4">
                        <Input
                            label="Twitter URL"
                            name="twitter"
                            value={formData.social_links.twitter}
                            onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                            placeholder="https://twitter.com/username"
                        />
                        <Input
                            label="LinkedIn URL"
                            name="linkedin"
                            value={formData.social_links.linkedin}
                            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                        <Input
                            label="GitHub URL"
                            name="github"
                            value={formData.social_links.github}
                            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                            placeholder="https://github.com/username"
                        />
                    </div>
                </Card>

                {/* Role & Permissions */}
                <Card title="Role & Permissions">
                    <div className="space-y-4">
                        <Select
                            label="Role"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                            options={roleOptions}
                            required
                        />

                        <Toggle
                            label="Is Instructor"
                            name="is_instructor"
                            checked={formData.is_instructor}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        checked={formData.status === 'active'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">Active</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        checked={formData.status === 'inactive'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">Inactive</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push('/admin/users')}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Create User
                    </Button>
                </div>
            </form>

            <Toast
                isVisible={toast.isVisible}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isVisible: false })}
            />
        </div>
    );
};

export default AddUser;
