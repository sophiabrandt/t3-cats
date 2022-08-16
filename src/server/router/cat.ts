import { createRouter } from "./context";
import { Cat } from "@prisma/client";

export const catRouter = createRouter()
  .query("random", {
    async resolve({ ctx }) {
      const randomCats = await ctx.prisma.$queryRaw<Cat[]>`SELECT id, imageUrl
                                                           FROM Cat
                                                           ORDER BY RANDOM()
                                                           LIMIT 1`;
      return randomCats[0];
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.cat.findMany();
    },
  });
