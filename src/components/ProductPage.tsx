import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let { id } = useParams<{ id?: string }>();
  // let { id } = useQuery<{ id?: string }>();
  useEffect(() => {
    //make api call to get product
    console.log("got product");

  }, [id]);
  return <h1>{id}</h1>;
};
