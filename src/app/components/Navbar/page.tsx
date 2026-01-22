"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"; // 1. Import ini

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // 2. Ambil data user yang sedang login
  const { data: session } = useSession(); 

  return (
    <nav className="relative bg-gray-800 z-50"> {/* z-999 gak ada di tailwind default, ganti z-50 */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* ... (Tombol Mobile Menu Biarkan Tetap Sama) ... */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                 <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              ) : (
                 <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
          </div>

          {/* Bagian Kanan (Profil) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            
            {/* Nama User (Opsional: Biar kelihatan siapa yg login) */}
            <span className="hidden md:block text-gray-300 text-sm mr-3">
               Halo, {session?.user?.name || "User"}
            </span>

            {/* Dropdown Profil */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* 3. Gunakan Foto dari Session (atau default kalau gak ada) */}
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={session?.user?.image || "https://ui-avatars.com/api/?name=" + (session?.user?.name || "User") + "&background=random"}
                    alt=""
                  />
                </button>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* Info Email kecil di atas */}
                  <div className="px-4 py-2 text-xs text-gray-500 border-b mb-1">
                    {session?.user?.email}
                  </div>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  
                  {/* 4. INI DIA TOMBOL LOGOUT-NYA */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            >
              Home
            </Link>
            <Link
              href="/emailPage"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Email (Zimbra)
            </Link>
            <Link
              href="/whatsappPage"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Whatsapp
            </Link>
            {/* Mobile Logout */}
            <button
               onClick={() => signOut({ callbackUrl: "/login" })}
               className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-blue-400 hover:bg-gray-700 hover:text-white"
            >
               Sign out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};