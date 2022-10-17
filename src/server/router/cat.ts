import { createRouter } from "./context";
import { Cat } from "@prisma/client";
import { z } from "zod";

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
  })
  .mutation("create", {
    input: z.object({ imageUrl: z.string().nullish() }),
    async resolve({ input, ctx }) {
      const newCat = await ctx.prisma.cat.create({
        data: {
          imageUrl: input.imageUrl ?? "",
        },
      });
      console.log(newCat);
      return newCat;
    },
  });
