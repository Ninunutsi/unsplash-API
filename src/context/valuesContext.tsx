import React, { createContext, useContext, useState } from "react";

const ValuesContext = createContext<any>(null);

export const ValuesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [page, setPage] = useState<number>(1)

  return (
    <ValuesContext.Provider
      value={{ searchQuery, setSearchQuery, page, setPage }}
    >
      {children}
    </ValuesContext.Provider>
  );
};

export const useValuesContext = () => useContext(ValuesContext);
