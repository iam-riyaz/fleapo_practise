import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const SearchPage2 = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("new");
  const debouceRef= useRef()

  const getData = async () => {
    if (query.length > 2) {
      let res = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=b9010f76&s=${query}`
      );
      if(res.data.Response=="True"){

          setData(res.data.Search);
      }
      console.log(res.data);
    }
  };

  const debounce= (func,delay)=>{
    
    debouceRef.current= setTimeout( func, delay)
    
  }

  useEffect(() => {
    debounce(getData, 1000);

    return ()=>clearInterval(debouceRef.current)
  }, [query]);

  return (
    <>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      {data.map((e) => {
        return (
          <div>
            <img src={e.Poster} alt="" />
            <p2>{e.Title}</p2>
          </div>
        );
      })}
    </>
  );
};
