import { protectedProcedure, router } from "../../trpc"

export const testRouter = router({
  testMessage: protectedProcedure.query(({ ctx }) => {
    return ctx.auth.userId
  }),
})
