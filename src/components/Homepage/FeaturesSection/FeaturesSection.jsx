import { BarChart3, Clock, Send, Shield, Users, Zap } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <Send className="w-8 h-8 text-blue-600" />,
            title: "Hybrid SMTP Solution",
            description: "Use your own SMTP credentials or our managed pool with automatic fallback for maximum reliability."
        },
        {
            icon: <Shield className="w-8 h-8 text-blue-600" />,
            title: "Secure & Encrypted",
            description: "All SMTP credentials are encrypted and stored securely. Enterprise-grade security for your peace of mind."
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
            title: "Advanced Analytics",
            description: "Track delivery rates, open rates, and engagement metrics with detailed analytics and reporting."
        },
        {
            icon: <Zap className="w-8 h-8 text-blue-600" />,
            title: "Lightning Fast API",
            description: "RESTful API with webhooks, bulk sending support, and rate limiting for optimal performance."
        },
        {
            icon: <Users className="w-8 h-8 text-blue-600" />,
            title: "Multi-User Support",
            description: "Team collaboration with role-based access control and individual API key management."
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-600" />,
            title: "Email Scheduling",
            description: "Schedule emails for optimal delivery times and automate your email campaigns."
        }
    ];

    return (
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything You Need to Send Emails
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive email delivery solution with powerful features for developers and businesses.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;