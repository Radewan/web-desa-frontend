// app/page.tsx atau pages/index.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { NewsApi } from "./lib/api/news-api";
import { INews } from "./berita/page";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { IEvent } from "./acara/page";
import { EventApi } from "./lib/api/event-api";

export default function Home() {
  const [news, setNews] = useState<INews[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchAll = async () => {
    try {
      const [newsRes, eventRes] = await Promise.all([
        NewsApi.getAll(),
        EventApi.getAll(),
      ]);

      setNews(newsRes.data);
      setEvents(eventRes.data); // pastikan kamu punya state setEvents
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/ciptagelar-hero.jpg')" }}
        id="hero"
      >
        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Konten di atas gambar */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold">
            Selamat Datang di Ciptagelar
          </h1>
          <p className="mt-4 text-xl md:text-2xl">
            Menjaga budaya, membangun masa depan
          </p>
        </div>
      </section>

      <div className="p-24 space-y-20">
        {/* About Section */}
        <section id="about" className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <Image
              src="/ciptagelar-about.jpg" // ganti dengan gambar kamu
              alt="Tentang Kami"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">
              Tentang Kami
            </h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              perspiciatis recusandae asperiores! Unde pariatur neque fugiat
              omnis quam totam. At, voluptatum eos? Numquam, reprehenderit animi
              quas dolorum, officia repellendus saepe natus suscipit nesciunt
              explicabo eligendi, sapiente deleniti voluptas voluptates repellat
              inventore blanditiis dolores possimus! Dolorum sapiente facilis
              incidunt excepturi libero neque sequi ipsum consectetur quasi
              saepe vel, inventore quam amet dolorem, provident est molestiae
              facere architecto iure quod! Animi voluptatem at dolor qui
              explicabo, labore ut eos dolores voluptatum, quas asperiores,
              earum tempora! Ex labore, assumenda deleniti, aliquam
              necessitatibus hic tenetur aspernatur corrupti, nam magni
              dignissimos placeat veniam tempore maxime.
            </p>
            <Link href="/tentang" className="text-blue-600 hover:underline">
              Baca selengkapnya →
            </Link>
          </div>
        </section>

        {/* Berita Section */}
        <section id="news">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Berita Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.id}`}
                className="rounded-lg overflow-hidden border shadow hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={`http://localhost:8080/news/images/${item.image_path}`}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold group-hover:text-blue-600">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {format(new Date(item.created_at), "dd MMM yyyy", {
                      locale: id,
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Event Section */}
        <section id="event">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">
            Event Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`./event/${event.id}`}
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
        </section>
      </div>
    </>
  );
}
