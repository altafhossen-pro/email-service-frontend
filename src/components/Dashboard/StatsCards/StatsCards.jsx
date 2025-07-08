import { Mail, Send, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

const stats = [
    {
        name: 'Total Emails Sent',
        value: '12,847',
        change: '+12.5%',
        changeType: 'positive',
        icon: Send,
        color: 'bg-blue-500'
    },
    {
        name: 'Delivered',
        value: '11,932',
        change: '+8.2%',
        changeType: 'positive',
        icon: CheckCircle,
        color: 'bg-green-500'
    },
    {
        name: 'Bounced',
        value: '486',
        change: '-2.4%',
        changeType: 'negative',
        icon: AlertCircle,
        color: 'bg-red-500'
    },
    {
        name: 'Open Rate',
        value: '24.8%',
        change: '+5.1%',
        changeType: 'positive',
        icon: TrendingUp,
        color: 'bg-purple-500'
    },
]

export default function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                            <stat.icon className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">vs last month</span>
                    </div>
                </div>
            ))}
        </div>
    )
}