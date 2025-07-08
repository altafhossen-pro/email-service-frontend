'use client'

import { useState } from 'react'
import { Download, Filter, TrendingUp, Mail, Eye, MousePointer, AlertCircle } from 'lucide-react'

const analyticsData = {
    overview: {
        totalSent: 45678,
        delivered: 43210,
        bounced: 1234,
        opened: 12345,
        clicked: 3456,
        unsubscribed: 123
    },
    timeSeriesData: [
        { date: '2024-01-01', sent: 1200, delivered: 1150, opened: 345, clicked: 89 },
        { date: '2024-01-02', sent: 1350, delivered: 1290, opened: 387, clicked: 112 },
        { date: '2024-01-03', sent: 1180, delivered: 1125, opened: 298, clicked: 76 },
        { date: '2024-01-04', sent: 1420, delivered: 1380, opened: 456, clicked: 134 },
        { date: '2024-01-05', sent: 1680, delivered: 1620, opened: 543, clicked: 167 },
        { date: '2024-01-06', sent: 1590, delivered: 1534, opened: 489, clicked: 145 },
        { date: '2024-01-07', sent: 1750, delivered: 1695, opened: 612, clicked: 201 }
    ],
    topPerformers: [
        { subject: 'Welcome to Our Platform', openRate: 45.2, clickRate: 12.3, sent: 1200 },
        { subject: 'Monthly Newsletter - January', openRate: 38.7, clickRate: 8.9, sent: 2500 },
        { subject: 'Product Update Notification', openRate: 35.1, clickRate: 7.2, sent: 1800 },
        { subject: 'Special Offer - 50% Off', openRate: 42.8, clickRate: 15.6, sent: 950 },
        { subject: 'Password Reset Request', openRate: 28.3, clickRate: 5.1, sent: 3200 }
    ]
}

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('7d')
    const [filterType, setFilterType] = useState('all')

    const calculateRate = (numerator, denominator) => {
        return ((numerator / denominator) * 100).toFixed(1)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Track your email performance and engagement</p>
                </div>
                <div className="flex items-center space-x-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Delivery Rate</p>
                            <p className="text-2xl font-bold text-green-600 mt-1">
                                {calculateRate(analyticsData.overview.delivered, analyticsData.overview.totalSent)}%
                            </p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Mail className="w-6 h-6 text-green-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {analyticsData.overview.delivered.toLocaleString()} delivered
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Open Rate</p>
                            <p className="text-2xl font-bold text-blue-600 mt-1">
                                {calculateRate(analyticsData.overview.opened, analyticsData.overview.delivered)}%
                            </p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Eye className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {analyticsData.overview.opened.toLocaleString()} opens
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Click Rate</p>
                            <p className="text-2xl font-bold text-purple-600 mt-1">
                                {calculateRate(analyticsData.overview.clicked, analyticsData.overview.opened)}%
                            </p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <MousePointer className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {analyticsData.overview.clicked.toLocaleString()} clicks
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Bounce Rate</p>
                            <p className="text-2xl font-bold text-red-600 mt-1">
                                {calculateRate(analyticsData.overview.bounced, analyticsData.overview.totalSent)}%
                            </p>
                        </div>
                        <div className="bg-red-100 p-3 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {analyticsData.overview.bounced.toLocaleString()} bounces
                    </p>
                </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Email Performance Trends</h3>
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-500" />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Metrics</option>
                            <option value="sent">Sent</option>
                            <option value="delivered">Delivered</option>
                            <option value="opened">Opened</option>
                            <option value="clicked">Clicked</option>
                        </select>
                    </div>
                </div>

                {/* Simple Chart */}
                <div className="h-64 flex items-end justify-between space-x-2">
                    {analyticsData.timeSeriesData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                            <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                                <div
                                    className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full"
                                    style={{ height: `${(data.sent / 2000) * 100}%` }}
                                ></div>
                                <div
                                    className="bg-green-500 rounded-t-lg absolute bottom-0 w-full opacity-75"
                                    style={{ height: `${(data.delivered / 2000) * 100}%` }}
                                ></div>
                                <div
                                    className="bg-purple-500 rounded-t-lg absolute bottom-0 w-full opacity-50"
                                    style={{ height: `${(data.opened / 2000) * 100}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-6 mt-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Sent</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Delivered</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Opened</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Clicked</span>
                    </div>
                </div>
            </div>

            {/* Top Performing Emails */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Top Performing Emails</h3>
                    <p className="text-sm text-gray-500 mt-1">Best performing emails by engagement</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sent
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Open Rate
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Click Rate
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Performance
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {analyticsData.topPerformers.map((email, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{email.subject}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {email.sent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${email.openRate}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">{email.openRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-purple-500 h-2 rounded-full"
                                                    style={{ width: `${email.clickRate}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">{email.clickRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                            <span className="text-sm text-green-600 font-medium">Excellent</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}