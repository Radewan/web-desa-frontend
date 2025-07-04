"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function KontakPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-800">Kontak Kami</h1>
        <p className="text-gray-600 mt-2">
          Jangan ragu untuk menghubungi kami jika ada pertanyaan, kritik, atau
          saran.
        </p>
      </header>

      {/* Info Kontak */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="flex items-start gap-4">
          <MapPin className="text-blue-600" />
          <div>
            <h2 className="font-semibold text-gray-700">Alamat</h2>
            <p className="text-sm text-gray-600">
              Jl. Raya Desa No. 123, Cisolok, Sukabumi
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="text-blue-600" />
          <div>
            <h2 className="font-semibold text-gray-700">Telepon</h2>
            <p className="text-sm text-gray-600">+62 812 3456 7890</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="text-blue-600" />
          <div>
            <h2 className="font-semibold text-gray-700">Email</h2>
            <p className="text-sm text-gray-600">info@desakita.id</p>
          </div>
        </div>
      </section>

      {/* Formulir Kontak */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Kirim Pesan
        </h2>
        <form className="grid gap-4 md:grid-cols-2">
          <Input
            type="text"
            placeholder="Nama Anda"
            className="col-span-2 md:col-span-1"
          />
          <Input
            type="email"
            placeholder="Email Anda"
            className="col-span-2 md:col-span-1"
          />
          <Textarea
            placeholder="Pesan Anda..."
            className="col-span-2 min-h-[120px]"
          />
          <div className="col-span-2">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white">
              Kirim
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
