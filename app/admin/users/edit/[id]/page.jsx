'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Input, Textarea, Card, Toast, Skeleton } from '@/components/ui';
import { getUserIdFromToken, getRoleFromToken } from '@/lib/jwt';
import { API_BASE_URL } from '@/lib/apiConfig';

const EditUser = () => {
    const router = useRouter();
    const params = useParams();
    const { getUserById, updateUser } = useAdmin();
    const profileFileInputRef = useRef(null);

    const [formData, setFormData] = useState(null);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [profileUploading, setProfileUploading] = useState(false);
    const [profileDragActive, setProfileDragActive] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const role = getRoleFromToken(localStorage.getItem('adminToken'));
        const currentUserId = getUserIdFromToken(localStorage.getItem('adminToken'));
        const editingId = params.id != null ? parseInt(params.id, 10) : null;
        setCurrentUserRole(role || localStorage.getItem('adminRole'));
        if (role === 'STUDENT' || role === 'INSTRUCTOR') {
            if (currentUserId != null && String(editingId) !== String(currentUserId)) {
                router.replace('/admin/profile');
                return;
            }
            setIsOwnProfile(true);
        }
    }, [params.id, router]);

    useEffect(() => {
        const loadUser = async () => {
            if (typeof window !== 'undefined') {
                const role = getRoleFromToken(localStorage.getItem('adminToken'));
                const currentUserId = getUserIdFromToken(localStorage.getItem('adminToken'));
                const editingId = params.id != null ? parseInt(params.id, 10) : null;
                if ((role === 'STUDENT' || role === 'INSTRUCTOR') && currentUserId != null && String(editingId) !== String(currentUserId)) {
                    return;
                }
            }
            setLoading(true);
            try {
                const user = await getUserById(parseInt(params.id));
                if (user) {
                    const roleByRoleId = { 1: 'ADMIN', 2: 'STUDENT', 3: 'INSTRUCTOR' };
                    const r = (user.role || '').toUpperCase().replace(/\s/g, '');
                    const roleFromApi = user.role === 'USER' ? 'STUDENT' : (r === 'SUPERADMIN' ? 'SUPERADMIN' : (user.role || roleByRoleId[user.role_id] || 'STUDENT'));
                    const statusNorm = (user.status || 'active').toLowerCase();
                    const editId = params.id != null ? parseInt(params.id, 10) : null;
                    setFormData({
                        ...user,
                        id: user.id ?? user.user_id ?? editId ?? params.id,
                        user_id: user.user_id ?? user.id ?? editId ?? params.id,
                        role: roleFromApi,
                        status: statusNorm,
                        title: user.title ?? '',
                        first_name: user.first_name ?? '',
                        last_name: user.last_name ?? '',
                        email: user.email ?? '',
                        phone: user.phone ?? '',
                        address: user.address ?? '',
                        biography: user.biography ?? '',
                        linkedin_url: user.linkedin_url ?? '',
                        github_url: user.github_url ?? '',
                        profile_image_url: user.profile_image_url ?? '',
                    });
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

    const handleProfileUpload = async (file) => {
        if (!file?.type?.startsWith('image/')) {
            showToast('Please select a valid image file (JPEG, PNG, etc.)', 'error');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be less than 5MB', 'error');
            return;
        }
        setProfileUploading(true);
        try {
            const formDataUpload = new FormData();
            formDataUpload.append('profile', file);
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const uploadUrl = base ? `${base}/api/users/upload-profile` : '/api/users/upload-profile';
            const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formDataUpload,
                headers: {
                    Accept: 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            const imageUrl = data.profile_image_url || data.url || data.data?.profile_image_url;
            if (!imageUrl) throw new Error('No image URL received');
            setFormData((prev) => ({ ...prev, profile_image_url: imageUrl }));
            showToast('Profile image uploaded', 'success');
        } catch (err) {
            showToast(err.message || 'Image upload failed', 'error');
        } finally {
            setProfileUploading(false);
        }
    };

    const onProfileDrop = (e) => {
        e.preventDefault();
        setProfileDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) handleProfileUpload(file);
    };

    const onProfileDragOver = (e) => {
        e.preventDefault();
        setProfileDragActive(true);
    };

    const onProfileDragLeave = () => setProfileDragActive(false);

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

        const userId = formData.id ?? formData.user_id ?? params.id;
        if (userId == null || userId === '') {
            showToast('Invalid user data: missing user ID', 'error');
            return;
        }

        const userData = { ...formData };

        setSubmitting(true);
        try {
            await updateUser(userId, userData);
            showToast('User updated successfully!', 'success');

            const role = typeof window !== 'undefined' ? getRoleFromToken(localStorage.getItem('adminToken')) : null;
            const redirectTo = (role === 'STUDENT' || role === 'INSTRUCTOR') ? '/admin/profile' : '/admin/users';
            setTimeout(() => {
                router.push(redirectTo);
            }, 1500);
        } catch (error) {
            showToast(error?.message || 'Error updating user', 'error');
            console.error(error);
        } finally {
            setSubmitting(false);
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

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit User</h1>
                <p className="text-gray-600 dark:text-gray-400">Update user information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Basic Information */}
                <Card title="Basic Information">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="User ID (read-only)"
                                name="id"
                                value={formData.id ?? formData.user_id ?? params.id ?? ''}
                                disabled
                            />
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

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                            <div
                                onDrop={onProfileDrop}
                                onDragOver={onProfileDragOver}
                                onDragLeave={onProfileDragLeave}
                                onClick={() => profileFileInputRef.current?.click()}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                                    profileDragActive
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                } ${profileUploading ? 'pointer-events-none opacity-70' : ''}`}
                            >
                                <input
                                    ref={profileFileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleProfileUpload(file);
                                        e.target.value = '';
                                    }}
                                />
                                {formData.profile_image_url ? (
                                    <div className="space-y-2">
                                        <img
                                            src={formData.profile_image_url}
                                            alt="Profile"
                                            className="mx-auto h-24 w-24 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                                        />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {profileUploading ? 'Uploading…' : 'Drop a new image or click to change'}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {profileUploading ? 'Uploading…' : 'Drop an image here or click to upload'}
                                    </p>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Or paste URL below</p>
                            <Input
                                className="mt-1"
                                name="profile_image_url"
                                value={formData.profile_image_url || ''}
                                onChange={handleChange}
                                placeholder="https://…"
                            />
                        </div>
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

                {/* Status – hidden for own profile and when logged in as Superadmin (superadmin is always active) */}
                {!isOwnProfile && currentUserRole !== 'SUPERADMIN' && (
                <Card title="Status">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account status</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={(formData.status || 'active').toLowerCase() === 'active'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-green-600"
                                />
                                <span className="text-sm">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={(formData.status || 'active').toLowerCase() === 'inactive'}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-gray-600"
                                />
                                <span className="text-sm">Inactive</span>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">Inactive users cannot log in.</p>
                    </div>
                </Card>
                )}

                {/* Role & Permissions – hidden when editing own profile or when logged in as Superadmin */}
                {!isOwnProfile && currentUserRole !== 'SUPERADMIN' && (
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
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.push(isOwnProfile ? '/admin/profile' : '/admin/users')} disabled={submitting}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting}>
                        {submitting ? 'Updating…' : 'Update User'}
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
