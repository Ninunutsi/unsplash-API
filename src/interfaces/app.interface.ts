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