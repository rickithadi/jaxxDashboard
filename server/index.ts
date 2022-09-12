import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

interface Product {
  SKU: string;
  title: string;
  image: string;
}

const products: Product[] = [
  {
    SKU: "001",
    title: "Hello",
    image: " https://picsum.photos/200/300",
  },
  {
    SKU: "002",
    title: "Hello",
    image: " https://picsum.photos/200/300",
  },
  {
    SKU: "003",
    title: "Hello",
    image: " https://picsum.photos/200/300",
  },
  {
    SKU: "004",
    title: "Hello",
    image: " https://picsum.photos/200/300",
  },
  {
    SKU: "005",
    title: "Hi",
    image: " https://picsum.photos/200/300",
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
});
