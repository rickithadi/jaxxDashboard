import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
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
    async resolve({ ctx, input }) {
      console.log("loggin in", input);
      const user = await UserModel.findOne({ email: input.email });
      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND" });
      } else {
        const validPassword = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!validPassword) {
          throw new TRPCError({ code: "NOT_FOUND" });
        } else {
          const token = jwt.sign({ _id: user._id }, "secretShouldBeLonger");
          //TODO not working, need to set context on succesful login
          return { token, user };
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
        if (!ctx.userID) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        // TODO check if user actually exists
        const userExists = await UserModel.findById(ctx.userID);
        if (userExists) {
          return next();
        } else {
          console.log(userExists);
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
      })
      .query("search", {
        input: z.string(),
        async resolve({ input }) {
          console.log("searching for", input);
          return await ProductModel.find(
            {
              $text: {
                $search: input,
              },
            },
            { score: { $meta: "textScore" } }
          ).sort({ score: { $meta: "textScore" } });
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
}: trpcExpress.CreateExpressContextOptions) => {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you'd might want to do in your ctx fn
  try {
    // Get the token
    console.log("auth headers", req.headers.authorization);
    const notAuthenticated = {
      req,
      res,
      userID: null,
    };
    if (!req.headers.authorization) {
      return notAuthenticated;
    } else {
      const accessToken = req.headers.authorization;
      return {
        req,
        res,
        userID: jwt.verify(accessToken, "secretShouldBeLonger"),
      };
    }
  } catch (err: any) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: err.message,
    });
  }
};

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

const escapeRegex = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
