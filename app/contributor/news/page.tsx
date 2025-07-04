"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewsApi } from "@/app/lib/api/news-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function MyNewsPage() {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [image, setImage] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchNews();
  }, [router]);

  const fetchNews = async () => {
    try {
      const response = await NewsApi.getAll();
      setNews(response.data);
    } catch (error) {
      console.error("Gagal fetch berita:", error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      if (image) form.append("image", image);

      if (editId) {
        // await NewsApi.updateWithImage(editId, form, token);
      } else {
        // await NewsApi.createWithImage(form, token);
      }
      setFormData({ title: "", content: "" });
      setImage(null);
      setEditId(null);
      setShowForm(false);
      fetchNews();
    } catch (error) {
      console.error("Gagal menyimpan berita:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      const token = localStorage.getItem("token");
      // await NewsApi.delete(id, token);
      fetchNews();
    } catch (error) {
      console.error("Gagal hapus berita:", error);
    }
  };

  const startEdit = (item: any) => {
    setFormData({ title: item.title, content: item.content });
    setImage(null);
    setEditId(item.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Berita Saya</h2>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormData({ title: "", content: "" });
            setImage(null);
          }}
        >
          + Tambah Berita
        </Button>
      </div>

      {showForm && (
        <div className="bg-gray-100 p-4 rounded mb-4 space-y-2">
          <Input
            placeholder="Judul Berita"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Textarea
            placeholder="Isi berita..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />

          <div className="flex gap-2">
            <Button onClick={handleSave}>{editId ? "Update" : "Simpan"}</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Batal
            </Button>
          </div>
        </div>
      )}

      <ul className="space-y-4">
        {news.map((item: any) => (
          <li key={item.id} className="p-4 bg-white rounded shadow space-y-2">
            {item.image_path && (
              <div className="relative w-full h-48 rounded overflow-hidden">
                <Image
                  src={`http://localhost:8080/news/images/${item.image_path}`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-600">
              {item.content.slice(0, 80)}...
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => startEdit(item)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id)}
              >
                Hapus
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
