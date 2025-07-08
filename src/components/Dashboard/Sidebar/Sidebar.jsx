'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Home,
    Mail,
    Settings,
    BarChart3,
    Key,
    Users,
    CreditCard,
    FileText,
    ChevronLeft,
    ChevronRight,
    User
} from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Send Email', href: '/dashboard/send', icon: Mail },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'API Keys', href: '/dashboard/api-keys', icon: Key },
    { name: 'SMTP Settings', href: '/dashboard/smtp', icon: Settings },
    { name: 'Templates', href: '/dashboard/templates', icon: FileText },
    { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
    { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={`${collapsed ? 'w-24' : 'w-72'} bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out flex flex-col h-screen max-h-screen overflow-hidden`}>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
                {!collapsed && (
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                            <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">EmailHub</h1>
                            <p className="text-xs text-gray-500">Email Management</p>
                        </div>
                    </div>
                )}
                {collapsed && (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                        <Mail className="w-5 h-5 text-white" />
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-auto"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6">
                <div className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                                title={collapsed ? item.name : undefined}
                            >
                                <item.icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'} ${
                                    isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                                }`} />
                                {!collapsed && (
                                    <span className="truncate">{item.name}</span>
                                )}
                                {!collapsed && isActive && (
                                    <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
                <div className={`${collapsed ? 'flex justify-center' : 'flex items-center'} space-x-3`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">john@example.com</p>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-blue-700">Pro Plan</span>
                            <span className="text-xs text-blue-600">✓ Active</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}