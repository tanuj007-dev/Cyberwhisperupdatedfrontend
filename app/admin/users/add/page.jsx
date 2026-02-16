'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Select, Textarea, Toggle, Card, Toast } from '@/components/ui';

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
        biography: '',
        linkedin_url: '',
        github_url: '',
        profile_image_url: '',
        role: 'STUDENT',
        is_instructor: false,
        title: ''
    });

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
        if (platform === 'linkedin') {
            setFormData({ ...formData, linkedin_url: value });
        } else if (platform === 'github') {
            setFormData({ ...formData, github_url: value });
        }
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        const userData = {
            ...formData
        };

        try {
            await addUser(userData);
            showToast('User created successfully!', 'success');

            setTimeout(() => {
                router.push('/admin/users');
            }, 1500);
        } catch (error) {
            showToast('Error creating user', 'error');
            console.error(error);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const roleOptions = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Student' },
        { value: 3, label: 'Instructor' }
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
                            name="profile_image_url"
                            value={formData.profile_image_url}
                            onChange={handleChange}
                            placeholder="https://example.com/image.webp"
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
                    </div>
                </Card>

                {/* Social Links */}
                <Card title="Social Links">
                    <div className="space-y-4">
                        <Input
                            label="LinkedIn URL"
                            name="linkedin_url"
                            value={formData.linkedin_url}
                            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                        <Input
                            label="GitHub URL"
                            name="github_url"
                            value={formData.github_url}
                            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                            placeholder="https://github.com/username"
                        />
                    </div>
                </Card>

                {/* Role & Permissions */}
                <Card title="Role & Permissions">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="ADMIN"
                                        checked={formData.role === 'ADMIN'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">Admin</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="STUDENT"
                                        checked={formData.role === 'STUDENT'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">Student</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="INSTRUCTOR"
                                        checked={formData.role === 'INSTRUCTOR'}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600"
                                    />
                                    <span className="text-sm">Instructor</span>
                                </label>
                            </div>
                        </div>

                        <Toggle
                            label="Is Instructor"
                            name="is_instructor"
                            checked={formData.is_instructor}
                            onChange={handleChange}
                        />
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
