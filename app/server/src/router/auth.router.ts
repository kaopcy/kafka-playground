import { z } from "zod";
import { publicProcedure, router } from "../libs/trpc";
import { userRepository } from "../repository/user.repository";
import { authService } from "../service/auth.service";

export const authRouter = router({
  googleLogin: publicProcedure
    .input(z.object({ accessToken: z.string(), state: z.string() }))
    .query(async ({ input: { accessToken, state }, ctx: { res } }) => {
      const result = await authService.signJwtFromGoogleToken(accessToken);
      res.cookie("sessionId", result, { httpOnly: true, secure: false });
      return "hello";
    }),

  googleLoginCallback: publicProcedure
    .input(z.string())
    .query(async ({ input: code, ctx: { res } }) => {
      const result = await authService.signJwtFromGoogleAuthCode(code);
      res.cookie("sessionId", result, { httpOnly: true, secure: false });
      return "hello";
    }),
});
