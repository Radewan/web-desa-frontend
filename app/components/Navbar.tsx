"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tentangOpen, setTentangOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null); // ✅

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Desa
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center relative">
        <Link href="/" className="hover:text-blue-600">
          Beranda
        </Link>
        {/* Dropdown Tentang */}
        <div className="relative">
          <button
            onClick={() => setTentangOpen(!tentangOpen)}
            className="hover:text-blue-600 flex items-center gap-1"
          >
            Tentang <ChevronDown size={16} />
          </button>

          {tentangOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md py-2 w-40 z-50">
              <Link
                href="/tentang/visi-misi"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setTentangOpen(false)}
              >
                Visi & Misi
              </Link>
              <Link
                href="/tentang/struktur"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setTentangOpen(false)}
              >
                Struktur
              </Link>
              <Link
                href="/tentang/sejarah"
                className="block px-4 py-2 hover:bg-blue-100"
                onClick={() => setTentangOpen(false)}
              >
                Sejarah
              </Link>
            </div>
          )}
        </div>
        <Link href="/berita" className="hover:text-blue-600">
          Berita
        </Link>
        <Link href="/acara" className="hover:text-blue-600">
          Acara
        </Link>
        <Link href="/kontak" className="hover:text-blue-600">
          Kontak
        </Link>
        {!token ? (
          <Button variant="outline" className="hover:text-blue-600">
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            className="hover:text-red-600"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
            }}
          >
            Logout
          </Button>
        )}
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden">
        <Menu
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col items-start px-6 py-4 gap-3 md:hidden">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Beranda
          </Link>

          {/* Mobile Tentang Dropdown */}
          <div className="flex flex-col w-full">
            <button
              onClick={() => setTentangOpen(!tentangOpen)}
              className="flex items-center justify-between w-full hover:text-blue-600"
            >
              Tentang <ChevronDown size={16} />
            </button>

            {tentangOpen && (
              <div className="ml-4 mt-2 flex flex-col gap-2">
                <Link
                  href="/tentang/visi-misi"
                  onClick={() => {
                    setTentangOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Visi & Misi
                </Link>
                <Link
                  href="/tentang/struktur"
                  onClick={() => {
                    setTentangOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Struktur
                </Link>
                <Link
                  href="/tentang/sejarah"
                  onClick={() => {
                    setTentangOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Sejarah
                </Link>
              </div>
            )}
          </div>

          <Link href="/berita" onClick={() => setMenuOpen(false)}>
            Berita
          </Link>
          <Link href="/acara" onClick={() => setMenuOpen(false)}>
            Acara
          </Link>
          <Link href="/kontak" onClick={() => setMenuOpen(false)}>
            Kontak
          </Link>
          <Button variant="outline" onClick={() => setMenuOpen(false)}>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};
