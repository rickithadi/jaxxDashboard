import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const ProductPage = () => {
  let { id } = useParams<{ id?: string }>();
  // let { id } = useQuery<{ id?: string }>();
  useEffect(() => {
    //make api call to get product
    console.log("got product");
  }, [id]);
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm">
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">sample product</h5>
        </div>
      </div>
    </div>
  );
};
