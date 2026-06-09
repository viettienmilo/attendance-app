import { createMiddleware } from 'hono/factory';

import { auth } from './better-auth.js';

export const authen = createMiddleware(async (c, next) => {
  const sessionData = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!sessionData) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  c.set('user', sessionData.user);
  c.set('session', sessionData.session);
  await next();
});
