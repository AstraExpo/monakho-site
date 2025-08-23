import { Timestamp } from "firebase/firestore";
import { admin } from "../server/firebase-admin";

/**
 * 🎯 Shared Event Types for Client + Server
 * These types define the shape of events across your system.
 */

/**
 * Base event type used in the frontend (client-side).
 * Dates are strings here for easy form handling & JSON transport.
 */
export interface BaseEvent {
  id: string;
  title: string;
  description: string;
  category: Category;
  posterUrl?: string;

  date: string; // ISO date string, e.g. "2025-08-19"
  time: string; // "HH:mm" format

  isPublic: boolean;
  isRecurring: boolean;
  recurrenceType?: RecurrenceType; // optional for one-time events
  recurrenceEndDate?: string | null; // ISO string or null

  maxAttendees: number;
  attendees: number;

  venueType: VenueType;
  venueName?: string | null;
  venueUrl?: string | null;

  status: EventStatus;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * ✅ Union types for safety
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

export const VENUE_TYPES = ["Physical", "Online", "Hybrid"] as const; // Added "Hybrid" consistently
export type VenueType = (typeof VENUE_TYPES)[number];

export const RECURRENCE_TYPES = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
] as const; // Added "Yearly" for completeness
export type RecurrenceType = (typeof RECURRENCE_TYPES)[number];

export const EVENT_STATUSES = ["Draft", "Published", "Cancelled"] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

/**
 * 📥 Incoming request payload when creating an event
 */
export interface EventCreateRequest {
  title: string;
  description: string;
  date: string; // ISO date string
  time: string; // "HH:mm"

  venueType: VenueType;
  venueName?: string;
  venueUrl?: string;

  category: Category;
  status?: EventStatus;

  isPublic?: boolean;
  attendees?: number;
  maxAttendees?: number | null;

  isRecurring?: boolean;
  recurrenceType?: RecurrenceType;
  recurrenceEndDate?: string;
  posterUrl?: string; 
}

/**
 * 📦 Firestore document structure
 * Uses `Timestamp` for date fields (Firestore native).
 */
export interface EventDocument {
  title: string;
  description: string;
  date: Timestamp | Date | string;
  time: string;

  venueType: VenueType;
  venueName: string | null;
  venueUrl: string | null;

  category: Category;
  status: EventStatus;
  posterUrl?: string; 

  isPublic: boolean;
  attendees: number;
  maxAttendees: number | null;

  isRecurring: boolean;
  recurrenceType: RecurrenceType | null;
  recurrenceEndDate: Timestamp | null;

  createdAt: Timestamp | admin.firestore.FieldValue;
  updatedAt: Timestamp | admin.firestore.FieldValue;
  createdBy: string;
}

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

export function mapEventDoc(id: string, data: EventDocument): BaseEvent {
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

    createdAt: (data.createdAt as Timestamp).toDate(),
    updatedAt: (data.updatedAt as Timestamp).toDate(),
    createdBy: data.createdBy,
  };
}