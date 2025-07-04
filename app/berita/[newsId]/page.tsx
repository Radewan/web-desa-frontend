import { notFound } from "next/navigation";
import Image from "next/image";
import { NewsApi } from "@/app/lib/api/news-api";
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Link from "next/link";
import CommentFormNews from "@/app/components/CommentFormNews";

type Props = {
  params: {
    newsId: string;
  };
};

export default async function NewsDetailPage({ params }: Props) {
  const { newsId } = params;

  try {
    const response = await NewsApi.get(newsId);
    const { news, user_maked, comments } = response.data;

    // Contoh dummy sidebar data
    const sidebarNews = [
      { id: 1, title: "Berita Terkait 1" },
      { id: 2, title: "Berita Terkait 2" },
      { id: 3, title: "Berita Terkait 3" },
    ];

    return (
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-24 p-4">
        {/* Kolom Konten Berita */}
        <div className="md:col-span-2 space-y-6">
          {/* Gambar utama */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow">
            <Image
              src={`http://localhost:8080/news/images/${news.image_path}`}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Judul dan info */}
          <div>
            <h1 className="text-3xl font-bold text-blue-800">{news.title}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Ditulis oleh{" "}
              <span className="font-semibold">{user_maked.name}</span> •{" "}
              {format(new Date(news.created_at), "dd MMMM yyyy HH:mm", {
                locale: id,
              })}
            </p>
          </div>

          {/* Konten */}
          <div className="prose prose-sm md:prose-base max-w-none text-justify">
            {news.content.split("\n\n").map((para: string, idx: number) => (
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
                        {
                          locale: id,
                        }
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <CommentFormNews newsId={news.id} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-3">
              Berita Terkait
            </h2>
            <ul className="space-y-2">
              {sidebarNews.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/news/${item.id}`}
                    className="text-blue-600 hover:underline hover:text-blue-800 text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tambahan lain jika mau, seperti topik populer */}
        </aside>
      </div>
    );
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return notFound();
  }
}
