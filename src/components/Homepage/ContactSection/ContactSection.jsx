import React from 'react';
import { MessageSquare, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button 
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Chat with us</h3>
              </div>
              <p className="text-gray-600 mb-4">Get instant help from our support team.</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">Start Chat →</button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Call us</h3>
              </div>
              <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri 9am-6pm EST</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Visit us</h3>
              </div>
              <p className="text-gray-600">
                123 Email Street<br />
                Tech City, TC 12345<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
