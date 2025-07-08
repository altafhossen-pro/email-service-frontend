import { ArrowRight } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Powerful Email Service
                        <span className="text-blue-600 block">Made Simple</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Send emails reliably with our Email-as-a-Service platform. Use your own SMTP or our managed service with automatic fallbacks for maximum delivery success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                            Start Free Trial
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;