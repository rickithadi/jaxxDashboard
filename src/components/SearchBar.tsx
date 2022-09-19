import { useEffect, useState } from "react";
import { trpc } from "../trpc";

// react component for search bar
export const SearchBar = () => {
  const [searchText, setsearchText] = useState("");

  const { data: products, refetch } = trpc.useQuery(
    ["products.search", searchText],
    { onSuccess: (data) => console.log(data) }
  );

  useEffect(() => {
    refetch();
  }, [products, refetch]);
  return (
    <input
      type="text"
      value={searchText}
      onChange={(event) => {
        console.log(event.target.value);
        setsearchText(event.target.value);
      }}
      placeholder="Search"
      className="w-full text-lg px-4 py-4 rounded-md rounded-r-none outline-none"
    />
  );
};
