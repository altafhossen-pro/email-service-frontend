'use client';
import React from 'react';
import {
    Mail,
    Send,
    TrendingUp,
    Users,
    Calendar,
    Settings,
    Plus,
    Activity,
    Database,
    Key,
    Globe,
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Dashboard() {
    // Mock user data - replace with actual Redux data
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getUsagePercentage = (used, total) => {
        return total > 0 ? Math.min((used / total) * 100, 100) : 0;
    };

    const quickActions = [
        { icon: Plus, label: "Send Email", primary: true },
        { icon: Mail, label: "Create Template" },
        { icon: Key, label: "Generate API Key" },
        { icon: Settings, label: "Settings" }
    ];
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            {
                user?.email && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-4">

                    {/* Header */}
                    <div className="mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Dashboard</h1>
                                    <p className="text-gray-600">Welcome back, {user.name}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                                    <div className="flex items-center space-x-2">
                                        {user.isEmailVerified ? (
                                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                                        ) : (
                                            <AlertCircle className="h-5 w-5 text-amber-500" />
                                        )}
                                        <span className="text-sm text-gray-600">
                                            {user.isEmailVerified ? 'Verified' : 'Unverified'}
                                        </span>
                                    </div>
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        {user.subscription.plan.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-14 w-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Mail className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">
                                        {user?.usageStats?.daily.emailsSent}
                                    </p>
                                    <p className="text-sm text-gray-500">Daily Emails</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Usage</span>
                                    <span>{user.subscription?.features?.dailyEmails} limit</span>
                                </div>
                                <div className="bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${getUsagePercentage(user?.usageStats?.daily?.emailsSent, user.subscription?.features?.dailyEmails)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-14 w-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <TrendingUp className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">
                                        {user.usageStats.monthly.emailsSent}
                                    </p>
                                    <p className="text-sm text-gray-500">Monthly Emails</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                    <span>Usage</span>
                                    <span>{user.subscription.features.monthlyEmails} limit</span>
                                </div>
                                <div className="bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${getUsagePercentage(user.usageStats.monthly.emailsSent, user.subscription.features.monthlyEmails)}%`
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-14 w-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Activity className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">
                                        {user.usageStats.monthly.apiCalls}
                                    </p>
                                    <p className="text-sm text-gray-500">API Calls</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">This month</p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-14 w-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Database className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-900">
                                        {user.usageStats.lifetime.totalEmails}
                                    </p>
                                    <p className="text-sm text-gray-500">Total Emails</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Lifetime</p>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                        {/* Subscription Info */}
                        <div className="lg:col-span-2">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Subscription Overview</h3>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                                                <Calendar className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Current Plan</p>
                                                <p className="text-sm text-gray-600">
                                                    {user.subscription.plan.toUpperCase()} - {user.subscription.status}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-gray-900">
                                                ${user.subscription.price}
                                            </p>
                                            <p className="text-sm text-gray-600">/{user.subscription.billingCycle}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                                <Clock className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Renewal Date</p>
                                                <p className="text-sm text-gray-600">
                                                    {formatDate(user.subscription.renewalDate)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Mail className="h-5 w-5 text-blue-600" />
                                                <span className="font-semibold text-gray-900">Email Templates</span>
                                            </div>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {user.subscription.features.emailTemplates}
                                            </p>
                                        </div>
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Key className="h-5 w-5 text-purple-600" />
                                                <span className="font-semibold text-gray-900">API Keys</span>
                                            </div>
                                            <p className="text-2xl font-bold text-purple-600">
                                                {user.subscription.features.apiKeys}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                            <div className="space-y-3">
                                {quickActions.map((action, index) => (
                                    <button
                                        key={index}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${action.primary
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <action.icon className="h-5 w-5" />
                                            <span className="font-medium">{action.label}</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Email Breakdown & Security */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Email Breakdown */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Email Breakdown</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                                        <span className="font-medium text-gray-900">Bulk Emails</span>
                                    </div>
                                    <span className="text-xl font-bold text-blue-600">
                                        {user.usageStats.breakdown.bulkEmails}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-4 w-4 bg-emerald-500 rounded-full"></div>
                                        <span className="font-medium text-gray-900">Individual Emails</span>
                                    </div>
                                    <span className="text-xl font-bold text-emerald-600">
                                        {user.usageStats.breakdown.individualEmails}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-4 w-4 bg-purple-500 rounded-full"></div>
                                        <span className="font-medium text-gray-900">Scheduled Emails</span>
                                    </div>
                                    <span className="text-xl font-bold text-purple-600">
                                        {user.usageStats.breakdown.scheduledEmails}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Security Status */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Security Status</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-900">Two-Factor Auth</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.preferences.security.twoFactorAuth.enabled
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.preferences.security.twoFactorAuth.enabled ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                            <Globe className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-900">Login Notifications</span>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.preferences.security.loginNotifications
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {user.preferences.security.loginNotifications ? 'Enabled' : 'Disabled'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="font-medium text-gray-900">Session Timeout</span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">
                                        {Math.round(user.preferences.security.sessionTimeout / 60000)} min
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}