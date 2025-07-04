// app/dashboard-kontributor/events/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyEventsPage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    // Ganti ini dengan API untuk event kontributor
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Gagal ambil event:", error);
      }
    };

    fetchEvents();
  }, [router]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Event Saya</h2>
      <ul className="space-y-2">
        {events.map((event: any) => (
          <li key={event.id} className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
