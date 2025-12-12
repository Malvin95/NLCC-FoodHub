/**
 * Filter label configurations for engagement request types
 * 
 * Maps EngagementRequestType enum values to human-readable labels
 * Used by FilterBar and related filter components throughout the app
 * 
 * @see {@link FilterBar} for usage example
 */

import { EngagementRequestType } from '../enums';

export const DEFAULT_FILTER_LABELS: Record<string, string> = {
  [EngagementRequestType.ALL]: 'All Requests',
  [EngagementRequestType.HELP]: 'Help Requests',
  [EngagementRequestType.VOLUNTEER]: 'Volunteers Needed',
  [EngagementRequestType.DONATION]: 'Donations',
  [EngagementRequestType.QUESTION]: 'Questions'
};

/**
 * Ordered list of filter types for consistent rendering
 * Useful for loops and map operations in filter components
 */
export const FILTER_TYPES = [
  EngagementRequestType.ALL,
  EngagementRequestType.HELP,
  EngagementRequestType.VOLUNTEER,
  EngagementRequestType.DONATION,
  EngagementRequestType.QUESTION
] as const;

/**
 * Get label for a filter type with fallback to default
 * 
 * @param filterType - The engagement request type
 * @param customLabels - Optional custom label overrides
 * @returns The label text for the filter type
 * 
 * @example
 * ```tsx
 * const label = getFilterLabel(EngagementRequestType.HELP, { Help: 'Need Help' });
 * // Returns: 'Need Help'
 * ```
 */
export function getFilterLabel(
  filterType: string,
  customLabels?: Record<string, string>
): string {
  return customLabels?.[filterType] ?? DEFAULT_FILTER_LABELS[filterType] ?? filterType;
}
