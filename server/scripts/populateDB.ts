import { ProductModel } from "../products/products.model";
import { connectDB, disconnect } from "../dbHelpers";
import * as Mongoose from "mongoose";

(async () => {
  connectDB();

  const products = [
    {
      SKU: "001",
      title: "laptop",
      image: "https://picsum.photos/600/700",
    },
    {
      SKU: "002",
      title: "candy",
      image: "https://picsum.photos/600/700",
    },
    {
      SKU: "003",
      title: "Jimmy",
      image: " https://picsum.photos/600/700",
    },
    {
      SKU: "004",
      title: "carpet",
      image: "https://picsum.photos/600/700",
    },
    {
      SKU: "005",
      title: "Hi",
      image: "https://picsum.photos/600/700",
    },
  ];

  try {
    for (const product of products) {
      await ProductModel.create(product);
      console.log(`Created product ${product.SKU}
            ${product.title}`);
    }

    disconnect();
  } catch (e) {
    console.log(e);
  }
})();
