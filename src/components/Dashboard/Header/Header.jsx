'use client'

import { Bell, Search, User, LogOut, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Header({ onMobileMenuClick }) {
    const { user, loading } = useSelector((state) => state.auth);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    console.log(user);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={onMobileMenuClick}
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">E</span>
                            </div>
                            <h1 className="text-lg font-semibold text-gray-900">EmailHub</h1>
                        </div>

                        {/* Desktop Title */}
                        <h1 className="hidden lg:block text-2xl font-semibold text-gray-900">Dashboard</h1>
                    </div>

                    <div className="flex items-center space-x-2 lg:space-x-4">
                        {/* Desktop Search */}
                        <div className="hidden lg:block relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Mobile Search Toggle */}
                        <button
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {showMobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>

                        {/* Notifications */}
                        <div className="relative">
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                        </div>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="hidden sm:block text-sm font-medium">
                                    {user?.name || "Your Profile"}
                                </span>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </button>
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </button>
                                    <hr className="my-1" />
                                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {showMobileSearch && (
                    <div className="lg:hidden mt-4 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>
                )}
            </div>
        </header>
    )
}