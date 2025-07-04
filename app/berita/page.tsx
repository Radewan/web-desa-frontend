import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { NewsApi } from "../lib/api/news-api";

export interface INews {
  id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: Date;
  updated_at: Date;
}

const BeritaPage = async () => {
  const response = await NewsApi.getAll();
  const news: INews[] = response.data;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Berita Terbaru</h1>

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
    </div>
  );
};

export default BeritaPage;
