/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const prismaGlobal = globalThis as unknown as { prisma: PrismaClient | null };

// Khởi tạo một pool kết nối kết hợp biến DATABASE_URL (cổng 6543)
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

export const prisma = prismaGlobal.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}

// Export toàn bộ các Types tự động sinh ra của các bảng để Frontend/Backend sử dụng
export * from './generated/prisma/client.js';
