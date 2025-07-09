'use client'

import { useEffect, useState } from 'react'
import { Plus, Copy, Eye, EyeOff, Trash2, Edit, AlertCircle, CheckCircle } from 'lucide-react'
import { getCookie } from 'cookies-next'
import { useSelector } from 'react-redux'

export default function ApiKeysPage() {
    const { user, loading } = useSelector((state) => state.auth);
    const [apiKeys, setApiKeys] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [visibleKeys, setVisibleKeys] = useState({})
    const [copiedKey, setCopiedKey] = useState(null)
    const [newKeyName, setNewKeyName] = useState('');

    const toggleKeyVisibility = (keyId) => {
        setVisibleKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }))
    }

    const copyToClipboard = (key, keyId) => {
        navigator.clipboard.writeText(key)
        setCopiedKey(keyId)
        setTimeout(() => setCopiedKey(null), 2000)
    }

    const maskApiKey = (key) => {
        return key.substring(0, 8) + '...' + key.substring(key.length - 8)
    }

    const handleCreateKey = async () => {
        if (!newKeyName.trim()) return
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/api-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({ name: newKeyName, description: "New api key" })
        })
        const data = await response.json()
        if (!response.ok) {
            console.error('Error creating API key:', data)
            return
        }
        const result = data?.data;
        setApiKeys(prev => [...prev, result]);
        setNewKeyName('')
        setShowCreateModal(false)
    }

    const handleDeleteKey = async (keyId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/api-keys/${keyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            })
            
            if (response.ok) {
                setApiKeys(apiKeys.filter(key => key.id !== keyId))
            } else {
                console.error('Error deleting API key')
            }
        } catch (error) {
            console.error('Error deleting API key:', error)
        }
    }

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/api-keys`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${getCookie('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setApiKeys(data.data)
                }
            })
            .catch(error => {
                console.error('Error fetching API keys:', error)
            })
    }, [])

    const getStatusBadge = (status) => {
        if (status === 'active') {
            return (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Active
                </span>
            )
        }
        return (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                Inactive
            </span>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getLastUsed = (apiKey) => {
        if (apiKey.usage?.totalRequests > 0) {
            return formatDate(apiKey.updatedAt)
        }
        return 'Never'
    }

    const calculateUsagePercentage = (apiKey) => {
        const dailyLimit = apiKey.restrictions?.maxEmailsPerDay || 50
        const totalEmails = apiKey.usage?.totalEmails || 0
        return Math.min((totalEmails / dailyLimit) * 100, 100)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">API Keys</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your API keys for email sending</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New API Key
                </button>
            </div>

            {/* API Keys List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Your API Keys</h3>
                    <p className="text-sm text-gray-500 mt-1">Keep your API keys secure and never share them publicly</p>
                </div>

                {
                    apiKeys.length === 0 && (
                        <div className="p-6 text-center">
                            <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-gray-900">No API Keys</h4>
                            <p className="text-sm text-gray-500 mt-1">You haven't created any API keys yet. Click the button above to create one.</p>
                        </div>
                    )
                }
                {
                    apiKeys.length > 0 && (
                        <div className="divide-y divide-gray-200">
                            {apiKeys.map((apiKey) => (
                                <div key={apiKey.id} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <h4 className="text-lg font-medium text-gray-900">{apiKey.name}</h4>
                                                {getStatusBadge(apiKey.status)}
                                            </div>

                                            <div className="mt-2 flex items-center space-x-2">
                                                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                                                    {visibleKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                                                </code>
                                                <button
                                                    onClick={() => toggleKeyVisibility(apiKey.id)}
                                                    className="p-1 text-gray-500 hover:text-gray-700"
                                                >
                                                    {visibleKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                                                    className="p-1 text-gray-500 hover:text-gray-700"
                                                >
                                                    {copiedKey === apiKey.id ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                                </button>
                                            </div>

                                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Created:</span>
                                                    <span className="ml-2 text-gray-900">{formatDate(apiKey.createdAt)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Last used:</span>
                                                    <span className="ml-2 text-gray-900">{getLastUsed(apiKey)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Total Emails:</span>
                                                    <span className="ml-2 text-gray-900">{apiKey.usage?.totalEmails || 0}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Daily Limit:</span>
                                                    <span className="ml-2 text-gray-900">{apiKey.restrictions?.maxEmailsPerDay || 50}</span>
                                                </div>
                                            </div>

                                            {/* Usage Bar */}
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                                    <span>Daily Email Usage</span>
                                                    <span>{calculateUsagePercentage(apiKey).toFixed(1)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full"
                                                        style={{ width: `${calculateUsagePercentage(apiKey)}%` }}
                                                    ></div>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    {apiKey.usage?.totalEmails || 0} of {apiKey.restrictions?.maxEmailsPerDay || 50} daily emails used
                                                </div>
                                            </div>

                                            {/* Permissions */}
                                            <div className="mt-3">
                                                <span className="text-sm text-gray-500">Permissions:</span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {apiKey.permissions?.map((permission, index) => (
                                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                                            {permission}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-6">
                                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteKey(apiKey.id)}
                                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>

            {/* Create API Key Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New API Key</h3>
                        <input
                            type="text"
                            placeholder="API Key Name"
                            value={newKeyName}
                            onChange={(e) => setNewKeyName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateKey}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Create Key
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}