import { z } from "zod";

const environmentSchema = z.object({
  googleAuthId: z.string(),
  googleAuthSecret: z.string(),
  authSecret: z.string(),
});

const loadedEnv: Record<keyof z.infer<typeof environmentSchema>, any> = {
  googleAuthId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  googleAuthSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  authSecret: process.env.NEXT_PUBLIC_AUTH_SECRET,
};

export const env = environmentSchema.parse(loadedEnv);
