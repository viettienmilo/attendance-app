import { zValidator as honoZValidator } from '@hono/zod-validator';

import type { ValidationTargets } from 'hono';
import type { ZodType } from 'zod';

export const zodValidator = <
  T extends keyof ValidationTargets,
  S extends ZodType,
>(
  target: T,
  schema: S,
) =>
  honoZValidator(target, schema, (result: any, c: any) => {
    if (!result.success) {
      return c.json({ error: result.error.issues }, 404);
    }
  });
