import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom 1: Logo dan deskripsi */}
        <div>
          <h2 className="text-xl font-bold text-blue-600 mb-2">Desa Kita</h2>
          <p className="text-sm">
            Website resmi informasi kegiatan, budaya, dan berita desa. Dibuat
            untuk masyarakat dan oleh masyarakat.
          </p>
        </div>

        {/* Kolom 2: Navigasi */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Navigasi</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/tentang" className="hover:text-blue-600">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/berita" className="hover:text-blue-600">
                Berita
              </Link>
            </li>
            <li>
              <Link href="/kontak" className="hover:text-blue-600">
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Kontak */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Kontak</h3>
          <p className="text-sm">Jl. Raya Desa No. 123</p>
          <p className="text-sm">Cisolok, Sukabumi</p>
          <p className="text-sm mt-2">Email: info@desakita.id</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
        &copy; {new Date().getFullYear()} Desa Kita. All rights reserved.
      </div>
    </footer>
  );
};
