"use client";

import { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleStartServer = async () => {
  try {
    const response = await fetch("/api/start-wa", { method: "POST" });

    // 1. Ambil teks dulu, jangan langsung .json()
    const text = await response.text(); 
    
    // 2. Coba ubah ke JSON jika memungkinkan
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { message: text };
    }

    if (!response.ok) {
      throw new Error(data.message || "Server Error");
    }

    alert("WhatsApp Server Berhasil Dinyalakan!");
  } catch (err) {
    console.error("Detail Error:", err);
    alert("Gagal: " + err.message);
  }
};

  return (
    <nav className="relative bg-gray-800 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-white">
              <Link href="/">
                <h1 className="font-bold text-xl">InfraHub</h1>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/emailPage"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Email (Zimbra)
                </Link>
                <Link
                  href="/whatsappPage"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Whatsapp
                </Link>
              </div>
            </div>
            <button
              onClick={handleStartServer}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-500" : "bg-green-500 hover:bg-blue-700"
              } text-white text-sm py-2 px-4 rounded transition-colors`}
            >
              {isLoading ? "Memproses..." : "Aktifkan Backend"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
