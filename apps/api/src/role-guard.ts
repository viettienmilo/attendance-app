/**
 * Copyright (c) 2026-present, Nguyen Viet Tien.
 * Licensed under the MIT License (the "LICENSE");
 */

import { createMiddleware } from 'hono/factory';
import type { Role } from './types.js';

export const roleGuard = (allowedRoles: Role[]) => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');

    if (!user || user.role !== 'admin') {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    await next();
  });
};
