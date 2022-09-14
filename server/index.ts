import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import expressjwt from "express-jwt";
import { z } from "zod";

import { connectDB } from "./dbHelpers";
import { ProductModel } from "./products/products.model";
import { TRPCError } from "@trpc/server";
import { UserModel } from "./user/user.model";

const appRouter = trpc
  .router<Context>()
  .query("foo", {
    resolve() {
      return "bar";
    },
  })
  .mutation("login", {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      console.log("loggin in", input);
      console.log("loggin in", input);
      const user = await UserModel.findOne({ email: input.email });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      } else {
        const validPassword = await bcrypt.compare(
          input.password,
          user.password
        );
        console.log(validPassword);
        if (!validPassword) {
          throw new TRPCError({ code: "NOT_FOUND" });
        } else {
          const token = jwt.sign({ _id: user._id }, "secretShouldBeLonger");
          return token;
        }
      }
    },
  })
  .mutation("signUp", {
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const alreadyExists = await UserModel.findOne({ email: input.email });
      if (alreadyExists) {
        throw new TRPCError({ code: "FORBIDDEN" });
      } else {
        const encryptedPassword = await bcrypt.hash(input.password, 10);
        return UserModel.create({ email: input.email, encryptedPassword });
      }
    },
  })
  .merge(
    "products.",
    trpc
      .router<Context>()
      .middleware(async ({ ctx, next }) => {
        // if (!ctx.user) {
        //   throw new TRPCError({ code: "UNAUTHORIZED" });
        // }
        console.log("man is authenticated");
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
      })
  );

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
