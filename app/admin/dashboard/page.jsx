'use client';

import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui';
import {
    FileText, Users, FolderOpen, TrendingUp, Eye, Heart,
    CheckCircle, XCircle, Clock, PenLine, Tags, Image as ImageIcon,
    ArrowUpRight, ArrowDownRight, BarChart3
} from 'lucide-react';
import Link from 'next/link';

const Dashboard = () => {
    const { blogs, users, categories, tags, media, getStats } = useAdmin();
    const stats = getStats();

    const statCards = [
        {
            name: 'Total Blogs',
            value: stats.totalBlogs,
            icon: FileText,
            gradient: 'from-blue-500 to-blue-600',
            bgGradient: 'from-blue-500/10 to-blue-600/10',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-600',
            change: '+12%',
            changeType: 'increase'
        },
        {
            name: 'Published',
            value: stats.publishedBlogs,
            icon: CheckCircle,
            gradient: 'from-emerald-500 to-emerald-600',
            bgGradient: 'from-emerald-500/10 to-emerald-600/10',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-600',
            change: '+8%',
            changeType: 'increase'
        },


    ];

    const quickStats = [
        { name: 'Categories', value: stats.totalCategories, icon: FolderOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { name: 'Tags', value: stats.totalTags, icon: Tags, color: 'text-pink-600', bg: 'bg-pink-50' },
        { name: 'Media Files', value: stats.totalMedia, icon: ImageIcon, color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { name: 'Total Likes', value: stats.totalLikes, icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    ];

    const recentBlogs = blogs.slice(0, 5);
    const popularBlogs = [...blogs].sort((a, b) => b.likes - a.likes).slice(0, 5);
    const topInstructors = [...users]
        .filter(u => u.is_instructor)
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-1">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your blog.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/blogs/add"
                        className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95"
                    >
                        + New Blog Post
                    </Link>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div
                        key={stat.name}
                        className={`relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group`}
                    >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity`} />

                        <div className="relative p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 ${stat.iconBg} rounded-xl`}>
                                    <stat.icon className={stat.iconColor} size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.changeType === 'increase'
                                    ? 'text-emerald-700 bg-emerald-50'
                                    : stat.changeType === 'decrease'
                                        ? 'text-rose-700 bg-rose-50'
                                        : 'text-gray-600 bg-gray-100'
                                    }`}>
                                    {stat.changeType === 'increase' ? (
                                        <ArrowUpRight size={14} />
                                    ) : stat.changeType === 'decrease' ? (
                                        <ArrowDownRight size={14} />
                                    ) : null}
                                    {stat.change}
                                </div>
                            </div>
                            <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
                    </div>
                ))}
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((stat) => (
                    <div key={stat.name} className="flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                        <div className={`p-2.5 ${stat.bg} rounded-lg`}>
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs font-medium text-gray-500">{stat.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Blogs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Blogs</h3>
                        <Link href="/admin/blogs" className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="p-2">
                        {recentBlogs.map((blog) => (
                            <div key={blog.blog_id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <img
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e2e8f0" width="100" height="100"/%3E%3Ctext fill="%2394a3b8" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate mb-1">{blog.title}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Heart size={12} className="text-rose-500" />
                                            {blog.likes}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(blog.added_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className={`flex-shrink-0 ${blog.status === 'active' ? 'text-emerald-500' : 'text-gray-400'}`}>
                                    {blog.status === 'active' ? <CheckCircle size={18} /> : <Clock size={18} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Popular Blogs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Most Popular</h3>
                        <Link href="/admin/blogs" className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </Link>
                    </div>
                    <div className="p-2">
                        {popularBlogs.map((blog, index) => (
                            <div key={blog.blog_id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-gradient-to-br from-amber-400 to-yellow-500 text-white' :
                                    index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-orange-700 text-white' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{blog.title}</h4>
                                    <p className="text-xs text-gray-500">{blog.likes} likes</p>
                                </div>
                                {blog.is_popular && (
                                    <span className="flex-shrink-0 px-2 py-1 bg-gradient-to-r from-rose-500/10 to-pink-500/10 text-rose-600 text-xs font-medium rounded-full">
                                        Popular
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Instructors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Top Instructors</h3>
                    <Link href="/admin/users" className="text-sm text-violet-600 hover:text-violet-700 font-medium flex items-center gap-1">
                        View All <ArrowUpRight size={14} />
                    </Link>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {topInstructors.map((instructor) => (
                            <div key={instructor.id} className="text-center p-4 rounded-xl border border-gray-100 hover:border-violet-200 hover:shadow-md transition-all group">
                                <div className="mb-3">
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
                                        {instructor.first_name[0]}{instructor.last_name[0]}
                                    </div>
                                </div>
                                <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                                    {instructor.first_name} {instructor.last_name}
                                </h4>
                                <p className="text-xs text-gray-500 truncate mb-2">{instructor.title || 'Instructor'}</p>
                                <span className="inline-flex px-2 py-1 bg-violet-50 text-violet-700 text-xs font-medium rounded-full">
                                    Instructor
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <Link href="/admin/blogs/add" className="flex flex-col items-center p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-violet-400 hover:bg-violet-50/30 transition-all text-center group">
                            <div className="w-12 h-12 rounded-xl bg-violet-100 group-hover:bg-violet-500 flex items-center justify-center mb-3 transition-colors">
                                <FileText className="text-violet-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <p className="font-semibold text-gray-700 group-hover:text-violet-600 transition-colors text-sm">Add New Blog</p>
                        </Link>
                        <Link href="/admin/users" className="flex flex-col items-center p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all text-center group">
                            <div className="w-12 h-12 rounded-xl bg-emerald-100 group-hover:bg-emerald-500 flex items-center justify-center mb-3 transition-colors">
                                <Users className="text-emerald-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <p className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors text-sm">Manage Users</p>
                        </Link>
                        <Link href="/admin/categories" className="flex flex-col items-center p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all text-center group">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 group-hover:bg-amber-500 flex items-center justify-center mb-3 transition-colors">
                                <FolderOpen className="text-amber-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <p className="font-semibold text-gray-700 group-hover:text-amber-600 transition-colors text-sm">Categories</p>
                        </Link>
                        <Link href="/admin/media" className="flex flex-col items-center p-5 rounded-xl border-2 border-dashed border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/30 transition-all text-center group">
                            <div className="w-12 h-12 rounded-xl bg-cyan-100 group-hover:bg-cyan-500 flex items-center justify-center mb-3 transition-colors">
                                <ImageIcon className="text-cyan-600 group-hover:text-white transition-colors" size={24} />
                            </div>
                            <p className="font-semibold text-gray-700 group-hover:text-cyan-600 transition-colors text-sm">Media Library</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
