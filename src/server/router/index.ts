// src/server/router/index.ts
import superjson from "superjson";
import { catRouter } from "./cat";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("cat.", catRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
