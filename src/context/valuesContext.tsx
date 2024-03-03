import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { ISinglePhoto, IValuesContext, ImageData } from "../interfaces/app.interface";
import { getOneImage } from "../api/api";

const ValuesContext = createContext<IValuesContext | any>(null);

export const ValuesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [singlePhoto, setSinglePhoto] = useState<ISinglePhoto | undefined>(undefined)
    const [modal, setModal] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const [historyQuery, setHistoryQuery] = useState<string>("")

    const handleClick = async (id: string, src: string, likes: number) => {
      // Check if data is already cached
      const cachedData = queryClient.getQueryData(['image', id]);
      
      if (cachedData) {
        const { downloads: {total: downloads}, views: {total: views} } = cachedData as ImageData;
        setSinglePhoto({
          downloads: downloads,
          likes: likes,
          views: views,
          src: src
        });
      } else {
        // Fetch and cache the data if not cached
        const res = await getOneImage(id);
        const data = res?.data;
        if (data) {
          const { downloads: {total: downloads}, views: {total: views} } = data;
          queryClient.setQueryData(['image', id], data);
          setSinglePhoto({
            downloads: downloads,
            likes: likes,
            views: views,
            src: src
          });
        }
      }
      setModal(true);
    }


  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <ValuesContext.Provider
      value={{ searchQuery, setSearchQuery, page, setPage, handleClick, singlePhoto, modal, setModal, handleCloseModal, historyQuery, setHistoryQuery }}
    >
      {children}
    </ValuesContext.Provider>
  );
};


export const useValuesContext = () => useContext(ValuesContext);
