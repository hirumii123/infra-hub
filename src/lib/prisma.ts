import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

// 1. Inisialisasi Pool dan Adapter sesuai docs Prisma 7
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Gunakan pola Singleton agar tidak "Too many connections" di Next.js
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter,
    log: ['query', 'info', 'warn', 'error'] 
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 3. WAJIB: Tambahkan export default untuk memperbaiki error build
// Ini supaya "import prisma from '@/lib/prisma'" di file API Anda bisa jalan
export default prisma;