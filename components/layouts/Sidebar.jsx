'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    Shield
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const [blogMenuOpen, setBlogMenuOpen] = useState(true);

    const menuItems = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/admin/dashboard'
        },
        {
            name: 'Blogs',
            icon: FileText,
            hasSubmenu: true,
            submenu: [
                { name: 'All Blogs', icon: List, path: '/admin/blogs' },
                { name: 'Add Blog', icon: PlusCircle, path: '/admin/blogs/add' }
            ]
        },
        {
            name: 'Categories',
            icon: FolderOpen,
            path: '/admin/categories'
        },
        {
            name: 'Tags',
            icon: Tags,
            path: '/admin/tags'
        },
        {
            name: 'Users',
            icon: Users,
            path: '/admin/users'
        },
        {
            name: 'Media Library',
            icon: ImageIcon,
            path: '/admin/media'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/admin/settings'
        }
    ];

    const isActive = (path) => pathname === path;
    const isParentActive = (submenu) => submenu?.some(item => pathname === item.path);

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
                className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white w-72 transform transition-transform duration-300 ease-in-out z-50 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-700/50 bg-slate-900/50">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-purple-500/30">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-xl bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                                CyberWhisper
                            </span>
                            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Admin Panel</p>
                        </div>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 scrollbar-hide">
                    <p className="px-3 mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                {item.hasSubmenu ? (
                                    <>
                                        <button
                                            onClick={() => setBlogMenuOpen(!blogMenuOpen)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isParentActive(item.submenu)
                                                ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-white'
                                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${isParentActive(item.submenu)
                                                    ? 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/30'
                                                    : 'bg-slate-700/50 group-hover:bg-slate-600'
                                                    } transition-all`}>
                                                    <item.icon size={18} />
                                                </div>
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform text-slate-400 ${blogMenuOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${blogMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <ul className="mt-2 ml-4 pl-4 border-l border-slate-700 space-y-1">
                                                {item.submenu.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        <Link
                                                            href={subItem.path}
                                                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${isActive(subItem.path)
                                                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                                                                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
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
                                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${isActive(item.path)
                                            ? 'bg-white/20'
                                            : 'bg-slate-700/50 group-hover:bg-slate-600'
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
                <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/50 hover:from-slate-700/80 hover:to-slate-600/50 transition-all cursor-pointer group">
                        <div className="w-11 h-11 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                            <span className="text-white font-bold text-sm">AD</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">admin@cyberwhisper.com</p>
                        </div>
                        <div className="w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-emerald-500/20"></div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
