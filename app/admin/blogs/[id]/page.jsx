'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdmin } from '@/contexts/AdminContext';
import { Button, Badge, Skeleton } from '@/components/ui';
import { ArrowLeft, Calendar, User, FolderOpen, Heart, Edit2, Eye, Clock, Tag, Info, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '@/lib/apiConfig';

const ViewBlog = () => {
    const params = useParams();
    const router = useRouter();
    const { getBlogById, users, categories } = useAdmin();

    const [blog, setBlog] = useState(null);
    const [fullContent, setFullContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDevInfo, setShowDevInfo] = useState(false);

    useEffect(() => {
        const blogData = getBlogById(parseInt(params.id));
        setBlog(blogData);
        setLoading(false);
    }, [params.id, getBlogById]);

    // Fetch full blog content (list API often returns only excerpt/short description)
    useEffect(() => {
        if (!blog || !params.id) return;
        const base = (API_BASE_URL || '').replace(/\/$/, '');
        const slug = blog.slug || blog.slug_url;
        const id = blog.blog_id ?? blog.id;
        const urlsToTry = [];
        if (slug) urlsToTry.push(`/api/blogs/${encodeURIComponent(slug)}`);
        if (id != null) urlsToTry.push(`${base}/api/blogs/${id}`);
        if (slug && base) urlsToTry.push(`${base}/api/blogs/${encodeURIComponent(slug)}`);
        if (id != null) urlsToTry.push(`/api/blogs/${id}`);
        const fetchFull = async () => {
            for (const url of urlsToTry) {
                try {
                    const res = await fetch(url, { headers: { Accept: 'application/json' } });
                    if (!res.ok) continue;
                    const result = await res.json();
                    const data = result.data ?? result.blog ?? result.post ?? result;
                    if (!data) continue;
                    const content = data.content ?? data.description ?? data.body ?? '';
                    if (content && String(content).trim() !== '') {
                        setFullContent(content);
                        return;
                    }
                } catch (_) {
                    continue;
                }
            }
        };
        fetchFull();
    }, [blog, params.id]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto space-y-6">
                <Skeleton variant="title" />
                <Skeleton className="h-96" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye size={32} className="text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Not Found</h2>
                <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
                <Button onClick={() => router.push('/admin/blogs')}>Back to Blogs</Button>
            </div>
        );
    }

    const author = users.find(u => u.id === blog.user_id);
    const category = categories.find(c => c.id === blog.blog_category_id);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => router.push('/admin/blogs')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="font-medium">Back to Blogs</span>
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowDevInfo(!showDevInfo)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showDevInfo ? 'bg-violet-50 border-violet-300 text-violet-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Info size={18} />
                        {showDevInfo ? 'Hide' : 'Show'} Dev Info
                    </button>
                    <button
                        onClick={() => router.push(`/admin/blogs/edit/${blog.blog_id}`)}
                        className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                        <Edit2 size={18} />
                        Edit Blog
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Banner Image */}
                {/* <div className="relative h-64 md:h-80">
                    <img
                        src={blog.banner || blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="400"%3E%3Crect fill="%23f3f4f6" width="1200" height="400"/%3E%3Ctext fill="%239ca3af" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24"%3ENo Banner Image%3C/text%3E%3C/svg%3E';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status & Popular badges */}
                {/* <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant={blog.status === 'active' ? 'success' : 'danger'} className="shadow-lg">
                            {blog.status === 'active' ? 'Published' : 'Draft'}
                        </Badge>
                        {blog.is_popular && (
                            <span className="px-3 py-1 bg-amber-500 text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-1">
                                ⭐ Featured
                            </span>
                        )}
                    </div>
                </div> */}  

                {/* Content */}
                <div className="p-8">
                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-[50px] font-semibold tracking-tight leading-tight text-gray-900 mb-4">
                        {blog.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1.5 bg-violet-100 rounded-lg">
                                <User size={16} className="text-violet-600" />
                            </div>
                            <span className="font-medium">
                                {author ? `${author.first_name} ${author.last_name}` : 'Unknown Author'}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                                <FolderOpen size={16} className="text-emerald-600" />
                            </div>
                            <span>{category ? category.name : 'Uncategorized'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1.5 bg-blue-100 rounded-lg">
                                <Calendar size={16} className="text-blue-600" />
                            </div>
                            <span>{new Date(blog.added_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>

                        {/* <div className="flex items-center gap-2 text-gray-600">
                            <div className="p-1.5 bg-pink-100 rounded-lg">
                                <Heart size={16} className="text-pink-600" />
                            </div>
                            <span className="font-semibold">{blog.likes} likes</span>
                    </div> */}

                        {blog.readingTime && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <div className="p-1.5 bg-orange-100 rounded-lg">
                                    <Clock size={16} className="text-orange-600" />
                                </div>
                                <span>{blog.readingTime}</span>
                            </div>
                        )}
                    </div>

                    {/* Keywords/Tags */}
                    {blog.keywords && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Tag size={16} className="text-gray-500" />
                                <span className="text-sm font-medium text-gray-500">Tags</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {blog.keywords.split(',').filter(k => k.trim()).map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-100"
                                    >
                                        {keyword.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Short Description */}
                    {(blog.shortDescription || blog.short_description) && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-xl border-l-4 border-violet-500">
                            <p className="text-gray-700 italic">{blog.shortDescription || blog.short_description}</p>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-8" />

                    {/* Blog Content - Full content from API when available (list only returns excerpt) */}
                    <article className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: fullContent ?? blog.description ?? blog.content ?? '' }}
                        />
                    </article>
                </div>
            </div>

            {/* Developer Info Panel - Hidden by default, toggle with button */}
            {
                showDevInfo && (
                    <div className="bg-gray-900 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <Info size={20} className="text-violet-400" />
                            <h3 className="text-lg font-semibold">Developer Information</h3>
                            <span className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">For API Integration</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            This data is what you would receive from your API. Use these field names when integrating with your backend.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">blog_id</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.blog_id}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">user_id</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.user_id}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">blog_category_id</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.blog_category_id}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">status</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.status}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">is_popular</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.is_popular ? 'true' : 'false'}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg">
                                <p className="text-xs text-gray-400 mb-1">likes</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.likes}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
                                <p className="text-xs text-gray-400 mb-1">added_date</p>
                                <p className="text-sm font-mono text-emerald-400">{blog.added_date}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
                                <p className="text-xs text-gray-400 mb-1">thumbnail</p>
                                <p className="text-sm font-mono text-emerald-400 truncate">{blog.thumbnail}</p>
                            </div>
                            <div className="bg-gray-800 p-3 rounded-lg col-span-2">
                                <p className="text-xs text-gray-400 mb-1">banner</p>
                                <p className="text-sm font-mono text-emerald-400 truncate">{blog.banner}</p>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Style for prose content */}
            <style jsx global>{`
                .prose h1 { font-size: 2rem; font-weight: 700; margin: 1rem 0; color: #111827; }
                .prose h2 { font-size: 1.5rem; font-weight: 600; margin: 1rem 0; color: #1f2937; }
                .prose h3 { font-size: 1.25rem; font-weight: 600; margin: 0.75rem 0; color: #374151; }
                .prose p { margin: 0.75rem 0; }
                .prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 0.75rem 0; }
                .prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 0.75rem 0; }
                .prose li { margin: 0.25rem 0; }
                .prose blockquote { 
                    border-left: 4px solid #8b5cf6; 
                    padding: 0.75rem 1rem; 
                    margin: 0.75rem 0; 
                    background: #faf5ff; 
                    border-radius: 0 0.5rem 0.5rem 0;
                    font-style: italic;
                    color: #6b7280;
                }
                .prose code {
                    background: #f3e8ff;
                    padding: 0.125rem 0.375rem;
                    border-radius: 0.25rem;
                    font-family: ui-monospace, monospace;
                    font-size: 0.875em;
                    color: #7c3aed;
                }
                .prose a { color: #7c3aed; text-decoration: underline; }
                .prose img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 0.75rem 0; }
            `}</style>
        </div >
    );
};

export default ViewBlog;
