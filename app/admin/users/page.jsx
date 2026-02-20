'use client';

import { useState, useMemo, useEffect } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Modal, Input, Toast, Skeleton } from '@/components/ui';
import { Edit2, Trash2, Eye, Search, PlusCircle, UserPlus, UserX, UserCheck, UserCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/lib/apiConfig';
import { getUserIdFromToken } from '@/lib/jwt';

const UserList = () => {
    const router = useRouter();
    const { users, addUser, updateUser, deleteUser, loading } = useAdmin();
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        setCurrentUserRole(localStorage.getItem('adminRole'));
        const token = localStorage.getItem('adminToken');
        const id = token ? getUserIdFromToken(token) : null;
        setCurrentUserId(id != null ? String(id) : null);
    }, []);

    const isSuperAdmin = currentUserRole === 'SUPERADMIN';
    const canManageStatus = currentUserRole === 'ADMIN' || currentUserRole === 'SUPERADMIN';
    const isTargetAdminOrSuperadmin = (user) => {
        const r = String(user.role || '').toUpperCase().replace(/\s/g, '');
        return r === 'SUPERADMIN' || r === 'ADMIN' || user.role_id === 1;
    };
    // Superadmin: full access. Admin: can only activate/deactivate students and instructors (not other admins)
    const canToggleStatusForUser = (user) => {
        if (!canManageStatus) return false;
        if (isSuperAdmin) return true;
        return !isTargetAdminOrSuperadmin(user);
    };
    // Only superadmin can delete; admin cannot delete anyone
    const canDeleteUser = (user) => {
        if (!isSuperAdmin) return false;
        if (isTargetAdminOrSuperadmin(user)) return false;
        const id = user?.id ?? user?.user_id;
        if (id == null || currentUserId == null) return true;
        return String(id) !== String(currentUserId);
    };
    // Superadmin can edit any user; admin can only edit their own profile
    const canEditUser = (user) => {
        if (isSuperAdmin) return true;
        if (currentUserRole === 'ADMIN') return String(user?.id ?? user?.user_id) === String(currentUserId);
        return true;
    };

    const [togglingStatusId, setTogglingStatusId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterInstructor, setFilterInstructor] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);
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
        role: 'STUDENT',
        status: 'active',
        is_instructor: false,
        title: '',
        address: '',
        biography: '',
        linkedin_url: '',
        github_url: '',
        profile_image_url: '',
        password: '',
        
    });
    const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
    const [errors, setErrors] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const itemsPerPage = 10;

    const isSuperAdminUser = (user) => user.id === 1 || user.user_id === 1 || String(user.role || '').toUpperCase().replace(/\s/g, '') === 'SUPERADMIN';
    const visibleUsers = useMemo(() => {
        if (currentUserRole === 'SUPERADMIN') return users;
        return users.filter((u) => !isSuperAdminUser(u));
    }, [users, currentUserRole]);

    const filteredUsers = useMemo(() => {
        return visibleUsers.filter((user) => {
            const matchesSearch =
                (user.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.last_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
            const roleId = user.role_id != null ? user.role_id : (user.role === 'ADMIN' ? 1 : user.role === 'INSTRUCTOR' ? 3 : 2);
            const matchesRole = !filterRole || roleId === parseInt(filterRole);
            const matchesStatus = !filterStatus || (user.status || 'active') === filterStatus;
            const matchesInstructor = !filterInstructor ||
                (filterInstructor === 'yes' ? user.is_instructor : !user.is_instructor);

            return matchesSearch && matchesRole && matchesStatus && matchesInstructor;
        });
    }, [visibleUsers, searchTerm, filterRole, filterStatus, filterInstructor]);

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
            const base = (API_BASE_URL || '').replace(/\/$/, '');
            const uploadUrl = base ? `${base}/api/users/upload-profile` : '/api/users/upload-profile';
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formDataUpload,
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error('Upload failed');
            const data = await response.json();
            const imageUrl = data.profile_image_url || data.url || data.data?.profile_image_url;
            if (!imageUrl) throw new Error('No image URL received');
            setFormData((prev) => ({ ...prev, profile_image_url: imageUrl }));
            setImagePreview(imageUrl);
            showToast('Image uploaded successfully', 'success');
        } catch (error) {
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
            role: 'STUDENT',
            status: 'active',
            is_instructor: false,
            title: '',
            address: '',
            biography: '',
            linkedin_url: '',
            github_url: '',
            profile_image_url: '',
            password: ''
        });
        setImagePreview('');
        setErrors({});
        setAddEditModalOpen(true);
    };

    const handleOpenEdit = (user) => {
        setEditMode(true);
        setSelectedUser(user);
        setFormData({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || '',
            phone: user.phone || '',
            role: user.role === 'USER' ? 'STUDENT' : (user.role || 'STUDENT'),
            status: user.status || 'active',
            is_instructor: user.is_instructor || false,
            title: user.title || '',
            address: user.address || '',
            biography: user.biography || '',
            linkedin_url: user.linkedin_url || '',
            github_url: user.github_url || '',
            profile_image_url: user.profile_image_url || '',
            password: ''
        });
        setImagePreview(user.profile_image_url || '');
        setErrors({});
        setAddEditModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name?.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name?.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email?.trim()) newErrors.email = 'Email is required';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        try {
            if (editMode) {
                await updateUser(selectedUser.id, formData);
                showToast('User updated successfully', 'success');
            } else {
                await addUser(formData);
                showToast('User created successfully', 'success');
            }
            setAddEditModalOpen(false);
        } catch (error) {
            showToast(error?.message || 'Error saving user', 'error');
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        if (!canDeleteUser(selectedUser)) {
            showToast('You cannot delete your own account.', 'error');
            return;
        }
        try {
            setDeleting(true);
            await deleteUser(selectedUser.id ?? selectedUser.user_id);
            setDeleteModalOpen(false);
            setSelectedUser(null);
            showToast('User deleted successfully', 'success');
        } catch (error) {
            showToast(error?.message || 'Error deleting user', 'error');
        } finally {
            setDeleting(false);
        }
    };

    const handleToggleStatus = async (user) => {
        if (!canToggleStatusForUser(user)) {
            showToast('You cannot change status for another admin. Only Superadmin can.', 'error');
            return;
        }
        const currentStatus = (user.status || 'active').toLowerCase();
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        if (newStatus === 'inactive' && !window.confirm('Are you sure you want to deactivate this user? They will not be able to log in.')) {
            return;
        }
        setTogglingStatusId(user.id);
        try {
            await updateUser(user.id, { ...user, status: newStatus });
            showToast(newStatus === 'active' ? 'User activated successfully.' : 'User deactivated successfully. They can no longer log in.', 'success');
        } catch (error) {
            showToast(error?.message || 'Failed to update status', 'error');
        } finally {
            setTogglingStatusId(null);
        }
    };

    const handleViewUser = (user) => {
        setViewUser(user);
        setViewModalOpen(true);
    };

    const getRoleName = (user) => {
        const r = String(user.role || '').toUpperCase().replace(/\s/g, '');
        if (r === 'SUPERADMIN') return 'Superadmin';
        const roleId = user.role_id != null ? user.role_id : (user.role === 'ADMIN' ? 1 : user.role === 'INSTRUCTOR' ? 3 : 2);
        const roles = { 1: 'Admin', 2: 'Student', 3: 'Instructor' };
        return roles[roleId] || user.role || 'Unknown';
    };

    const getRoleColor = (user) => {
        const r = String(user.role || '').toUpperCase().replace(/\s/g, '');
        if (r === 'SUPERADMIN') return 'purple';
        const roleId = user.role_id != null ? user.role_id : (user.role === 'ADMIN' ? 1 : user.role === 'INSTRUCTOR' ? 3 : 2);
        const colors = { 1: 'purple', 2: 'info', 3: 'success' };
        return colors[roleId] || 'default';
    };

    if (loading && users.length === 0) {
        return (
            <div className="p-8">
                <div className="flex flex-col gap-6">
                    <Skeleton className="h-10 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900">Users</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all users and their roles</p>
                </div>
                <Button onClick={handleOpenAdd} variant="primary" className="inline-flex items-center gap-2">
                    <UserPlus size={20} />
                    Add New User
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
                    <p className="text-3xl font-bold text-blue-600">{visibleUsers.filter((u) => (u.role_id === 1) || (u.role === 'ADMIN') || (String(u.role || '').toUpperCase().replace(/\s/g, '') === 'SUPERADMIN')).length}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
                    <p className="text-3xl font-bold text-sky-600">{visibleUsers.filter((u) => (u.role_id === 2) || (u.role === 'STUDENT') || (u.role === 'USER')).length}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Instructors</p>
                    <p className="text-3xl font-bold text-violet-600">{visibleUsers.filter((u) => (u.role_id === 3) || u.is_instructor || (u.role === 'INSTRUCTOR')).length}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                </div>
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                    <option value="">All Roles</option>
                    <option value="1">Admin</option>
                    <option value="2">Student</option>
                    <option value="3">Instructor</option>
                </select>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <select
                    value={filterInstructor}
                    onChange={(e) => setFilterInstructor(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                >
                    <option value="">All</option>
                    <option value="yes">Instructor</option>
                    <option value="no">Not Instructor</option>
                </select>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">User</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedUsers.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {user.profile_image_url ? (
                                                <img src={user.profile_image_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                    <UserCircle className="w-10 h-10" strokeWidth={1.25} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{user.first_name} {user.last_name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.title || '—'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-gray-900 dark:text-white">{user.email}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone || '—'}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={getRoleColor(user)}>{getRoleName(user)}</Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-sm font-medium ${(user.status || 'active') === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {(user.status || 'active') === 'active' ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 flex-wrap">
                                            <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)} title="View">
                                                <Eye size={18} />
                                            </Button>
                                            {canEditUser(user) && (
                                                <Button variant="ghost" size="sm" onClick={() => router.push('/admin/users/edit/' + (user.id ?? user.user_id))} title="Edit">
                                                    <Edit2 size={18} />
                                                </Button>
                                            )}
                                            {canManageStatus && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleToggleStatus(user)}
                                                    disabled={togglingStatusId === user.id || !canToggleStatusForUser(user)}
                                                    title={!canToggleStatusForUser(user) ? 'Cannot change status for another admin' : (user.status || 'active').toLowerCase() === 'active' ? 'Deactivate user' : 'Activate user'}
                                                    className={(user.status || 'active').toLowerCase() === 'active'
                                                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20'
                                                        : 'text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'}
                                                >
                                                    {togglingStatusId === user.id ? (
                                                        <span className="inline-block w-[18px] h-[18px] border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    ) : (user.status || 'active').toLowerCase() === 'active' ? (
                                                        <UserCheck size={18} aria-hidden />
                                                    ) : (
                                                        <UserX size={18} aria-hidden />
                                                    )}
                                                </Button>
                                            )}
                                            {isSuperAdmin && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => { setSelectedUser(user); setDeleteModalOpen(true); }}
                                                    disabled={!canDeleteUser(user)}
                                                    title={canDeleteUser(user) ? 'Delete user' : 'You cannot delete your own account or another admin'}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 disabled:pointer-events-none"
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">No users found.</div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                    <Button variant="outline" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}>Previous</Button>
                    <span className="px-4 py-2 text-gray-600 dark:text-gray-400">Page {currentPage} of {totalPages}</span>
                    <Button variant="outline" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}>Next</Button>
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
                        <Input label="First Name" value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} placeholder="Enter first name" required error={errors.first_name} />
                        <Input label="Last Name" value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} placeholder="Enter last name" required error={errors.last_name} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email" required error={errors.email} />
                        <Input label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Senior Developer" />
                        
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                        <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-800">
                            <option value="STUDENT">Student</option>
                            <option value="ADMIN">Admin</option>
                            <option value="INSTRUCTOR">Instructor</option>
                        </select>
                    </div>
                    <Input label="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="City, Country" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-violet-500', 'bg-violet-50'); }}
                            onDragLeave={(e) => { e.currentTarget.classList.remove('border-violet-500', 'bg-violet-50'); }}
                            onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-violet-500', 'bg-violet-50'); if (e.dataTransfer.files?.[0]) handleImageUpload(e.dataTransfer.files[0]); }}
                            className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-violet-500"
                        >
                            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full cursor-pointer opacity-0" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} />
                            {imagePreview ? (
                                <div><img src={imagePreview} alt="Preview" className="h-24 w-24 object-cover rounded-lg mx-auto" /><p className="text-sm text-gray-500 mt-2">Click or drag to replace</p></div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        <UserCircle className="w-16 h-16" strokeWidth={1.25} />
                                    </div>
                                    <p className="text-gray-500">Drag and drop or click to upload (max 5MB)</p>
                                </div>
                            )}
                            {imageUploading && <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center rounded-xl"><span className="text-sm">Uploading...</span></div>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Biography</label>
                        <textarea value={formData.biography} onChange={(e) => setFormData({ ...formData, biography: e.target.value })} placeholder="Brief bio" rows={3} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-black dark:text-white bg-white dark:bg-gray-800 resize-none" />
                    </div>
                    <Input label="LinkedIn URL" value={formData.linkedin_url} onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/username" />
                    <Input label="GitHub URL" value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} placeholder="https://github.com/username" />
                    <Input label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder={editMode ? 'Leave blank to keep current' : 'Enter password'} />
                     
                </div>
            </Modal>

            {/* Delete Modal — only superadmin sees delete; cannot delete own account or another admin */}
            <Modal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Delete User"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)} disabled={deleting}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete} disabled={deleting || (selectedUser && !canDeleteUser(selectedUser))}>
                            {deleting ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting…</> : 'Delete'}
                        </Button>
                    </>
                }
            >
                <p className="text-gray-600 dark:text-gray-400">
                    {selectedUser && !canDeleteUser(selectedUser)
                        ? (String(selectedUser?.id ?? selectedUser?.user_id) === String(currentUserId)
                            ? "You cannot delete your own account."
                            : "You cannot delete another admin or superadmin.")
                        : <>Are you sure you want to delete <strong>{selectedUser?.first_name} {selectedUser?.last_name}</strong>? This action cannot be undone.</>}
                </p>
            </Modal>

            {/* View User Modal */}
            <Modal isOpen={viewModalOpen} onClose={() => setViewModalOpen(false)} title="User Details" size="lg" footer={<Button variant="outline" onClick={() => setViewModalOpen(false)}>Close</Button>}>
                {viewUser && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            {viewUser.profile_image_url ? (
                                <img src={viewUser.profile_image_url} alt="" className="w-20 h-20 rounded-full object-cover" />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
                                    <UserCircle className="w-16 h-16" strokeWidth={1.25} />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{viewUser.first_name} {viewUser.last_name}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{viewUser.title || '—'}</p>
                                <Badge variant={getRoleColor(viewUser)}>{getRoleName(viewUser)}</Badge>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div><dt className="text-gray-500 dark:text-gray-400">Email</dt><dd className="font-medium text-gray-900 dark:text-white">{viewUser.email}</dd></div>
                            <div><dt className="text-gray-500 dark:text-gray-400">Phone</dt><dd className="font-medium text-gray-900 dark:text-white">{viewUser.phone || '—'}</dd></div>
                          
                            {viewUser.address && <div className="sm:col-span-2"><dt className="text-gray-500 dark:text-gray-400">Address</dt><dd className="font-medium text-gray-900 dark:text-white">{viewUser.address}</dd></div>}
                            {viewUser.biography && <div className="sm:col-span-2"><dt className="text-gray-500 dark:text-gray-400">Biography</dt><dd className="text-gray-900 dark:text-white">{viewUser.biography}</dd></div>}
                        </dl>
                    </div>
                )}
            </Modal>

            <Toast isVisible={toast.isVisible} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, isVisible: false })} />
        </div>
    );
};

export default UserList;
