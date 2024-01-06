import { router } from "../libs/trpc";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

export const appRouter = router({
    user: userRouter,
    auth: authRouter
});

export type AppRouter = typeof appRouter;
