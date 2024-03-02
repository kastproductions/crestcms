// import { authRouter } from "./router/auth";
// import { postRouter } from "./router/post";
import { collectionRouter } from "./router/collections";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  //   auth: authRouter,
  collections: collectionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
