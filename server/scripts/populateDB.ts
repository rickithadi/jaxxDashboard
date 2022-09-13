import { ProductModel } from "../products/products.model";
import { connectDB, disconnect } from "../dbHelpers";

(async () => {
  connectDB();

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

    disconnect();
  } catch (e) {
    console.log(e);
  }
})();
