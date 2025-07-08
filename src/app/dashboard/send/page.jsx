'use client'

import { useState } from 'react'
import { Send, Save, Eye, Paperclip, Plus, X } from 'lucide-react'

export default function SendEmailPage() {
    const [formData, setFormData] = useState({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        template: 'none'
    })
    const [showCcBcc, setShowCcBcc] = useState(false)
    const [attachments, setAttachments] = useState([])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSendEmail = () => {
        // Handle email sending logic here
        console.log('Sending email:', formData)
    }

    const handleSaveDraft = () => {
        // Handle save draft logic here
        console.log('Saving draft:', formData)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-semibold text-gray-900">Compose Email</h1>
                    <p className="text-sm text-gray-500 mt-1">Create and send a new email</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Template Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Template
                        </label>
                        <select
                            name="template"
                            value={formData.template}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="none">No Template</option>
                            <option value="welcome">Welcome Email</option>
                            <option value="newsletter">Newsletter</option>
                            <option value="promotional">Promotional</option>
                        </select>
                    </div>

                    {/* Recipients */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            To *
                        </label>
                        <input
                            type="email"
                            name="to"
                            value={formData.to}
                            onChange={handleInputChange}
                            placeholder="recipient@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* CC/BCC Toggle */}
                    {!showCcBcc && (
                        <button
                            onClick={() => setShowCcBcc(true)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            + Add CC/BCC
                        </button>
                    )}

                    {/* CC/BCC Fields */}
                    {showCcBcc && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CC
                                </label>
                                <input
                                    type="email"
                                    name="cc"
                                    value={formData.cc}
                                    onChange={handleInputChange}
                                    placeholder="cc@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    BCC
                                </label>
                                <input
                                    type="email"
                                    name="bcc"
                                    value={formData.bcc}
                                    onChange={handleInputChange}
                                    placeholder="bcc@example.com"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject *
                        </label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Enter email subject"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Email Body */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            name="body"
                            value={formData.body}
                            onChange={handleInputChange}
                            rows="12"
                            placeholder="Write your email message here..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            required
                        />
                    </div>

                    {/* Attachments */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attachments
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                            <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                                Drag and drop files here or{' '}
                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                    browse
                                </button>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Max file size: 25MB
                            </p>
                        </div>
                        {attachments.length > 0 && (
                            <div className="mt-3 space-y-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                        <span className="text-sm text-gray-600">{file.name}</span>
                                        <button className="text-red-600 hover:text-red-800">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleSendEmail}
                                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Send Email
                            </button>
                            <button
                                onClick={handleSaveDraft}
                                className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Draft
                            </button>
                        </div>
                        <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}