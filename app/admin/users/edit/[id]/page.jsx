'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Select, Textarea, Toggle, Card, Toast, Skeleton } from '@/components/ui';

const EditUser = () => {
    const router = useRouter();
    const params = useParams();
    const { getUserById, updateUser } = useAdmin();

    const [formData, setFormData] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(parseInt(params.id));
                if (user) {
                    const roleByRoleId = { 1: 'ADMIN', 2: 'STUDENT', 3: 'INSTRUCTOR' };
                    const roleFromApi = user.role === 'USER' ? 'STUDENT' : (user.role || roleByRoleId[user.role_id] || 'STUDENT');
                    setFormData({ ...user, role: roleFromApi });
                } else {
                    showToast('User not found', 'error');
                }
            } catch (error) {
                console.error('Error loading user:', error);
                showToast('Error loading user', 'error');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [params.id, getUserById]);

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
            await updateUser(formData.id, userData);
            showToast('User updated successfully!', 'success');

            setTimeout(() => {
                router.push('/admin/users');
            }, 1500);
        } catch (error) {
            showToast('Error updating user', 'error');
            console.error(error);
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    if (loading || !formData) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Skeleton variant="title" />
                <Skeleton className="h-96" />
            </div>
        );
    }

    const roleOptions = [
        { value: 1, label: 'Admin' },
        { value: 2, label: 'Student' },
        { value: 3, label: 'Instructor' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User</h1>
                <p className="text-gray-600">Update user information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card title="Basic Information">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="User ID (read-only)" name="id" value={formData.id} disabled />
                            <Input
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Senior Developer"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                error={errors.first_name}
                            />
                            <Input
                                label="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                error={errors.last_name}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                error={errors.email}
                                disabled
                            />
                            <Input
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                error={errors.phone}
                            />
                        </div>

                        <Textarea
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows={2}
                        />

                        <Input
                            label="Profile Image URL"
                            name="profile_image_url"
                            value={formData.profile_image_url || ''}
                            onChange={handleChange}
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
                            value={formData.linkedin_url || ''}
                            onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        />
                        <Input
                            label="GitHub URL"
                            name="github_url"
                            value={formData.github_url || ''}
                            onChange={(e) => handleSocialLinkChange('github', e.target.value)}
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

                        

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date Added <span className="text-gray-400 font-normal">(read-only)</span></label>
                                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{formData.date_added ? new Date(formData.date_added).toLocaleString() : '—'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified <span className="text-gray-400 font-normal">(read-only)</span></label>
                                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">{formData.last_modified ? new Date(formData.last_modified).toLocaleString() : '—'}</p>
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
                        Update User
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

export default EditUser;
