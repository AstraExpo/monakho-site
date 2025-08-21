import { BaseEvent } from "@/lib/types/events";

export async function deleteEvent(id: string) {
  if (!confirm("Are you sure you want to delete this event?")) return;

  const res = await fetch(`/api/updateevent/${id}`, { method: "DELETE" });
  if (!res.ok) {
    alert("Failed to delete event");
  }
}

export async function updateEvent(id: string, updates: BaseEvent) {
  const res = await fetch(`/api/updateevent/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    alert("Failed to update event");
  }
}
