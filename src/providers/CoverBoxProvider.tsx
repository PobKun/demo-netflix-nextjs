'use client';

import { MediaItemType } from '@/types/Assets';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type CoverBoxContextType = {
  coverBoxData: MediaItemType|null;
  setCoverBoxData: Dispatch<SetStateAction<MediaItemType|null>>;
};

const CoverBoxContext = createContext<CoverBoxContextType|undefined>(undefined);

export const CoverBoxProvider = ({ children }: { children: ReactNode }) => {
  const [coverBoxData, setCoverBoxData] = useState<MediaItemType|null>(null);

  return (
    <CoverBoxContext.Provider value={{ coverBoxData, setCoverBoxData }}>
      {children}
    </CoverBoxContext.Provider>
  );
};

export const useCoverBox = (): CoverBoxContextType => {
  const context = useContext(CoverBoxContext);
  if (!context) {
    throw new Error('useCoverBox undefined');
  }
  return context;
};