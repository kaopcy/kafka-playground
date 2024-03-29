import "module-alias/register";

import { createExpressMiddleware } from "@trpc/server/adapters/express";

import express from "express";

import cors from 'cors'
import cookieParser from 'cookie-parser'

import { createContext } from "./src/libs/trpc";
import { appRouter } from "./src/router/index.router";
import { AppDatasource } from "./src/libs/db";
import logger from "./src/libs/logger";

const app = express();

const trpcServer = createExpressMiddleware({
  router: appRouter,
  createContext,
});

app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/trpc", (req , res , next)=> {
  console.log(req.cookies)
  next()
} ,trpcServer);

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
