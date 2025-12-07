import { Heart, LucideIcon, Package, TrendingUp, Users } from "lucide-react";
import type { InventoryItem } from "@/app/components/atoms/inventory-status-card/inventory-status-card";
import { StatusLevels } from "@/app/shared/enums";
import type { Event } from "@/app/shared/types";

/**
 * Represents the structure of a mock statistical card component.
 * 
 * @typedef {Object} StatCardMock
 * @property {string} title - The title or label displayed on the stat card
 * @property {string} value - The primary numerical or text value to display
 * @property {string} change - The change in value (typically a percentage or absolute number)
 * @property {"up" | "down"} trend - The direction of the trend indicator
 * @property {"rose" | "blue" | "green" | "purple"} color - The color theme of the card
 * @property {LucideIcon} icon - The Lucide icon component to display on the card
 * @property {string} [iconLabel] - Optional accessibility label for the icon
 */
export type StatCardMock = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: "rose" | "blue" | "green" | "purple";
  icon: LucideIcon;
  iconLabel?: string;
};

/**
 * Mock data for stat cards shown on the overview dashboard.
 */
export const mockStatCards: StatCardMock[] = [
  {
    title: "Total Donations",
    value: "$42,350",
    change: "+12.5%",
    trend: "up",
    icon: Heart,
    color: "rose",
    iconLabel: "Donations",
  },
  {
    title: "Meals Distributed",
    value: "8,432",
    change: "+8.2%",
    trend: "up",
    icon: Package,
    color: "blue",
    iconLabel: "Meals distributed",
  },
  {
    title: "Active Volunteers",
    value: "156",
    change: "+23",
    trend: "up",
    icon: Users,
    color: "green",
    iconLabel: "Active volunteers",
  },
  {
    title: "Families Served",
    value: "1,247",
    change: "+5.8%",
    trend: "up",
    icon: TrendingUp,
    color: "purple",
    iconLabel: "Families served",
  },
];

/**
 * Mock data for inventory items displayed in the inventory status bar.
 */
export const mockInventoryItems: InventoryItem[] = [
  { id: 1, category: "Canned Goods", current: 240, target: 300, unit: "kg", status: StatusLevels.MEDIUM },
  { id: 2, category: "Proteins", current: 156, target: 200, unit: "kg", status: StatusLevels.LOW },
  { id: 3, category: "Grains & Pasta", current: 89, target: 150, unit: "kg", status: StatusLevels.LOW },
  { id: 4, category: "Dairy Products", current: 45, target: 100, unit: "liters", status: StatusLevels.MEDIUM },
];

/**
 * Mock data for upcoming events displayed in the UpcomingEvents component.
 */
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Community Food Drive",
    date: "2025-12-05T09:00:00.000Z",
    time: "9:00 AM - 2:00 PM",
    location: "Central Community Center",
    volunteers: 24,
  },
  {
    id: "2",
    title: "Holiday Meal Distribution",
    date: "2025-12-10T10:00:00.000Z",
    time: "10:00 AM - 4:00 PM",
    location: "Main Food Bank Facility",
    volunteers: 45,
  },
  {
    id: "3",
    title: "Mobile Pantry - North District",
    date: "2025-12-12T11:00:00.000Z",
    time: "11:00 AM - 3:00 PM",
    location: "North Park",
    volunteers: 18,
  },
  {
    id: "4",
    title: "Mobile Pantry - Town Center",
    date: "2025-12-13T11:00:00.000Z",
    time: "11:00 AM - 3:00 PM",
    location: "Town Center",
    electedVolunteer: "John Doe",
  },
  {
    id: "5",
    title: "Volunteer Training Session",
    date: "2025-12-12T18:00:00.000Z",
    time: "6:00 PM - 8:00 PM",
    location: "Food Bank Office",
    volunteers: 12,
  },
];
