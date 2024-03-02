import React, { useEffect, useState } from 'react'
import { StyledInput, StyledLabel } from './search.styled'
import { searchImages } from '../../api/api';

interface UnsplashImage {
    id: string;
    urls: {
      regular: string;
    };
  }

export const Search = () => {

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState<UnsplashImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState<number>(1);

//     useEffect(() => {
//         const delay = setTimeout(() => {
//             if (search.trim() !== '') {
//                 fetchData();
//                 console.log("search in use effect")
//             }
//         }, 300); // Debounce for 300ms
//         return () => clearTimeout(delay);
//     }, [search]);

//     async function fetchData() {
//         setLoading(true);
//         try {
//             const response = await searchImages(page, search);
//             setSearchData(prevData => [...prevData, ...response.data]);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setLoading(false);
//         }
//     }
// console.log(search)
// console.log(searchData)

  return (
    <StyledLabel>
        <StyledInput type="text" placeholder="Search images" value={search} onChange={(e) => setSearch(e.target.value)}/>

       </StyledLabel>
  )
}
