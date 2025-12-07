import { EngagementRequestStatus, EngagementRequestType } from "@/app/shared/enums";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";

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
        <div>
          detailed Engagement Dashboard Content will go here
        </div>
    </DashboardPageTemplate>
  );
}
