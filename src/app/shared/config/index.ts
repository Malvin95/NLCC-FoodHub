/**
 * Centralized export of all shared configuration
 * 
 * Re-exports configuration from various config modules for easier imports
 * across the application
 * 
 * @example
 * ```tsx
 * import { DEFAULT_FILTER_LABELS, FILTER_TYPES } from '@/app/shared/config';
 * ```
 */

export { DEFAULT_FILTER_LABELS, FILTER_TYPES, getFilterLabel } from './filter-labels';
