import { Lock, Rocket, Target } from "lucide-react";

const AboutSection = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Why Choose EmailPro?
                        </h2>
                        <p className="text-lg text-gray-600 mb-6">
                            We built EmailPro to solve the common pain points of email delivery. Our hybrid approach combines the flexibility of using your own SMTP with the reliability of our managed service.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <Rocket className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Fast Integration</h3>
                                    <p className="text-gray-600">Simple REST API that takes minutes to integrate</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Target className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">High Deliverability</h3>
                                    <p className="text-gray-600">Smart routing and fallback mechanisms ensure delivery</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Lock className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Enterprise Security</h3>
                                    <p className="text-gray-600">Bank-level encryption and security standards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
                        <pre className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                            {`curl -X POST https://api.emailpro.com/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"to": "user@example.com", "subject": "Hello", "body": "World"}'`}
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
