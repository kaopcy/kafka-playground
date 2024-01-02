import { z } from "zod";

import "../../libs/env";

const envConfigSchema = z.object({
    nodeEnv: z
        .enum(["development", "production", "test"])
        .default("development"),
    dbHost: z.string(),
    dbPort: z.coerce.number(),
    lokiUrl: z.string(),
    containerName: z.string().default("localhost"),
});

export const envConfig = envConfigSchema.parse({
    containerName: process.env.HOSTNAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    lokiUrl: process.env.LOKI_URI,
    nodeEnv: process.env.NODE_ENV,
});
