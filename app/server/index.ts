import "module-alias/register";

import { createExpressMiddleware } from "@trpc/server/adapters/express";

import express from "express";

import { createContext } from "./src/libs/trpc";
import { appRouter } from "./src/router/index.router";
import { AppDatasource } from "./src/libs/db";
import logger from "./src/libs/logger";

const app = express();

const trpcServer = createExpressMiddleware({
    router: appRouter,
    createContext,
});

app.use("/trpc", trpcServer);

(async () => {
    try {
        await AppDatasource.initialize();
        app.listen(4000, () => {
            logger.info("server initiated at port 4000");
        });
    } catch (error) {
        console.log("server initialize failed", error);
    }
})();
