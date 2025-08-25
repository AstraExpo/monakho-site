import { ApiResponse } from "@/lib/types/api";
import {
  BaseEvent,
  CreateEventInput,
  UpdateEventInput,
} from "@/lib/types/events";

// DELETE an event
export async function deleteEvent(
  id: string
): Promise<ApiResponse<{ id: string }> | null> {
  try {
    if (!confirm("Are you sure you want to delete this event?")) return null;

    const res = await fetch(`/api/updateevent/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete event");

    return (await res.json()) as ApiResponse<{ id: string }>;
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Failed to delete event");
    return null;
  }
}

// UPDATE an event
export async function updateEvent(
  id: string,
  eventUpdate: UpdateEventInput
): Promise<ApiResponse<BaseEvent> | null> {
  try {
    const res = await fetch(`/api/updateevent/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventUpdate),
    });
    if (!res.ok) throw new Error("Failed to update event");

    return (await res.json()) as ApiResponse<BaseEvent>;
  } catch (error) {
    console.error("Error updating event:", error);
    alert("Failed to update event");
    return null;
  }
}

// GET an event
export async function getEvent(
  eventId: string
): Promise<ApiResponse<BaseEvent> | null> {
  try {
    const res = await fetch(`/api/updateevent/${eventId}`, { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch event");

    return (await res.json()) as ApiResponse<BaseEvent>;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

// CREATE an event
export async function createEvent(
  event: CreateEventInput
): Promise<ApiResponse<BaseEvent> | null> {
  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Failed to create event");

    return (await res.json()) as ApiResponse<BaseEvent>;
  } catch (error) {
    console.error("Error creating event:", error);
    alert("Failed to create event");
    return null;
  }
}
