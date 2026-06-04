import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { Hono } from 'hono';

import 'dotenv/config';

import { prisma } from '@repo/db';
import { auth } from './better-auth.js';

const app = new Hono();

app.use(
  '*',
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);

app.on(['POST', 'GET'], '/api/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

const routes = app
  .get('/api/hello', (c) => {
    return c.json({
      status: 'success',
      message: 'Welcome from Hono Backend!',
      timestamp: Date.now().toLocaleString(),
    });
  })
  .get('/api/users', async (c) => {
    const users = await prisma.user.findMany();
    return c.json({ status: 'success', users });
  })
  .get('/api/test/user', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      return c.json(
        {
          status: 'failed',
          message: `Access denied`,
          role: 'not available',
        },
        401,
      );
    }
    return c.json(
      {
        status: 'success',
        message: `Access granted`,
        role: session.user.role,
      },
      200,
    );
  });

app.get('/', (c) => {
  return c.json({
    message: 'Success',
    code: '200',
    timestamp: Date.now().toLocaleString(),
  });
});

export type AppTypes = typeof routes;

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
