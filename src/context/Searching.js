import { createContext, useState } from "react";

const SearchingContext = createContext();

export const SearchingContextProvider = ({ children }) => {
  const [searching, setSearching] = useState("");

  const search = {
    searching,
    setSearching,
  };

  return (
    <SearchingContext.Provider value={search}>
      {children}
    </SearchingContext.Provider>
  );
};

export default SearchingContext;
