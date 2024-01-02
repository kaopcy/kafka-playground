import { router } from "../libs/trpc";
import { userRouter } from "./user.router";

export const appRouter = router({
    user: userRouter,
});

export type AppRouter = typeof appRouter;
