/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins'; // Import plugin client

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  // Khai báo plugin phía client để đồng bộ hóa Type-safe cho các trường admin
  plugins: [adminClient()],
});
