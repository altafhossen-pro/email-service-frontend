// app/docs/layout.jsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Menu,
    X,
    Search,
    Home,
    Book,
    Code,
    Shield,
    Zap,
    Send,
    Users,
    FileText,
    Globe,
    Settings,
    BarChart3,
    CheckCircle,
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Mail,
    Github,
    ExternalLink
} from 'lucide-react'
import { useSelector } from 'react-redux'

const navigation = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Overview', href: '/docs', icon: Home },
            { title: 'Quick Start', href: '/docs/quickstart', icon: Zap },
            { title: 'Installation', href: '/docs/installation', icon: Code },
            { title: 'Authentication', href: '/docs/authentication', icon: Shield },
        ]
    },
    {
        title: 'API Reference',
        items: [
            { title: 'Send Email', href: '/docs/api/send-email', icon: Send },
            { title: 'Bulk Send', href: '/docs/api/bulk-send', icon: Users },
            { title: 'Templates', href: '/docs/api/templates', icon: FileText },
            { title: 'Webhooks', href: '/docs/api/webhooks', icon: Globe },
        ]
    },
    {
        title: 'Guides',
        items: [
            { title: 'SMTP Setup', href: '/docs/guides/smtp-setup', icon: Settings },
            { title: 'Monitoring', href: '/docs/guides/monitoring', icon: BarChart3 },
            { title: 'Deliverability', href: '/docs/guides/deliverability', icon: CheckCircle },
            { title: 'Troubleshooting', href: '/docs/guides/troubleshooting', icon: AlertCircle },
        ]
    },
    {
        title: 'Examples',
        items: [
            { title: 'Node.js', href: '/docs/examples/nodejs', icon: Code },
            { title: 'Python', href: '/docs/examples/python', icon: Code },
            { title: 'PHP', href: '/docs/examples/php', icon: Code },
            { title: 'React', href: '/docs/examples/react', icon: Code },
        ]
    }
]

function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-screen w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">SMTP Service</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b border-gray-200 flex-shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search docs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Navigation - Scrollable */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        {navigation.map((section) => (
                            <div key={section.title} className="mb-6">
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                    {section.title}
                                </h3>
                                <ul className="space-y-1">
                                    {section.items.map((item) => {
                                        const Icon = item.icon
                                        const isActive = pathname === item.href
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                            ${isActive
                                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                        }
                          `}
                                                    onClick={onClose}
                                                >
                                                    <Icon className="w-4 h-4 flex-shrink-0" />
                                                    {item.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 flex-shrink-0">
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com/yourcompany/smtp-service"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="w-4 h-4" />
                                GitHub
                            </Link>
                            <Link
                                href="/support"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Support
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default function DocsLayout({ children }) {
    const { user, loading } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="h-screen overflow-hidden bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center justify-between px-4 py-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center justify-between gap-4 w-full">
                            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                                <span>v2.1.0</span>
                                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                <span>Last updated: July 2025</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {
                                    user?.email ? (
                                        <Link
                                            href="/dashboard"
                                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/login"
                                            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Login
                                        </Link>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content - Scrollable */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto w-full px-4 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}