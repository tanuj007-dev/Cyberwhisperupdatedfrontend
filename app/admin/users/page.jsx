'use client';

import { useState, useMemo } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Modal, Input, Select, Toast, Skeleton } from '@/components/ui';
import { Edit2, Trash2, Eye, Search, CheckCircle, XCircle, PlusCircle, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserList = () => {
    const router = useRouter();
    const { users, addUser, updateUser, deleteUser, loading } = useAdmin();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterInstructor, setFilterInstructor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewUser, setViewUser] = useState(null);
    const [addEditModalOpen, setAddEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: 'USER',
        status: 'active',
        is_instructor: false,
        title: '',
        address: '',
        biography: '',
        linkedin_url: '',
        github_url: '',
        profile_image_url: '',
        password: '',
        skills: []
    });
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const itemsPerPage = 10;

    // Filtered users
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = !filterRole || user.role_id === parseInt(filterRole);
            const matchesStatus = !filterStatus || user.status === filterStatus;
            const matchesInstructor = !filterInstructor ||
                (filterInstructor === 'yes' ? user.is_instructor : !user.is_instructor);

            return matchesSearch && matchesRole && matchesStatus && matchesInstructor;
        });
    }, [users, searchTerm, filterRole, filterStatus, filterInstructor]);

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => setToast({ isVisible: false, message: '', type: 'success' }), 3000);
    };

    const handleImageUpload = async (file) => {
        if (!file.type.startsWith('image/')) {
            showToast('Please select a valid image file', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            showToast('Image size must be less than 5MB', 'error');
            return;
        }

        setImageUploading(true);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('profile', file);

            console.log('=== Image Upload Started ===');
            console.log('File:', {
                name: file.name,
                size: file.size,
                type: file.type
            });
            console.log('Upload URL:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-profile`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/upload-profile`, {
                method: 'POST',
                body: formDataUpload,
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Response Status:', response.status);
            console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

            const responseText = await response.text();
            console.log('Response Body:', responseText);

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.status} - ${responseText}`);
            }

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse response:', e);
                throw new Error('Invalid response format from server');
            }

            console.log('Parsed Response:', data);

            // Try multiple possible response formats
            const imageUrl = data.data?.profile_image_url ||
                data.profile_image_url ||
                data.url ||
                data.data?.url ||
                data.message ||
                data.file_url ||
                data.data?.file_url;

            if (!imageUrl) {
                console.warn('No image URL found in response. Full response:', data);
                throw new Error('No image URL received from server');
            }

            console.log('Final Image URL:', imageUrl);
            setFormData(prev => {
                const updated = { ...prev, profile_image_url: imageUrl };
                console.log('Updated FormData:', updated);
                return updated;
            });
            setImagePreview(imageUrl);
            showToast('Image uploaded successfully', 'success');
            console.log('=== Image Upload Completed ===');
        } catch (error) {
            console.error('=== Image Upload Error ===');
            console.error('Error:', error.message);
            console.error('Full Error:', error);
            showToast(`Image upload failed: ${error.message}`, 'error');
        } finally {
            setImageUploading(false);
        }
    };

    const handleOpenAdd = () => {
        setEditMode(false);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            role: 'USER',
            status: 'active',
            is_instructor: false,
            title: '',
            address: '',
            biography: '',
            linkedin_url: '',
            github_url: '',
            profile_image_url: '',
            password: '',
            skills: []
        });
        setImagePreview('');
        setErrors({});
        setAddEditModalOpen(true);
    };

    const handleOpenEdit = (user) => {
        setEditMode(true);
        setSelectedUser(user);
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone || '',
            role: user.role || 'USER',
            status: user.status || 'active',
            is_instructor: user.is_instructor || false,
            title: user.title || '',
            address: user.address || '',
            biography: user.biography || '',
            linkedin_url: user.linkedin_url || '',
            github_url: user.github_url || '',
            profile_image_url: user.profile_image_url || '',
            password: '',
            skills: user.skills || []
        });
        setImagePreview(user.profile_image_url || '');
        setErrors({});
        setAddEditModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const userData = {
            ...formData
        };

        try {
            if (editMode) {
                await updateUser(selectedUser.id, userData);
                showToast('User updated successfully', 'success');
            } else {
                await addUser(userData);
                showToast('User created successfully', 'success');
            }
            setAddEditModalOpen(false);
        } catch (error) {
            const errorMessage = error?.message || 'Error saving user';
            showToast(errorMessage, 'error');
            console.error('Submit error:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(selectedUser.id);
            setDeleteModalOpen(false);
            setSelectedUser(null);
            showToast('User deleted successfully', 'success');
        } catch (error) {
            const errorMessage = error?.message || 'Error deleting user';
            showToast(errorMessage, 'error');
            console.error('Delete error:', error);
        }
    };

    const handleView = (user) => {
        setViewUser(user);
        setViewModalOpen(true);
    };

    const getRoleName = (roleId) => {
        const roles = { 1: 'Admin', 2: 'Editor', 3: 'Author', 4: 'Guest' };
        return roles[roleId] || 'Unknown';
    };

    const getRoleColor = (roleId) => {
        const colors = { 1: 'purple', 2: 'info', 3: 'success', 4: 'default' };
        return colors[roleId] || 'default';
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <Skeleton variant="title" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-16" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Users</h1>
                    <p className="text-gray-600">Manage all users and their roles</p>
                </div>
                <button
                    onClick={handleOpenAdd}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                    <UserPlus size={18} />
                    Add New User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                    <p className="text-sm text-gray-500">Total Users</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-emerald-600">{users.filter(u => u.status === 'active').length}</p>
                    <p className="text-sm text-gray-500">Active</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-violet-600">{users.filter(u => u.is_instructor).length}</p>
                    <p className="text-sm text-gray-500">Instructors</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                    <p className="text-3xl font-bold text-blue-600">{users.filter(u => u.role_id === 1).length}</p>
                    <p className="text-sm text-gray-500">Admins</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Role Filter */}
                    <select
                        value={filterRole}
                        onChange={(e) => setFilterRole(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 text-black  rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Roles</option>
                        <option value="1">Admin</option>
                        <option value="2">Editor</option>
                        <option value="3">Author</option>
                        <option value="4">Guest</option>
                    </select>

                    {/* Instructor Filter */}
                    <select
                        value={filterInstructor}
                        onChange={(e) => setFilterInstructor(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 text-black  rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Users</option>
                        <option value="yes">Instructors Only</option>
                        <option value="no">Non-Instructors</option>
                    </select>

                    {/* Status Filter */}
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2.5 border border-gray-300 text-black  rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{paginatedUsers.length}</span> of <span className="font-semibold">{filteredUsers.length}</span> users
            </p>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Role</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Instructor</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.profile_image_url ? (
                                                <img
                                                    src={user.profile_image_url}
                                                    alt={`${user.first_name} ${user.last_name}`}
                                                    className="w-10 h-10 object-cover rounded-xl border border-gray-200"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                                                    {user.first_name[0]}{user.last_name[0]}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {user.first_name} {user.last_name}
                                                </p>
                                                <p className="text-xs text-gray-500">{user.title || 'No title'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant={getRoleColor(user.role_id)}>{getRoleName(user.role_id)}</Badge>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {user.is_instructor ? (
                                            <CheckCircle className="inline text-emerald-500" size={20} />
                                        ) : (
                                            <XCircle className="inline text-gray-300" size={20} />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant={user.status === 'active' ? 'success' : 'danger'}>
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleDateString()
                                            : user.date_added
                                                ? new Date(user.date_added).toLocaleDateString()
                                                : 'N/A'
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => handleView(user)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleOpenEdit(user)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {paginatedUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No users found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>

                    <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${currentPage === i + 1
                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            {/* Add/Edit User Modal */}
            <Modal
                isOpen={addEditModalOpen}
                onClose={() => setAddEditModalOpen(false)}
                title={editMode ? 'Edit User' : 'Add New User'}
                size="lg"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setAddEditModalOpen(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleSubmit}>{editMode ? 'Update' : 'Create'}</Button>
                    </>
                }
            >
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            value={formData.first_name}
                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            placeholder="Enter first name"
                            required
                            error={errors.first_name}
                        />
                        <Input
                            label="Last Name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            placeholder="Enter last name"
                            required
                            error={errors.last_name}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter email address"
                            required
                            error={errors.email}
                        />
                        <Input
                            label="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Title / Position"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Senior Developer, Content Writer, etc."
                        />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <Input
                        label="Address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="City, Country"
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.add('bg-violet-50', 'border-violet-500');
                            }}
                            onDragLeave={(e) => {
                                e.currentTarget.classList.remove('bg-violet-50', 'border-violet-500');
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.remove('bg-violet-50', 'border-violet-500');
                                const files = e.dataTransfer.files;
                                if (files.length > 0) {
                                    handleImageUpload(files[0]);
                                }
                            }}
                            className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-violet-500 hover:bg-violet-50"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        handleImageUpload(e.target.files[0]);
                                    }
                                }}
                                className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                            />

                            {imagePreview ? (
                                <div className="space-y-3">
                                    <div className="flex justify-center">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                                        />
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium">Image uploaded successfully</p>
                                        <p className="text-xs text-gray-500 mt-1">Drag to replace or click to choose</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                        <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-14-8l6 6m-6-6v12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="20" cy="24" r="3" strokeWidth="2" />
                                    </svg>
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium">Drag and drop your image here</p>
                                        <p className="text-xs text-gray-500">or click to select (max 5MB)</p>
                                    </div>
                                </div>
                            )}

                            {imageUploading && (
                                <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="animate-spin inline-block w-8 h-8 border-4 border-violet-200 border-t-violet-600 rounded-full"></div>
                                        <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biography</label>
                        <textarea
                            value={formData.biography}
                            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                            placeholder="Enter user biography or professional background"
                            rows="4"
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
                        />
                    </div>

                    <Input
                        label="LinkedIn URL"
                        value={formData.linkedin_url}
                        onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                    />

                    <Input
                        label="GitHub URL"
                        value={formData.github_url}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        placeholder="https://github.com/username"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder={editMode ? "Leave blank to keep current password" : "Enter password"}
                    />

                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <input
                            type="checkbox"
                            id="is_instructor"
                            checked={formData.is_instructor}
                            onChange={(e) => setFormData({ ...formData, is_instructor: e.target.checked })}
                            className="w-4 h-4 text-violet-600 focus:ring-violet-500 rounded"
                        />
                        <label htmlFor="is_instructor" className="text-sm text-gray-700">
                            <span className="font-medium">Mark as Instructor</span>
                            <span className="block text-gray-500">Enable if this user can create and manage courses</span>
                        </label>
                    </div>
                </div>
            </Modal>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete User"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </>
                }
            >
                <p className="text-gray-700">
                    Are you sure you want to delete <span className="font-semibold">{selectedUser?.first_name} {selectedUser?.last_name}</span>?
                    This action cannot be undone.
                </p>
            </Modal>

            {/* View User Modal */}
            <Modal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title="User Details"
                size="lg"
            >
                {viewUser && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 pb-4 border-b">
                            {viewUser.profile_image_url ? (
                                <img
                                    src={viewUser.profile_image_url}
                                    alt={`${viewUser.first_name} ${viewUser.last_name}`}
                                    className="w-20 h-20 object-cover rounded-2xl border-2 border-gray-200"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                                    {viewUser.first_name[0]}{viewUser.last_name[0]}
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{viewUser.first_name} {viewUser.last_name}</h3>
                                <p className="text-gray-600">{viewUser.title || 'No title'}</p>
                                <div className="flex gap-2 mt-2">
                                    <Badge variant={getRoleColor(viewUser.role_id)}>{getRoleName(viewUser.role_id)}</Badge>
                                    <Badge variant={viewUser.status === 'active' ? 'success' : 'danger'}>{viewUser.status}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <p className="text-gray-900">{viewUser.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                <p className="text-gray-900">{viewUser.phone || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Instructor</label>
                                <p className="text-gray-900">{viewUser.is_instructor ? 'Yes' : 'No'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <p className="text-gray-900">{viewUser.address || 'N/A'}</p>
                            </div>
                        </div>

                        {viewUser.biography && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Biography</label>
                                <p className="text-gray-900">{viewUser.biography}</p>
                            </div>
                        )}

                        {viewUser.skills && viewUser.skills.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {viewUser.skills.map((skill, i) => (
                                        <Badge key={i} variant="info">{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* {viewUser.profile_image_url && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image</label>
                                <img
                                    src={viewUser.profile_image_url}
                                    alt={`${viewUser.first_name} ${viewUser.last_name}`}
                                    className="w-full max-w-sm h-auto rounded-lg border border-gray-200 object-cover"
                                />
                            </div>
                        )} */}

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Date Added</label>
                                <p className="text-sm text-gray-600">
                                    {viewUser.created_at
                                        ? new Date(viewUser.created_at).toLocaleString()
                                        : viewUser.date_added
                                            ? new Date(viewUser.date_added).toLocaleString()
                                            : 'N/A'
                                    }
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Modified</label>
                                <p className="text-sm text-gray-600">
                                    {viewUser.updated_at
                                        ? new Date(viewUser.updated_at).toLocaleString()
                                        : viewUser.last_modified
                                            ? new Date(viewUser.last_modified).toLocaleString()
                                            : 'N/A'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

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

export default UserList;
