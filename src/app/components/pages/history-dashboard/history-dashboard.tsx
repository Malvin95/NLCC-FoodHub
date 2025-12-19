'use client';

import { useState } from "react";
import { Calendar } from "../../atoms/ui/calendar";
import DashboardPageTemplate from "../../templates/dashboard-page-template/dashboard-page-template";
import { Clock, Package, TrendingUp, Users } from "lucide-react";
import { CalendarMockData } from "./_mock-data_";

/**
 * Represents daily metrics tracked in the history dashboard.
 *
 * @interface DayMetrics
 * @property {string} date - ISO date string (e.g., "2025-12-19").
 * @property {number} volunteers - Number of volunteers active on this day.
 * @property {number} hours - Total volunteer hours worked.
 * @property {number} mealsDistributed - Number of meals distributed.
 * @property {number} familiesServed - Number of families served.
 * @property {string[]} activities - List of activity labels or descriptions.
 *
 * @note This interface is available for future use when metrics data is loaded
 * from an API or state management system.
 */
export interface DayMetrics {
  date: string;
  volunteers: number;
  hours: number;
  mealsDistributed: number;
  familiesServed: number;
  activities: string[];
}

/**
 * History Dashboard component.
 *
 * Displays a calendar interface for users to select a date and view corresponding
 * historical metrics (volunteers, hours, meals distributed, families served, activities).
 * The calendar highlights days with volunteer activity, and selecting a date displays
 * detailed metrics in a panel on the right.
 *
 * @component
 * @returns {JSX.Element} The rendered history dashboard page.
 *
 * @example
 * ```tsx
 * <HistoryDashboard />
 * ```
 */
export default function HistoryDashboard() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedDay, setSelectedDay] = useState<DayMetrics | null>(null);
    const metrics: {[key: string]: DayMetrics} = CalendarMockData;

    // Extract dates that have data for highlighting
    const highlightedDates = Object.keys(metrics).map(dateStr => new Date(dateStr));

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        const recordedMetrics = metrics[selectedDate?.toISOString().split('T')[0] || ''];
        if (recordedMetrics) {
            setSelectedDay(recordedMetrics);
        } else {
            setSelectedDay(null);
        }
    }


    return (
    <DashboardPageTemplate title="History Dashboard" description="View historical data and logs">
        {/* History dashboard content goes here */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="col-span-1 lg:col-span-2">
                <div className="w-full h-full">
                    {/* Calendar & Legend component */}
                    <Calendar 
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        highlightedDates={highlightedDates}
                        aria-label="History calendar"
                        aria-describedby="calendar-legend"
                        className="w-auto rounded-md border border-border bg-card p-3 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:shadow-md [--cell-size:auto] pt-10"
                    />
                    <div className="flex items-center mt-3" id="calendar-legend" aria-label="Calendar legend">
                        <p className="sr-only">Legend: Highlighted dates indicate volunteer days.</p>
                        <div className="flex items-center gap-2" role="list" aria-label="Legend items">
                            <div className="w-4 h-4 bg-(--highlight) border border-(--highlight-border) rounded" aria-hidden="true" />
                            <span className="text-sm text-muted-foreground" role="listitem">Volunteer Day</span>
                        </div>
                    </div>
                </div>
                
            </div>

            {/* Day Metrics Panel */}
            <div className="bg-card rounded-lg shadow-sm border border-border dark:border-slate-800 dark:bg-slate-950 p-6 col-span-1 lg:col-span-1 dark:shadow-md" role="region" aria-labelledby={selectedDay ? "day-metrics-heading" : "day-metrics-empty"}>
                {selectedDay ? (
            <>
              <h2 id="day-metrics-heading" className="text-foreground mb-4">
                {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </h2>

              {/* Metrics */}
              <dl className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg" aria-hidden="true">
                    <Users className="w-5 h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Volunteers</dt>
                    <dd className="text-foreground">{selectedDay.volunteers}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg" aria-hidden="true">
                    <Clock className="w-5 h-5 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Total Hours</dt>
                    <dd className="text-foreground">{selectedDay.hours}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg" aria-hidden="true">
                    <Package className="w-5 h-5 text-purple-600" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Meals Distributed</dt>
                    <dd className="text-foreground">{selectedDay.mealsDistributed}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-(--highlight) rounded-lg" aria-hidden="true">
                    <TrendingUp className="w-5 h-5 text-(--highlight-foreground)" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-sm">Families Served</dt>
                    <dd className="text-foreground">{selectedDay.familiesServed}</dd>
                  </div>
                </div>
              </dl>

              {/* Activities */}
              <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm mb-2">Activities</p>
                <ul className="flex flex-wrap gap-2" aria-label="Activities list">
                  {selectedDay.activities.map((activity, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 bg-accent text-foreground/90 rounded-full text-sm"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center" aria-live="polite" role="status" id="day-metrics-empty">
                    <Users className="w-12 h-12 text-muted-foreground mb-3" aria-hidden="true" />
                    <p className="text-muted-foreground">Select a highlighted day to view metrics</p>
                </div>
            )}
            </div>
        </div>
    </DashboardPageTemplate>
    );
}
