"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/server/firebase";

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const q = query(collection(db, "events"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(list);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const now = new Date();

  // Removed the `.isPublic` filter here
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { upcomingEvents, pastEvents, isLoading, error };
}
