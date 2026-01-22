import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Hanya izinkan lewat jika token ada (sudah login)
      return !!token;
    },
  },
});

// --- BAGIAN PENTING ---
export const config = {
  // Hanya tulis halaman yang WAJIB login di sini.
  // JANGAN tulis "/" atau "/login" atau "/register".
  matcher: [
    "/whatsappPage/:path*", 
    "/emailPage/:path*",
    // Tambahkan halaman rahasia lain di sini jika ada
  ],
};