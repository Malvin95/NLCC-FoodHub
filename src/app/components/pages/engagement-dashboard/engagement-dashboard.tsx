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
  [EngagementRequestType.HELP]: { label: 'Help Request', icon: AlertCircle, color: 'text-red-600 dark:text-red-300' },
  [EngagementRequestType.VOLUNTEER]: { label: 'Volunteer Needed', icon: User, color: 'text-blue-600 dark:text-blue-300' },
  [EngagementRequestType.DONATION]: { label: 'Donation', icon: CheckCircle, color: 'text-green-600 dark:text-green-300' },
  [EngagementRequestType.QUESTION]: { label: 'Question', icon: MessageCircle, color: 'text-purple-600 dark:text-purple-300' },
};

/**
 * Badge color/label mapping per engagement status
 */
const statusConfig: Record<string, EngagementStatusConfig> = {
  [EngagementRequestStatus.URGENT]: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800' },
  [EngagementRequestStatus.OPEN]: { label: 'Open', color: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800' },
  [EngagementRequestStatus.IN_PROGRESS]: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800' },
  [EngagementRequestStatus.RESOLVED]: { label: 'Resolved', color: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800' },
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
      <section aria-label="Filter engagement requests" className="mt-4">
        <FilterBar />
      </section>

      <section aria-label="Engagement requests" className="mt-8" role="list">
        {requests.map((request) => {
            const IconComponent = typeConfig[request.type].icon;
            const typeColor = typeConfig[request.type].color;

            return (
              <div key={request.id} className="mb-6" role="listitem">
                <EngagementCard 
                  configIcon={<IconComponent className={`w-5 h-5 ${typeColor}`} aria-hidden="true" />}
                  configColor={typeColor} 
                  configLabel={typeConfig[request.type].label} 
                  statusColor={statusConfig[request.status].color} 
                  statusLabel={statusConfig[request.status].label} 
                  title={request.title} 
                  content={request.description} 
                  time={request.timestamp} 
                  author={request.author}
                  responseCount={request.responses} />
              </div>
            )
          })
        }
      </section>
    </DashboardPageTemplate>
  );
}
