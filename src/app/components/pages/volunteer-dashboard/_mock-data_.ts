import { TrendingUp, Users } from "lucide-react";
import { StatCardProps } from "../../atoms/stat-card/stat-card";


export const mockStatCardData: StatCardProps[] = [
    {       
        title: "Active Volunteers",
        value: "156",
        change: "+23",
        trend: "up",
        icon: Users,
        iconLabel: "Volunteers icon",
        color: "green",
    },
    {   
        title: "Hours This Month",
        value: "1,240",
        change: "+15%",
        trend: "up",
        icon: TrendingUp,
        iconLabel: "Trending up icon",
        color: "blue",
    },
    {
        title: "New Signups",
        value: "23",
        change: "+8",
        trend: "up",
        icon: Users,
        iconLabel: "New signups icon",
        color: "purple",
    }
]
