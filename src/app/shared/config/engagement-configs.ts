/**
 * Centralized configuration mappings for engagement request types and statuses.
 *
 * This module provides strongly-typed, reusable configuration objects for rendering
 * engagement request cards and dashboard elements. Each type and status includes:
 * - Icon component (from lucide-react)
 * - Display label for UI rendering
 * - Tailwind color classes for light and dark modes
 *
 * Usage:
 * ```tsx
 * import { typeConfig, statusConfig } from '@/app/shared/config/engagement-configs';
 *
 * // In a component:
 * const IconComponent = typeConfig[request.type].icon;
 * const statusColor = statusConfig[request.status].color;
 * ```
 *
 * @module engagement-configs
 * @see {@link EngagementConfig} for type definitions
 * @see {@link EngagementStatusConfig} for status definitions
 * @see {@link EngagementRequestType} for available request types
 * @see {@link EngagementRequestStatus} for available statuses
 */

import { AlertCircle, CheckCircle, MessageCircle, User } from "lucide-react";
import { EngagementConfig, EngagementStatusConfig } from "../types";
import { EngagementRequestStatus, EngagementRequestType } from "../enums";

/**
 * Type configuration mapping: engagement request type → icon, label, and color classes.
 *
 * Maps each engagement type to its visual representation and styling for individual engagement cards.
 *
 * Note: This config includes only the four request types that can be assigned to individual cards.
 * The "All" filter label is defined separately in filter configuration, not here, because:
 * - "All" is a filter aggregation label, not a type that can be applied to an engagement card
 * - Individual cards must have one of the four concrete request types (HELP, VOLUNTEER, DONATION, QUESTION)
 * - Using typeConfig only for assignable types ensures type safety and clear semantics
 *
 * Properties:
 * - **label**: Human-readable type name for UI display
 * - **icon**: Lucide React icon component representing the type
 * - **color**: Tailwind classes for text color in light and dark modes (e.g., `text-red-600 dark:text-red-300`)
 *
 * Types covered:
 * - HELP: Emergency assistance and urgent support requests (red)
 * - VOLUNTEER: Volunteer opportunity postings (blue)
 * - DONATION: Food and resource donation offers (green)
 * - QUESTION: General inquiries and FAQ-style questions (purple)
 *
 * @constant
 * @type {Record<EngagementRequestType, EngagementConfig>}
 *
 * @example
 * ```tsx
 * const { label, icon: IconComponent, color } = typeConfig[EngagementRequestType.HELP];
 * // label: 'Help Request'
 * // IconComponent: AlertCircle
 * // color: 'text-red-600 dark:text-red-300'
 * ```
 *
 * @see {@link filterConfig} for "All" filter label and other filter-specific configurations
 */
export const typeConfig: Record<EngagementRequestType, EngagementConfig> = {
  [EngagementRequestType.HELP]: {
    label: "Help Request",
    icon: AlertCircle,
    color: "text-red-600 dark:text-red-300",
  },
  [EngagementRequestType.VOLUNTEER]: {
    label: "Volunteer Needed",
    icon: User,
    color: "text-blue-600 dark:text-blue-300",
  },
  [EngagementRequestType.DONATION]: {
    label: "Donation",
    icon: CheckCircle,
    color: "text-green-700 dark:text-green-400",
  },
  [EngagementRequestType.QUESTION]: {
    label: "Question",
    icon: MessageCircle,
    color: "text-purple-600 dark:text-purple-300",
  },
};

/**
 * Status configuration mapping: engagement status → badge color and label.
 *
 * Maps each engagement request status to its badge styling and display label.
 *
 * Properties:
 * - **label**: Human-readable status name for badge display
 * - **color**: Tailwind classes for background, text, and border colors in light and dark modes
 *   Format: `bg-* text-* border-* dark:bg-* dark:text-* dark:border-*`
 *
 * Statuses covered:
 * - URGENT: Requires immediate attention (red badge)
 * - OPEN: Available for responses (blue badge)
 * - IN_PROGRESS: Currently being addressed (amber/yellow badge)
 * - RESOLVED: Completed or answered (green badge)
 *
 * @constant
 * @type {Record<EngagementRequestStatus, EngagementStatusConfig>}
 *
 * @example
 * ```tsx
 * const { label, color } = statusConfig[EngagementRequestStatus.URGENT];
 * // label: 'Urgent'
 * // color: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800'
 * ```
 */
export const statusConfig: Record<
  EngagementRequestStatus,
  EngagementStatusConfig
> = {
  [EngagementRequestStatus.URGENT]: {
    label: "Urgent",
    color:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800",
  },
  [EngagementRequestStatus.OPEN]: {
    label: "Open",
    color:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800",
  },
  [EngagementRequestStatus.IN_PROGRESS]: {
    label: "In Progress",
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-amber-900 dark:text-amber-100 dark:border-amber-800",
  },
  [EngagementRequestStatus.RESOLVED]: {
    label: "Resolved",
    color:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800",
  },
};
