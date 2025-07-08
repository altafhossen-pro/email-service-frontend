import Link from 'next/link'
import { Mail, Plus, Settings, FileText, Key, Users } from 'lucide-react'

const actions = [
    {
        name: 'Send Email',
        description: 'Compose and send a new email',
        href: '/dashboard/send',
        icon: Mail,
        color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
        name: 'Create Template',
        description: 'Design a new email template',
        href: '/dashboard/templates',
        icon: FileText,
        color: 'bg-green-500 hover:bg-green-600'
    },
    {
        name: 'Add SMTP',
        description: 'Configure SMTP settings',
        href: '/dashboard/smtp',
        icon: Settings,
        color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
        name: 'Generate API Key',
        description: 'Create new API key',
        href: '/dashboard/api-keys',
        icon: Key,
        color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
        name: 'Import Contacts',
        description: 'Add contacts to your list',
        href: '/dashboard/contacts',
        icon: Users,
        color: 'bg-pink-500 hover:bg-pink-600'
    }
]

export default function QuickActions() {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
                {actions.map((action) => (
                    <Link
                        key={action.name}
                        href={action.href}
                        className="flex items-center p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className={`${action.color} p-2 rounded-lg transition-colors`}>
                            <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                {action.name}
                            </h4>
                            <p className="text-xs text-gray-500">{action.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}