import { Globe, Mail, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
    const stats = [
        { icon: <Mail className="w-8 h-8 text-white" />, value: "10M+", label: "Emails Delivered" },
        { icon: <Users className="w-8 h-8 text-white" />, value: "5000+", label: "Happy Customers" },
        { icon: <TrendingUp className="w-8 h-8 text-white" />, value: "99.9%", label: "Uptime" },
        { icon: <Globe className="w-8 h-8 text-white" />, value: "50+", label: "Countries" }
    ];

    return (
        <section className="py-20 bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center text-white">
                            <div className="flex justify-center mb-4">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold mb-2">{stat.value}</div>
                            <div className="text-blue-100">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default StatsSection;
