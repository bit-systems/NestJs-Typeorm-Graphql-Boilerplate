import { z } from 'zod';

export const envSchema = z.object({
  //Node
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'test', 'production'], {
      description: 'This gets updated depending on your environment',
    })
    .default('development'),

  //Database
  DATABASE_HOST: z
    .string({
      required_error: '😱 You forgot to add a database Host URL',
    })
    .min(1),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),

  //Auth
  JWT_SECRET: z.string().min(16),
});

export const validateEnv = (config: Record<string, string>) => {
  return envSchema.parse(config);
};

export type EnvConfig = z.infer<typeof envSchema>;
