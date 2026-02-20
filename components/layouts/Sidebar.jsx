'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    PlusCircle,
    List,
    FolderOpen,
    Tags,
    Users,
    Settings,
    X,
    ChevronDown,
    Image as ImageIcon,
    Calendar,
    Mail,
    LogOut,
    BookOpen,
    ClipboardList,
    UserCircle
} from 'lucide-react';

const ADMIN_LOGO = '/assets/cw_logo_sample_2.png';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const [blogMenuOpen, setBlogMenuOpen] = useState(true);
    const [batchMenuOpen, setBatchMenuOpen] = useState(true);
    const [courseMenuOpen, setCourseMenuOpen] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => {
        setRole(typeof window !== 'undefined' ? localStorage.getItem('adminRole') : null);
    }, [pathname]);

    const allMenuItems = [
        /* {
             name: 'Dashboard',
             icon: LayoutDashboard,
             path: '/admin/dashboard'
         },*/
        {
            name: 'Blogs',
            icon: FileText,
            hasSubmenu: true,
            submenu: [
                { name: 'All Blogs', icon: List, path: '/admin/blogs' },
                { name: 'Add Blog', icon: PlusCircle, path: '/admin/blogs/add' },
                { name: 'Categories', icon: FolderOpen, path: '/admin/categories' },
                { name: 'Tags', icon: Tags, path: '/admin/tags' }
            ]
        },
        {
            name: 'Batches',
            icon: Calendar,
            hasSubmenu: true,
            submenu: [
                { name: 'All Batches', icon: List, path: '/admin/batches' },
                { name: 'Add Batch', icon: PlusCircle, path: '/admin/batches/add' },
                { name: 'Batch Enrollments', icon: Users, path: '/admin/upcoming-enrollments' }
            ]
        },
        {
            name: 'Courses',
            icon: BookOpen,
            hasSubmenu: true,
            submenu: [
                { name: 'All Courses', icon: List, path: '/admin/courses' },
                { name: 'Add Course', icon: PlusCircle, path: '/admin/courses/add' }
            ]
        },
        {
            name: 'Users',
            icon: Users,
            path: '/admin/users'
        },
        {
            name: 'Newsletter',
            icon: Mail,
            path: '/admin/newsletter'
        },
        {
            name: 'Deploy Team Requests',
            icon: ClipboardList,
            path: '/admin/deploy-team-training'
        },
        {
            name: 'Course Enrollments',
            icon: Users,
            path: '/admin/course-enrollments'
        },
        {
            name: 'Gallery',
            icon: ImageIcon,
            path: '/admin/gallery'
        },
        /*{
            name: 'Media Library',
            icon: ImageIcon,
            path: '/admin/media'
        },*/
        /*{
            name: 'Settings',
            icon: Settings,
            path: '/admin/settings'
        }*/
    ];

    // Role-based menu: Student = Blogs (including Add Blog) + My Profile only; Instructor = Blogs, Batches, Courses, Course Enrollments + My Profile (no Add Course); Admin = full
    const myProfileItem = { name: 'My Profile', icon: UserCircle, path: '/admin/profile' };
    const menuItems = (() => {
        if (role === 'STUDENT') {
            // Students get full Blogs submenu: All Blogs, Add Blog, Categories, Tags
            const blogs = allMenuItems.find((item) => item.name === 'Blogs');
            return [blogs, myProfileItem].filter(Boolean);
        }
        if (role === 'INSTRUCTOR') {
            const allowed = ['Blogs', 'Batches', 'Courses', 'Course Enrollments'];
            const items = allMenuItems.filter((item) => allowed.includes(item.name));
            // Hide "Add Course" for Instructors
            return items.map((item) => {
                if (item.name === 'Courses' && item.submenu) {
                    return { ...item, submenu: item.submenu.filter((s) => s.name !== 'Add Course') };
                }
                return item;
            }).concat(myProfileItem);
        }
        return [...allMenuItems, myProfileItem];
    })();

    const isActive = (path) => pathname === path;
    const isParentActive = (submenu) => submenu?.some(item => pathname === item.path);

    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        router.push('/admin/login');
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full flex flex-col bg-white text-gray-900 w-72 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl border-r border-gray-200 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo Section */}
                <div className="h-20 shrink-0 flex items-center justify-center px-6 border-b border-gray-200 bg-white">
                    <Link href="/admin/blogs" className="flex items-center gap-3 group">
                        <div className="relative h-12 w-[140px] shrink-0">
                            <Image
                                src={ADMIN_LOGO}
                                alt="CyberWhisper"
                                fill
                                className="object-contain object-left transition-transform group-hover:scale-105"
                                sizes="140px"
                                priority
                            />
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation - scrollable when menu is long */}
                <nav className="flex-1 min-h-0 overflow-y-auto py-6 px-4 scrollbar-hide">
                    <p className="px-3 mb-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Main Menu</p>
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                {item.hasSubmenu ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (item.name === 'Blogs') setBlogMenuOpen(!blogMenuOpen);
                                                if (item.name === 'Batches') setBatchMenuOpen(!batchMenuOpen);
                                                if (item.name === 'Courses') setCourseMenuOpen(!courseMenuOpen);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isParentActive(item.submenu)
                                                ? 'bg-violet-50 text-violet-700'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${isParentActive(item.submenu)
                                                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                                                    : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                                                    } transition-all`}>
                                                    <item.icon size={18} />
                                                </div>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform text-gray-500 ${(item.name === 'Blogs' && blogMenuOpen) ||
                                                    (item.name === 'Batches' && batchMenuOpen) ||
                                                    (item.name === 'Courses' && courseMenuOpen)
                                                    ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${(item.name === 'Blogs' && blogMenuOpen) ||
                                            (item.name === 'Batches' && batchMenuOpen) ||
                                            (item.name === 'Courses' && courseMenuOpen)
                                            ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <ul className="mt-2 ml-4 pl-4 border-l border-gray-200 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            href={subItem.path}
                                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(subItem.path)
                                                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                                }`}
                                                        >
                                                            <subItem.icon size={16} />
                                                            <span className="text-sm font-medium">{subItem.name}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive(item.path)
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isActive(item.path)
                                            ? 'bg-white/20'
                                            : 'bg-gray-200 text-gray-600 group-hover:bg-gray-300'
                                            } transition-all`}>
                                            <item.icon size={18} />
                                        </div>
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="shrink-0 p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-100 transition-all group">
                        <div className="flex-1 items-center justify-center min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Logout</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-all"
                            title="Logout"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
