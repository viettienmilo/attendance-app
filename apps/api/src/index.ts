import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { Hono } from 'hono';

import { prisma } from '@repo/db';

console.log('DATABASE_URL =', process.env.DATABASE_URL);

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

const routes = app
  .get('/api/hello', (c) => {
    return c.json({
      status: 'success',
      message: 'Welcome from Hono Backend!',
      timestamp: Date.now(),
    });
  })
  .get('/api/users', async (c) => {
    const users = await prisma.user.findMany();
    return c.json({ status: 'success', users });
  });

app.get('/', (c) => {
  return c.text('Hello Hono!');
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
