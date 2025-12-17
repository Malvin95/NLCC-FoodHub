import { View } from "./enums";


export type MenuItem = {
    id: View;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export type EngagementConfig = {
  label: string; 
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  color: string;
};

export type EngagementStatusConfig = {
  label: string; 
  color: string;
};

/**
 * Represents a single event with details for volunteer coordination.
 * 
 * @interface Event
 * @property {string} id - Unique identifier for the event.
 * @property {string} title - Title or name of the event.
 * @property {string} date - Event date (e.g., "Dec 15, 2025").
 * @property {string} time - Event time (e.g., "10:00 AM").
 * @property {string} location - Physical location or address of the event.
 * @property {number} volunteers - Optional number of volunteers registered for the event.
 * @property {string} electedVolunteer - Optional name of the elected volunteer for the event.
 */
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  volunteers?: number;
  electedVolunteer?: string;
}