import { initTRPC } from "@trpc/server";

import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import logger from "./logger";

export const createContext = ({
    req,
    res,
}: CreateExpressContextOptions) => {
  const token =  req.headers.authorization?.split(" ")?.[1]
  const cookie = req.cookies.sessionId

  const sessionId: string | undefined = token || cookie

  return  ({ req, res, sessionId })
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// export const 
