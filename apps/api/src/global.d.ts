import { auth } from './better-auth.ts';

type AuthUser = typeof auth.$Infer.Session.user;
type AuthSession = typeof auth.$Infer.Session.session;

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthUser | null;
    session: AuthSession | null;
  }
}

export {};
