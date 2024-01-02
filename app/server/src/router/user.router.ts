import { z } from "zod";
import { publicProcedure, router } from "../libs/trpc";
import { userRepository } from "../repository/user.repository";
import { createInputMiddleware } from "@trpc/server";



export const userRouter = router({
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id } }) => {
            return await userRepository.findOne(id);
        }),
    getAll: publicProcedure.query(async () => {
        return await userRepository.findAll();
    }),
    create: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input: { name } }) => {
            return await userRepository.create({ name });
        }),
    similarity: publicProcedure.input(z.string()).query(async ({ input }) => {
        return await userRepository.similarity(input);
    }),
    match: publicProcedure.input(z.string()).query(async ({ input }) => {
        return await userRepository.match(input);
    }),
});
