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
import { mockRequests } from "./_mock-data_";
import {
  EngagementRequestSortType,
  EngagementRequestStatus,
  EngagementRequestType,
} from "@/app/shared/enums";
import { useState } from "react";
import { statusConfig, typeConfig } from "@/app/shared/config";

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
  const [activeFilter, setActiveFilter] = useState<EngagementRequestSortType>(
    EngagementRequestSortType.ALL,
  );

  const [requests, setRequests] = useState<EngagementRequest[]>(mockRequests);

  const handleFilterChange = (value: string) => {
    setActiveFilter(value as EngagementRequestSortType);

    if (value === EngagementRequestSortType.ALL) {
      setRequests(mockRequests);
    } else {
      const filteredRequests = mockRequests.filter(
        (request) => request.type === value,
      );
      setRequests(filteredRequests);
    }
  };

  return (
    <DashboardPageTemplate
      title="Engagement Dashboard"
      description="Community requests, questions, and volunteer opportunities"
    >
      <div
        aria-label="Filter engagement requests"
        className="mt-4"
        role="toolbar"
      >
        <FilterBar
          activeTab={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      <section aria-label="Engagement requests" className="mt-8" role="feed">
        {requests.map((request) => {
          const typeConfigEntry = typeConfig[request.type];
          if (!typeConfigEntry) {
            // Unknown request type; skip rendering this entry to avoid runtime errors
            // TODO: consider logging a warning in development mode, and also think about a fallback UI
            return null;
          }

          const IconComponent = typeConfigEntry.icon;
          const typeColor = typeConfigEntry.color;

          return (
            <div key={request.id} className="mb-6" role="article">
              <EngagementCard
                configIcon={
                  <IconComponent
                    className={`w-5 h-5 ${typeColor}`}
                    aria-hidden="true"
                  />
                }
                configColor={typeColor}
                configLabel={typeConfig[request.type].label}
                statusColor={statusConfig[request.status].color}
                statusLabel={statusConfig[request.status].label}
                title={request.title}
                content={request.description}
                time={request.timestamp}
                author={request.author}
                responseCount={request.responses}
              />
            </div>
          );
        })}
      </section>
    </DashboardPageTemplate>
  );
}
