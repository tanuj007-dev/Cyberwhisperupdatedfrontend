'use client';

import { useState } from 'react';
import { Menu, Bell, Search, Sun, Moon, Command } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: 'New blog published', message: 'Your blog "Advanced Pentesting" is now live', time: '5 min ago', unread: true },
        { id: 2, title: 'New user registered', message: 'John Doe joined as a student', time: '1 hour ago', unread: true },
        { id: 3, title: 'Comment received', message: 'Someone commented on your post', time: '2 hours ago', unread: false },
    ];

    return (
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 sticky top-0 z-30">
            <div className="h-full px-4 lg:px-6 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
                    >
                        <Menu size={22} className="text-gray-700" />
                    </button>

                    {/* Search Bar */}
                    {/* <div className="hidden md:flex items-center">
                            <div className="relative group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-600 transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-72 lg:w-80 pl-11 pr-12 py-2.5 bg-gray-100/80 border border-transparent rounded-xl focus:bg-white focus:border-violet-300 focus:ring-4 focus:ring-violet-100 transition-all text-sm placeholder:text-gray-400"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-gray-200/80 rounded-md">
                                    <Command size={12} className="text-gray-500" />
                                    <span className="text-[10px] font-medium text-gray-500">K</span>
                                </div>
                            </div>
                        </div> */}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    {/* <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2.5 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
                    >
                        {darkMode ? (
                            <Sun size={20} className="text-amber-500" />
                        ) : (
                            <Moon size={20} className="text-gray-600" />
                        )}
                    </button> */}

                    {/* Notifications */}
                    {/* <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all active:scale-95"
                        >
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                        </button>

                        {/* Notifications Dropdown */}
                    {showNotifications && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowNotifications(false)}
                            />
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                    <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">
                                        {notifications.filter(n => n.unread).length} new
                                    </span>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${notif.unread ? 'bg-violet-50/30' : ''}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                {notif.unread && (
                                                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                                                )}
                                                <div className={notif.unread ? '' : 'ml-5'}>
                                                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{notif.message}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
                                    <button className="w-full text-center text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                                        View all notifications
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                    {/* </div> */}

                    {/* Divider */}
                    <div className="hidden sm:block w-px h-8 bg-gray-200 mx-2" />

                    {/* Admin Profile */}
                    {/* <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-800">Admin User</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center ring-2 ring-transparent group-hover:ring-violet-200 transition-all shadow-lg shadow-purple-500/20">
                            <span className="text-white font-semibold text-sm">AD</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
