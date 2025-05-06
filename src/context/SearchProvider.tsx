'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type SearchContextType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchContext = createContext<SearchContextType|undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch undefined');
  }
  return context;
};