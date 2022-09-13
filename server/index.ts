import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

import { connectDB } from "./dbHelpers";
import { ProductModel } from "./products/products.model";

const appRouter = trpc
  .router<Context>()
  .query("foo", {
    resolve() {
      return "bar";
    },
  })
  .merge(
    "products.",
    trpc
      .router<Context>()
      .middleware(async ({ ctx, next }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next();
      })
      .query("secretPlace", {
        resolve() {
          return "a key";
        },
      })
  .query("getProducts", {
    input: z.number().default(10),
    async resolve({ input }) {
      return await ProductModel.find({ limit: input });
    },
  })
  .query("getProduct", {
    input: z.string(),
    async resolve({ input }) {
      return await ProductModel.findById(input).lean();
    },
  })
  .mutation("deleteProduct", {
    input: z.string(),
    async resolve({ input }) {
      return await ProductModel.findOneAndDelete({ _id: input });
    },
  })
  .mutation("editProduct", {
    input: z.object({
      _id: z.string(),
      title: z.string(),
      image: z.string(),
    }),
    async resolve({ input }) {
      return await ProductModel.findByIdAndUpdate(input._id, input, {
        returnOriginal: false,
      }).lean();
    },
  })
  .mutation("addProduct", {
    input: z.object({
      title: z.string(),
      image: z.string(),
    }),
    async resolve({ input }) {
      return await ProductModel.create(input);
    },
  });
  )
export type AppRouter = typeof appRouter;
// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context

type Context = trpc.inferAsyncReturnType<typeof createContext>;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
  connectDB();
});
