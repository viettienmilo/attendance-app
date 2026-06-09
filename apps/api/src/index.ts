/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */
import 'dotenv/config';

import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { Hono } from 'hono';

import { auth } from './better-auth.js';
import {
  studentRouter,
  myclassRouter,
  courseRouter,
  attendanceRouter,
  testRouter,
  scoreRouter,
} from './router.js';

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
  .route('/api/students', studentRouter)
  .route('/api/classes', myclassRouter)
  .route('/api/courses', courseRouter)
  .route('/api/attendances', attendanceRouter)
  .route('/api/tests', testRouter)
  .route('/api/scores', scoreRouter);

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
