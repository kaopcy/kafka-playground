import { z } from "zod";

import "../libs/env";

const envConfigSchema = z.object({
    nodeEnv: z
        .enum(["development", "production", "test"])
        .default("development"),
    dbHost: z.string(),
    dbPort: z.coerce.number(),
    lokiUrl: z.string(),
    containerName: z.string().default("localhost"),
    authSecret: z.string(),

    googleClientId: z.string(),
    googleClientSecret: z.string(),
});

const loadedEnv: Record<keyof z.infer<typeof envConfigSchema>, any> = {
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    lokiUrl: process.env.LOKI_URI,
    nodeEnv: process.env.NODE_ENV,
    containerName: process.env.HOSTNAME,
    authSecret: process.env.AUTH_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

export const envConfig = envConfigSchema.parse(loadedEnv);
