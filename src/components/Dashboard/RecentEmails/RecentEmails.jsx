import { CheckCircle, AlertCircle, Clock, Eye } from 'lucide-react'

const recentEmails = [
    {
        id: 1,
        subject: 'Welcome to Our Platform',
        recipient: 'john.doe@example.com',
        status: 'delivered',
        timestamp: '2024-01-07 10:30 AM',
        opens: 3,
        clicks: 1
    },
    {
        id: 2,
        subject: 'Monthly Newsletter - January',
        recipient: 'jane.smith@example.com',
        status: 'delivered',
        timestamp: '2024-01-07 09:15 AM',
        opens: 1,
        clicks: 0
    },
    {
        id: 3,
        subject: 'Password Reset Request',
        recipient: 'admin@company.com',
        status: 'pending',
        timestamp: '2024-01-07 08:45 AM',
        opens: 0,
        clicks: 0
    },
    {
        id: 4,
        subject: 'Product Update Notification',
        recipient: 'user@domain.com',
        status: 'bounced',
        timestamp: '2024-01-07 08:20 AM',
        opens: 0,
        clicks: 0
    },
    {
        id: 5,
        subject: 'Weekly Report Summary',
        recipient: 'team@startup.com',
        status: 'delivered',
        timestamp: '2024-01-07 07:30 AM',
        opens: 5,
        clicks: 2
    }
]

const getStatusIcon = (status) => {
    switch (status) {
        case 'delivered':
            return <CheckCircle className="w-4 h-4 text-green-500" />
        case 'bounced':
            return <AlertCircle className="w-4 h-4 text-red-500" />
        case 'pending':
            return <Clock className="w-4 h-4 text-yellow-500" />
        default:
            return <Clock className="w-4 h-4 text-gray-500" />
    }
}

const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
        case 'delivered':
            return `${baseClasses} bg-green-100 text-green-800`
        case 'bounced':
            return `${baseClasses} bg-red-100 text-red-800`
        case 'pending':
            return `${baseClasses} bg-yellow-100 text-yellow-800`
        default:
            return `${baseClasses} bg-gray-100 text-gray-800`
    }
}

export default function RecentEmails() {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Emails</h3>
                <p className="text-sm text-gray-500 mt-1">Your latest email sending activity</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Recipient
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Timestamp
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Engagement
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recentEmails.map((email) => (
                            <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {getStatusIcon(email.status)}
                                        <span className="ml-2 text-sm font-medium text-gray-900">
                                            {email.subject}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-600">{email.recipient}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getStatusBadge(email.status)}>
                                        {email.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {email.timestamp}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Eye className="w-4 h-4 mr-1" />
                                            {email.opens}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <span className="w-4 h-4 mr-1 text-center">🔗</span>
                                            {email.clicks}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    View all emails →
                </button>
            </div>
        </div>
    )
}