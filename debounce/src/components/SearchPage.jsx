import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const SearchPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("new");
  const debounceRef = useRef();
  const [isloading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const debounce = () => {
    debounceRef.current = setTimeout(() => {
      setIsLoading(true);

      fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=b9010f76&s=${search}`)
        .then((res) =>
          res.json().then((data) => {
            console.log(data.Response);
            if (data.Response == "True") {
              setData(data.Search);
            } else {
              setData([]);
            }

            setIsLoading(false);
          })
        )
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

//   const onSort=(e)=>{
//     if(e.target.value=="aesc")
//     {
//         let mydata=data.sort((a,b)=>{a.Title-b.Title})
//         setData(mydata)
//         console.log(mydata)
        
//     }
//     if(e.target.value=="desc")
//     {
//         let mydata=data.sort((a,b)=>b.Title-a.Title)
//         setData(mydata)
//         console.log(mydata)
//     }
// }

  useEffect(() => {
    if (search.length >= 3) {
      debounce();
    }

    return () => {
      clearTimeout(debounceRef.current);
    };
  }, [search]);
  return (
    <>
      <div>
        <div>
          <input
            onChange={handleInput}
            style={{ height: "30px", fontSize: "20px" }}
            type="text"
            placeholder="search"
          />
         {/* <select style={{ marginLeft:"50px", height: "30px", fontSize: "20px" }} onChange={onSort} name="sort" id="">
            <option value="">sort</option>
            <option value="aesc">sort by A-Z</option>
            <option value="desc">sort by Z-A</option>
         </select> */}
        </div>

        {isloading ? (
          <p>laoding</p>
        ) : (
          <div>
            {data.length!=0?<div>
              {data.map((e) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "100px",
                      }}
                    >
                      <img style={{ height: "100%" }} src={e.Poster} alt="" />
                      <span>{e.Title}</span>
                    </div>
                  </>
                );
              })}
            </div>:<p>no data found</p>}
          </div>
        )}
      </div>
    </>
  );
};
