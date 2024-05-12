import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const usercontext = createContext({});

export function Usercontextprovider({ children }) {
  const [userdata, setUserdata] = useState([]);

    useEffect(() => {
     
      axios.get("/profile").then(({ data }) => {
        setUserdata(data);
      });
     
    }, []);
  console.log(userdata)

  return (
    <usercontext.Provider value={{ userdata, setUserdata }}>
      {children}
    </usercontext.Provider>
  );
}
