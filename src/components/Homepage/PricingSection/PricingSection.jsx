import { CheckCircle } from "lucide-react";

const PricingSection = () => {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            features: [
                "50 emails/day",
                "1 SMTP connection",
                "Basic API access",
                "Simple templates",
                "Email support"
            ],
            popular: false
        },
        {
            name: "Starter",
            price: "$5",
            period: "month",
            features: [
                "500 emails/day",
                "Multiple SMTP support",
                "Email scheduling",
                "Basic analytics",
                "Priority support"
            ],
            popular: true
        },
        {
            name: "Professional",
            price: "$20",
            period: "month",
            features: [
                "2000+ emails/day",
                "Email tracking",
                "A/B testing",
                "Advanced analytics",
                "24/7 support"
            ],
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that fits your needs. Start free and scale as you grow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div key={index} className={`bg-white rounded-xl shadow-lg p-8 relative ${plan.popular ? 'border-2 border-blue-600' : ''}`}>
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-600">/{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}>
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;