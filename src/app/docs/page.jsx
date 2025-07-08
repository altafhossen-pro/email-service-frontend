// app/docs/page.jsx
import Link from 'next/link'
import {
    Zap,
    Shield,
    BarChart3,
    Cloud,
    Code,
    Users,
    CheckCircle,
    Send,
    Globe,
    ArrowRight,
    Clock,
    Star
} from 'lucide-react'

const features = [
    {
        icon: Zap,
        title: 'High Performance',
        description: 'Send emails at lightning speed with our optimized infrastructure and global delivery network.',
        color: 'yellow'
    },
    {
        icon: Shield,
        title: 'Security First',
        description: 'Enterprise-grade security with end-to-end encryption, SPF, DKIM, and DMARC support.',
        color: 'green'
    },
    {
        icon: BarChart3,
        title: 'Real-time Analytics',
        description: 'Track delivery, opens, clicks, and engagement metrics with detailed reporting.',
        color: 'purple'
    },
    {
        icon: Cloud,
        title: 'Cloud Native',
        description: 'Scalable infrastructure that grows with your business, handling millions of emails.',
        color: 'blue'
    },
    {
        icon: Code,
        title: 'Developer Friendly',
        description: 'Simple REST APIs and SDKs for all major programming languages and frameworks.',
        color: 'indigo'
    },
    {
        icon: Users,
        title: '24/7 Support',
        description: 'Expert support team available around the clock to help with any issues.',
        color: 'pink'
    }
]

const quickLinks = [
    {
        title: 'Quick Start',
        description: 'Get up and running in 5 minutes',
        href: '/docs/quickstart',
        icon: Zap,
        color: 'bg-blue-500'
    },
    {
        title: 'API Reference',
        description: 'Complete API documentation',
        href: '/docs/api/send-email',
        icon: Code,
        color: 'bg-green-500'
    },
    {
        title: 'SMTP Setup',
        description: 'Configure SMTP settings',
        href: '/docs/guides/smtp-setup',
        icon: Send,
        color: 'bg-purple-500'
    },
    {
        title: 'Examples',
        description: 'Code examples for popular frameworks',
        href: '/docs/examples/nodejs',
        icon: Globe,
        color: 'bg-orange-500'
    }
]

const stats = [
    { label: 'Uptime', value: '99.9%', icon: CheckCircle },
    { label: 'Emails/month', value: '1M+', icon: Send },
    { label: 'Countries', value: '50+', icon: Globe },
    { label: 'Avg Response', value: '<100ms', icon: Clock }
]

export default function DocsOverview() {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700">
                    <Star className="w-4 h-4" />
                    <span>v2.1.0 - Latest Release</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    SMTP Service Documentation
                </h1>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Powerful, reliable email delivery service for developers. Send transactional emails,
                    marketing campaigns, and notifications with our robust SMTP infrastructure.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/docs/quickstart"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/docs/api/send-email"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        <Code className="w-4 h-4" />
                        API Reference
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200">
                        <div className="flex justify-center mb-3">
                            <stat.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Quick Links */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <link.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                        {link.title}
                                    </h3>
                                    <p className="text-gray-600">{link.description}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Our SMTP Service?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-white rounded-xl border border-gray-200">
                            <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Getting Started Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Started in 3 Steps</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">1</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Sign Up & Get API Keys</h3>
                        <p className="text-sm text-gray-600">Create your account and obtain your SMTP credentials</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">2</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Configure Your App</h3>
                        <p className="text-sm text-gray-600">Set up your application with our simple configuration</p>
                    </div>
                    <div className="text-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold">3</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">Send Your First Email</h3>
                        <p className="text-sm text-gray-600">Start sending emails with our REST API or SMTP</p>
                    </div>
                </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                        <p className="text-gray-600">
                            Our support team is here to help you integrate and optimize your email delivery.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/support"
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Contact Support
                        </Link>
                        <Link
                            href="/docs/guides/troubleshooting"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Troubleshooting
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}