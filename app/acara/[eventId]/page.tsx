import { notFound } from "next/navigation";
import Image from "next/image";
import { EventApi } from "@/app/lib/api/event-api";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import CommentFormEvent from "@/app/components/CommentFormEvent";

type Props = {
  params: {
    eventId: string;
  };
};

export default async function EventDetailPage({ params }: Props) {
  const { eventId } = params;

  try {
    const response = await EventApi.get(eventId);
    console.log("RESPONSE DATA:", response.data);
    const { agenda, user_created, comments } = response.data;

    const sidebarEvents = [
      { id: 1, title: "Event Lainnya 1" },
      { id: 2, title: "Event Lainnya 2" },
      { id: 3, title: "Event Lainnya 3" },
    ];

    return (
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-24 p-4">
        {/* Konten utama */}
        <div className="md:col-span-2 space-y-6">
          {/* Gambar utama */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow">
            <Image
              src={`http://localhost:8080/agenda/images/${agenda.image_path}`}
              alt={agenda.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Judul dan info */}
          <div>
            <h1 className="text-3xl font-bold text-blue-800">{agenda.title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Ditulis oleh{" "}
              <span className="font-semibold">{user_created.name}</span> •{" "}
              {format(new Date(agenda.created_at), "dd MMMM yyyy HH:mm", {
                locale: id,
              })}
            </p>
            <p className="text-sm mt-2 text-gray-600">
              📍 Lokasi: {agenda.location} <br />
              🗓️{" "}
              {format(new Date(agenda.date), "dd MMMM yyyy", {
                locale: id,
              })}{" "}
              <br />⏰ {format(new Date(agenda.time), "HH:mm", { locale: id })}
            </p>
          </div>

          {/* Konten */}
          <div className="prose prose-sm md:prose-base max-w-none text-justify">
            {agenda.content.split("\n\n").map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Komentar */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Komentar</h2>
            {comments.length === 0 ? (
              <p className="text-gray-500 italic">Belum ada komentar.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment: any) => (
                  <li
                    key={comment.id}
                    className="p-4 bg-gray-100 rounded-md shadow-sm"
                  >
                    <p className="text-sm text-gray-800">{comment.comment}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      Oleh <strong>{comment.user.name}</strong> •{" "}
                      {format(
                        new Date(comment.created_at),
                        "dd MMM yyyy HH:mm",
                        { locale: id }
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Form komentar */}
            <CommentFormEvent eventId={agenda.id} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
              Event Terkait
            </h2>
            <ul className="space-y-2">
              {sidebarEvents.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/events/${item.id}`}
                    className="text-blue-600 hover:underline hover:text-blue-800 text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    );
  } catch (error) {
    console.error("Gagal mengambil detail event:", error);
    return notFound();
  }
}
