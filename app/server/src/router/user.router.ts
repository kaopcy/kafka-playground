import { z } from "zod";
import { publicProcedure, router } from "../libs/trpc";
import { userRepository } from "../repository/user.repository";
import { authService } from "../service/auth.service";

export const userRouter = router({
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await userRepository.findOne(input);
  }),
  me: publicProcedure.query(async ({ ctx: { sessionId } }) => {
    return await authService.getUserFromSession(sessionId);
  }),
  getAll: publicProcedure.query(async ({ ctx: { sessionId } }) => {
    await authService.getUserFromSession(sessionId);
    return await userRepository.findAll();
  }),
  similarity: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await userRepository.similarity(input);
  }),
  match: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await userRepository.match(input);
  }),
});
