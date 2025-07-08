import EmailChart from "@/components/Dashboard/EmailChart/EmailChart";
import QuickActions from "@/components/Dashboard/QuickActions/QuickActions";
import RecentEmails from "@/components/Dashboard/RecentEmails/RecentEmails";
import StatsCards from "@/components/Dashboard/StatsCards/StatsCards";


export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCards />

            {/* Charts and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <EmailChart />
                </div>
                <div className="lg:col-span-1">
                    <QuickActions />
                </div>
            </div>

            {/* Recent Emails */}
            <RecentEmails />
        </div>
    )
}