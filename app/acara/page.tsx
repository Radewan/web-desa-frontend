import React from "react";
import { EventApi } from "../lib/api/event-api";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";

export interface IEvent {
  id: number;
  title: string;
  content: string;
  image_path: string;
  location: string;
  date: string; // format ISO string: "2025-07-03T00:00:00.000Z"
  time: string; // format ISO string: "1970-01-01T14:30:00.000Z"
  created_at: string;
  updated_at: string;
}

const AcaraPage = async () => {
  const response = await EventApi.getAll();
  const events: IEvent[] = await response.data;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Event Terbaru</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`./acara/${event.id}`}
            className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden group"
          >
            <div className="relative w-full h-48">
              <Image
                src={`http://localhost:8080/agenda/images/${event.image_path}`}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold group-hover:text-blue-600">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {event.content}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                📍 Lokasi: {event.location}
                <br />
                🗓️{" "}
                {format(new Date(event.date), "dd MMM yyyy", {
                  locale: id,
                })}
                <br />⏰{" "}
                {format(new Date(event.time), "HH:mm", {
                  locale: id,
                })}
              </p>
              <p className="text-blue-600 text-sm hover:underline">
                Baca selengkapnya →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AcaraPage;
