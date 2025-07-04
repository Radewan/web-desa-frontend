"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  eventId: string;
};

export default function CommentFormEvent({ eventId }: Props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/comments/agenda/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ comment }),
        }
      );

      if (!res.ok) {
        throw new Error("Gagal mengirim komentar");
      }

      // Reload komentar
      setComment("");
      router.refresh(); // ⬅️ Next.js 13+ untuk re-fetch data server
    } catch (err) {
      alert("Terjadi kesalahan saat mengirim komentar.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 border rounded resize-none"
        rows={4}
        placeholder="Tulis komentar kamu di sini..."
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
}
