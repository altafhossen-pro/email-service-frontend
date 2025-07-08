'use client'

import { useState } from 'react'
import { Calendar, TrendingUp } from 'lucide-react'

const chartData = [
    { date: '2024-01-01', sent: 450, delivered: 420, bounced: 30 },
    { date: '2024-01-02', sent: 380, delivered: 360, bounced: 20 },
    { date: '2024-01-03', sent: 520, delivered: 495, bounced: 25 },
    { date: '2024-01-04', sent: 630, delivered: 595, bounced: 35 },
    { date: '2024-01-05', sent: 890, delivered: 845, bounced: 45 },
    { date: '2024-01-06', sent: 760, delivered: 720, bounced: 40 },
    { date: '2024-01-07', sent: 940, delivered: 895, bounced: 45 },
]

export default function EmailChart() {
    const [timeRange, setTimeRange] = useState('7d')

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email Performance</h3>
                    <p className="text-sm text-gray-500">Track your email sending metrics</p>
                </div>
                <div className="flex items-center space-x-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Simple Chart Representation */}
            <div className="h-64 flex items-end justify-between space-x-2">
                {chartData.map((data, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-100 rounded-t-lg relative" style={{ height: '200px' }}>
                            <div
                                className="bg-blue-500 rounded-t-lg absolute bottom-0 w-full"
                                style={{ height: `${(data.sent / 1000) * 100}%` }}
                            ></div>
                            <div
                                className="bg-green-500 rounded-t-lg absolute bottom-0 w-full opacity-75"
                                style={{ height: `${(data.delivered / 1000) * 100}%` }}
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
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Bounced</span>
                </div>
            </div>
        </div>
    )
}