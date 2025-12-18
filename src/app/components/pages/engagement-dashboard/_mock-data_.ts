import {
  EngagementRequestStatus,
  EngagementRequestType,
} from "@/app/shared/enums";
import { EngagementRequest } from "./engagement-dashboard";

/**
 * Mock data for engagement requests displayed on the engagement dashboard.
 *
 * This dataset represents a variety of community engagement scenarios including
 * urgent help requests, volunteer opportunities, donation offers, and general
 * questions. Used for testing and demonstrating the engagement dashboard features.
 *
 * Request types covered:
 * - HELP: Emergency assistance and support requests
 * - VOLUNTEER: Opportunities for community volunteers
 * - DONATION: Food and resource donation offers
 * - QUESTION: General inquiries about programs and services
 *
 * Status types covered:
 * - URGENT: Requires immediate attention
 * - OPEN: Available for response
 * - IN_PROGRESS: Currently being addressed
 * - RESOLVED: Completed or answered
 *
 * @constant
 * @type {EngagementRequest[]}
 */
export const requests: EngagementRequest[] = [
  {
    id: 1,
    type: EngagementRequestType.HELP,
    title: "Emergency Food Request - Family of 5",
    description:
      "A family just arrived in the area and needs immediate food assistance. They have dietary restrictions (no dairy).",
    author: "Maria Rodriguez",
    timestamp: "30 minutes ago",
    status: EngagementRequestStatus.URGENT,
    responses: 3,
  },
  {
    id: 2,
    type: EngagementRequestType.VOLUNTEER,
    title: "Need drivers for Saturday delivery",
    description:
      "Looking for 4 volunteers with vehicles to help deliver food boxes to homebound seniors this Saturday, 9 AM - 1 PM.",
    author: "James Wilson",
    timestamp: "2 hours ago",
    status: EngagementRequestStatus.OPEN,
    responses: 7,
  },
  {
    id: 3,
    type: EngagementRequestType.DONATION,
    title: "Fresh produce available for pickup",
    description:
      "Local farm has surplus vegetables (carrots, lettuce, tomatoes) - approximately 200 lbs. Available for pickup today or tomorrow.",
    author: "Green Valley Farms",
    timestamp: "3 hours ago",
    status: EngagementRequestStatus.IN_PROGRESS,
    responses: 5,
  },
  {
    id: 4,
    type: EngagementRequestType.QUESTION,
    title: "Holiday meal program planning",
    description:
      "What are the requirements to participate in the holiday meal distribution program? Can families sign up in advance?",
    author: "Susan Chen",
    timestamp: "5 hours ago",
    status: EngagementRequestStatus.RESOLVED,
    responses: 12,
  },
  {
    id: 5,
    type: EngagementRequestType.HELP,
    title: "Transportation assistance needed",
    description:
      "Client in wheelchair needs help getting to the food bank. Does anyone know of accessible transportation options?",
    author: "David Thompson",
    timestamp: "6 hours ago",
    status: EngagementRequestStatus.OPEN,
    responses: 4,
  },
  {
    id: 6,
    type: EngagementRequestType.VOLUNTEER,
    title: "Inventory counting help - Wednesday evening",
    description:
      "Need 3-4 volunteers to help with monthly inventory count. Wednesday 5-7 PM. Great for first-time volunteers!",
    author: "Lisa Park",
    timestamp: "1 day ago",
    status: EngagementRequestStatus.IN_PROGRESS,
    responses: 9,
  },
  {
    id: 7,
    type: EngagementRequestType.DONATION,
    title: "Corporate donation coordination",
    description:
      "Tech company wants to do a canned food drive. Need someone to coordinate pickup and provide donation guidelines.",
    author: "Michael Brown",
    timestamp: "1 day ago",
    status: EngagementRequestStatus.OPEN,
    responses: 2,
  },
  {
    id: 8,
    type: EngagementRequestType.QUESTION,
    title: "Volunteer training schedule?",
    description:
      "I'm interested in becoming a regular volunteer. When is the next orientation/training session?",
    author: "Emma Johnson",
    timestamp: "2 days ago",
    status: EngagementRequestStatus.RESOLVED,
    responses: 6,
  },
];
