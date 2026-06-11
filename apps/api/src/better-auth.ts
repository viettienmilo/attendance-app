/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins'; // Import plugin quản trị
import { prisma } from '@repo/db';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  // Kích hoạt đăng nhập bằng Email & Mật khẩu cơ bản
  emailAndPassword: {
    enabled: true,
  },
  // Kích hoạt chức năng admin (Tự động mở khóa các API ban, set-role nội bộ)
  plugins: [admin()],
  // Bật cross origin
  trustedOrigins: [process.env.CORS_ORIGIN || 'http://localhost:5173'],
  // Cài đặt nâng cao
  advanced: {
    database: {
      // Sử dụng ID số, tự động tăng của PostgreSQL
      generateId: 'serial',
    },
    // buộc trình duyệt không chặn session cookie cross-site
    defaultCookieAttributes:
      process.env.NODE_ENV === 'development'
        ? {
            sameSite: 'lax',
            secure: false,
          }
        : {
            sameSite: 'none',
            secure: true,
          },
  },
});
