import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let { id } = useParams<{ id?: string }>();

  return <h1>{id}</h1>;
};
