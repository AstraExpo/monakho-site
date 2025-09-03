import { Timestamp } from "firebase/firestore";
import { FieldValue } from "firebase-admin/firestore";

/**
 * 🎯 Event Categories, Venue Types, Recurrence, Status
 */
export const CATEGORIES = [
  "Prayer Meeting",
  "Live Recording",
  "Worship Practice",
  "Livestream Worship",
  "Bible Study",
  "Outreach",
  "Conference",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const VENUE_TYPES = ["Physical", "Online", "Hybrid"] as const;
export type VenueType = (typeof VENUE_TYPES)[number];

export const RECURRENCE_TYPES = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
] as const;
export type RecurrenceType = (typeof RECURRENCE_TYPES)[number];

export const EVENT_STATUSES = ["Draft", "Published", "Cancelled"] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

/**
 * 1. The full Event as stored/retrieved from the database
 */
export interface BaseEvent {
  id: string;
  title: string;
  description: string;
  category: Category;
  posterUrl?: string;

  date: string; // ISO date string e.g. "2025-08-19"
  time: string; // "HH:mm"

  isPublic: boolean;
  isRecurring: boolean;
  recurrenceType?: RecurrenceType | null;
  recurrenceEndDate?: string | null; // still string for frontend ease

  maxAttendees: number | null;
  attendees: number;

  venueType: VenueType;
  venueName?: string | null;
  venueUrl?: string | null;

  status: EventStatus;

  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  createdBy: string;
  updatedBy: string;
}

/**
 * 2. Data needed to create a new event
 *    (what your form/backend expects)
 */
export type CreateEventInput = Omit<
  BaseEvent,
  "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy" | "attendees"
> & {
  attendees?: number; // optional for create
};

/**
 * 3. Data used to update an existing event
 *    (all fields optional for partial updates)
 */
export type UpdateEventInput = Partial<CreateEventInput>;

/**
 * (Optional) Alias for form handling
 */
export type EventFormData = CreateEventInput;

export function normalizeDate(
  value: Timestamp | Date | string | null | undefined
): string {
  if (!value) return "";

  let d: Date;

  if (value instanceof Timestamp) {
    d = value.toDate();
  } else if (value instanceof Date) {
    d = value;
  } else if (typeof value === "string") {
    // Try to parse; fall back to empty if invalid
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) return "";
    d = parsed;
  } else {
    return "";
  }

  return d.toISOString().split("T")[0];
}

export function mapEventDoc(id: string, data: BaseEvent): BaseEvent {
  return {
    id,
    title: data.title,
    description: data.description,
    category: data.category,
    posterUrl: data.posterUrl,

    date: normalizeDate(data.date),
    time: data.time,

    isPublic: data.isPublic,
    isRecurring: data.isRecurring,
    recurrenceType: data.recurrenceType ?? undefined,
    recurrenceEndDate: normalizeDate(data.recurrenceEndDate),

    maxAttendees: data.maxAttendees ?? 0,
    attendees: data.attendees ?? 0,

    venueType: data.venueType,
    venueName: data.venueName,
    venueUrl: data.venueUrl,

    status: data.status,

    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    createdBy: data.createdBy,
    updatedBy: data.updatedBy,
  };
}
