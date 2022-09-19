import { useContext, useState } from "react";

import { filterContext } from "../context";
import { trpc } from "../trpc";
import { useDebounce } from "./helpers";

// react component for search bar
export const SearchBar = () => {
  const [searchText, setsearchText] = useState("");
  const { setFilteredProducts } = useContext(filterContext);
  const debouncedSearchTerm: string = useDebounce<string>(searchText, 500);

  // TODO use somekind of debouce
  const { data } = trpc.useQuery(["products.search", debouncedSearchTerm], {
    onSuccess: (data) => {
      setFilteredProducts(data);
    },
    enabled: searchText.length > 0,
  });

  return (
    <input
      type="text"
      value={searchText}
      onChange={(event) => {
        setsearchText(event.target.value);
      }}
      placeholder="Search"
      className="w-full text-lg px-4 py-4 rounded-md rounded-r-none outline-none"
    />
  );
};
