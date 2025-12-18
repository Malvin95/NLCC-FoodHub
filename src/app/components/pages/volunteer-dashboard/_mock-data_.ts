import { TrendingUp, Users } from "lucide-react";
import { StatCardProps } from "../../atoms/stat-card/stat-card";


export const mockStatCardData: StatCardProps[] = [
    {       
        title: "Active Volunteers",
        value: "156",
        change: "+23",
        trend: "up",
        icon: Users,
        color: "green",
    },
    {   
        title: "Hours This Month",
        value: "1,240",
        change: "+15%",
        trend: "up",
        icon: TrendingUp,
        color: "blue",
    },
    {
        title: "New Signups",
        value: "23",
        change: "+8",
        trend: "up",
        icon: Users,
        color: "purple",
    }
]