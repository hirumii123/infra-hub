import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    // Prisma 7 membutuhkan URL saat generate
    // Gunakan dummy URL jika DATABASE_URL belum tersedia (untuk build)
    url: process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
});