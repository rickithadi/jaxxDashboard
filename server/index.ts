import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";
import { connectDB } from "./dbHelpers";
import { ProductModel } from "./products/products.model";

const appRouter = trpc
  .router()
  .query("getProducts", {
    input: z.number().default(10),
    resolve({ input }) {
      return ProductModel.find({ limit: input });
    },
  })
  .query("getProduct", {
    input: z.string(),
    resolve({ input }) {
      return ProductModel.findById(input).lean();
    },
  })
  .mutation("deleteProduct", {
    input: z.string(),
    resolve({ input }) {
      return ProductModel.findOneAndDelete({ id: input });
    },
  })
  .mutation("editProduct", {
    input: z.object({
      title: z.string(),
      image: z.string(),
    }),
    resolve({ input }) {
      return true;
    },
  })
  .mutation("addProduct", {
    input: z.object({
      title: z.string(),
      SKU: z.string(),
      image: z.string(),
    }),
    resolve({ input }) {
      // products.push(input);
      // return input;
    },
  });

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors());
const port = 8080;

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // createContext: () => null,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
  connectDB();
});
