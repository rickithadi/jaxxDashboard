import { ProductModel } from "../products/products.model";
import bcrypt from "bcrypt";
import { connectDB, disconnect, dropCollections } from "../dbHelpers";
import { UserModel } from "../user/user.model";
import { TRPCError } from "@trpc/server";

(async () => {
  connectDB();
  dropCollections();

  const users = [
    {
      email: "bob@somewhere.com",
      password: "longPass",
    },
    {
      email: "bill@somewhere.com",
      password: "longerPass",
    },
  ];
  const products = [
    {
      title: "laptop",
      image: "https://picsum.photos/600/700",
    },
    {
      title: "candy",
      image: "https://picsum.photos/600/700",
    },
    {
      title: "Jimmy",
      image: " https://picsum.photos/600/700",
    },
    {
      title: "carpet",
      image: "https://picsum.photos/600/700",
    },
    {
      title: "Hi",
      image: "https://picsum.photos/600/700",
    },
  ];

  try {
    for (const product of products) {
      await ProductModel.create(product);
      console.log(`Created product ${product.title}`);
    }
    for (const user of users) {
      const alreadyExists = await UserModel.findOne({ email: user.email });
      if (alreadyExists) {
        throw new TRPCError({ code: "FORBIDDEN" });
      } else {
        // const encryptedPassword = await bcrypt.hash(user.password, 10);
        console.log(`Created user ${user.email}`);
        await UserModel.create({
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
        });
      }
    }

    disconnect();
  } catch (e) {
    console.log(e);
  }
})();
