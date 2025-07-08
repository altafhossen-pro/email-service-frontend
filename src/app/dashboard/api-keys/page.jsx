'use client'

import { useState } from 'react'
import { Plus, Copy, Eye, EyeOff, Trash2, Edit, AlertCircle, CheckCircle } from 'lucide-react'

const initialApiKeys = [
    {
        id: 1,
        name: 'Production API Key',
        key: 'sk_live_4f8b2c1d9e3a7f6b5c8d2e1a9f4b7c3d',
        created: '2024-01-01',
        lastUsed: '2024-01-07',
        status: 'active',
        requests: 12847,
        limit: 50000
    },
    {
        id: 2,
        name: 'Development API Key',
        key: 'sk_test_2a9b8c7d6e5f4a3b2c1d9e8f7a6b5c4d',
        created: '2024-01-03',
        lastUsed: '2024-01-06',
        status: 'active',
        requests: 3456,
        limit: 10000
    },
    {
        id: 3,
        name: 'Staging API Key',
        key: 'sk_test_6f5e4d3c2b1a9f8e7d6c5b4a3f2e1d9c',
        created: '2024-01-05',
        lastUsed: 'Never',
        status: 'inactive',
        requests: 0,
        limit: 5000
    }
]

export default function ApiKeysPage() {
    const [apiKeys, setApiKeys] = useState(initialApiKeys)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [visibleKeys, setVisibleKeys] = useState({})
    const [copiedKey, setCopiedKey] = useState(null)
    const [newKeyName, setNewKeyName] = useState('')

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

    const handleCreateKey = () => {
        if (!newKeyName.trim()) return

        const newKey = {
            id: Date.now(),
            name: newKeyName,
            key: `sk_live_${Math.random().toString(36).substring(2, 34)}`,
            created: new Date().toISOString().split('T')[0],
            lastUsed: 'Never',
            status: 'active',
            requests: 0,
            limit: 10000
        }

        setApiKeys([...apiKeys, newKey])
        setNewKeyName('')
        setShowCreateModal(false)
    }

    const handleDeleteKey = (keyId) => {
        setApiKeys(apiKeys.filter(key => key.id !== keyId))
    }

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
                    Create API Key
                </button>
            </div>

            {/* API Keys List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Your API Keys</h3>
                    <p className="text-sm text-gray-500 mt-1">Keep your API keys secure and never share them publicly</p>
                </div>

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
                                            <span className="ml-2 text-gray-900">{apiKey.created}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Last used:</span>
                                            <span className="ml-2 text-gray-900">{apiKey.lastUsed}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Requests:</span>
                                            <span className="ml-2 text-gray-900">{apiKey.requests.toLocaleString()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Limit:</span>
                                            <span className="ml-2 text-gray-900">{apiKey.limit.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Usage Bar */}
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                            <span>Usage</span>
                                            <span>{((apiKey.requests / apiKey.limit) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${(apiKey.requests / apiKey.limit) * 100}%` }}
                                            ></div>
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

                    