import express from "express";
import mongoose from "mongoose";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

interface Product {
  SKU: string;
  title: string;
  image: string;
}
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("🚀 Database connected...");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
const products: Product[] = [
  {
    SKU: "001",
    title: "Hello",
    image: " https://picsum.photos/600/700",
  },
  {
    SKU: "002",
    title: "Hello",
    image: " https://picsum.photos/600/700",
  },
  {
    SKU: "003",
    title: "Hello",
    image: " https://picsum.photos/600/700",
  },
  {
    SKU: "004",
    title: "Hello",
    image: " https://picsum.photos/600/700",
  },
  {
    SKU: "005",
    title: "Hi",
    image: " https://picsum.photos/600/700",
  },
];
const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return "Hello world III";
    },
  })
  .query("getProducts", {
    input: z.number().default(10),
    resolve({ input }) {
      return products.slice(-input);
    },
  })
  .query("getProduct", {
    input: z.string(),
    resolve({ input }) {
      return products.find((product) => input === product.SKU);
    },
  })
  .mutation("deleteProduct", {
    input: z.string(),
    resolve({ input }) {
      products.filter((product) => product.SKU !== input);
      console.log(products);
      return products;
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
      products.push(input);
      return input;
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
