import axios from "axios";

const API_KEY = "fY5WYZ7VPopsu9HZ_aPhrKII-7slLoUxJEaiVx0QCIk"

export const getOneImage = async (id: string) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}/statistics?client_id=${API_KEY}`)
        return response
      } catch (error) {
        console.log(error)
      }
}

export const searchImages = async (query: string | undefined, page: number) => {
    try{
        const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=20&order_by=popular&client_id=${API_KEY}`)
        return response.data.results
    }catch(err){
        console.log(err)
    }
}


export const getImagesByPage = async (page:number) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos?page=${page}&per_page=20&order_by=popular&client_id=${API_KEY}`);
    return response.data
    } catch (error) {
        console.log(error)
    }
};