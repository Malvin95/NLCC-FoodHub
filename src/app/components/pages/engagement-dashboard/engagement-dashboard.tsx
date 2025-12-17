/**
 * Engagement Dashboard page component
 *
 * Renders the engagement dashboard with filter controls and a list of engagement cards
 * backed by mock data. Configures icon/color mapping for each engagement type and status.
 *
 * Layout:
 * - Header/description provided by DashboardPageTemplate
 * - FilterBar for request type filtering
 * - Engagement cards rendered from mock requests
 *
 * @file engagement-dashboard.tsx
 */
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import FilterBar from "../../molecules/filter-bar/filter-bar";
import EngagementCard from "../../atoms/engagement-card/engagement-card";
import { requests } from "./_mock-data_";
import { EngagementRequestStatus, EngagementRequestType } from "@/app/shared/enums";
import { AlertCircle, CheckCircle, MessageCircle, User } from "lucide-react";
import { EngagementConfig, EngagementStatusConfig } from "@/app/shared/types";

/**
 * Icon/label/color mapping per engagement request type
 */
const typeConfig: Record<string, EngagementConfig> = {
  [EngagementRequestType.HELP]: { label: 'Help Request', icon: AlertCircle, color: 'text-red-600' },
  [EngagementRequestType.VOLUNTEER]: { label: 'Volunteer Needed', icon: User, color: 'text-blue-600' },
  [EngagementRequestType.DONATION]: { label: 'Donation', icon: CheckCircle, color: 'text-green-600' },
  [EngagementRequestType.QUESTION]: { label: 'Question', icon: MessageCircle, color: 'text-purple-600' },
};

/**
 * Badge color/label mapping per engagement status
 */
const statusConfig: Record<string, EngagementStatusConfig> = {
  [EngagementRequestStatus.URGENT]: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200' },
  [EngagementRequestStatus.OPEN]: { label: 'Open', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  [EngagementRequestStatus.IN_PROGRESS]: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  [EngagementRequestStatus.RESOLVED]: { label: 'Resolved', color: 'bg-green-100 text-green-700 border-green-200' },
};

export interface EngagementRequest {
  id: number;
  type: EngagementRequestType;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  status: EngagementRequestStatus;
  responses: number;
}

export default function EngagementDashboard() {
  return (
    <DashboardPageTemplate
      title="Engagement Dashboard"
      description="Community requests, questions, and volunteer opportunities"
    >
      <FilterBar />
      <div className="mt-8">
        {/* Engagement request cards will be rendered here */}
        {requests.map((request, ind) => {
            const IconComponent = typeConfig[request.type].icon;
          
            return (
              <div key={ind} className="mb-6">
                {/* Replace with EngagementCard component when available */}
                <EngagementCard 
                  configIcon={<IconComponent className={`w-5 h-5 ${typeConfig[request.type].color}`} />}
                  configColor={typeConfig[request.type].color} 
                  configLabel={typeConfig[request.type].label} 
                  statusColor={statusConfig[request.status].color} 
                  statusLabel={statusConfig[request.status].label} 
                  title={request.title} 
                  content={request.description} 
                  time={request.timestamp} 
                  responseCount={request.responses} />
              </div>
            )
          })
        }
      </div>
    </DashboardPageTemplate>
  );
}
