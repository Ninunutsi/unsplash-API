export interface IValuesContext {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  handleClick: (id: string, src: string, likes: number) => Promise<void>
  singlePhoto: ISinglePhoto | undefined
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  handleCloseModal: () => void
  historyQuery: string
  setHistoryQuery: React.Dispatch<React.SetStateAction<string>>
}

export interface ImageData {
    downloads: {
      total: number;
    };
    views: {
      total: number;
    };
  }
  
export interface ISinglePhoto {
    downloads:number
    likes:number
    views: number
    src: string
  }

  
export interface IModal {
    data: ISinglePhoto | undefined
    onClick: () => void;
}

export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    full: string
  };
  likes: number
}

export interface IGallery {
  images: UnsplashImage[]
  handleClick: (id: string, full: string, likes: number) => void
}