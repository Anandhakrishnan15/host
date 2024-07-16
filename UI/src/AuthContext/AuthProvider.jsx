{
  //first we havbe to make a contaxt and create your owh user hooks
  // generate token
  // 1get the in to the localstorage
  // 2 make logout fuction and remove the token from the local storage.
  // 3 userAuthendiaction from wher we will get know weathe the user is authenticted or not
  // and then get the data of th user using usereffect
}

//create a coustamom hooks
import React, { createContext, useContext, useEffect, useState } from "react";
// import GetallUsersHooks from "./hokks/GetallUsersHooks";
import axios from "axios";

export const userAuth = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token")); //store token in localstorage
  const [userid, setUserId] = useState(localStorage.getItem("UserId"));
  const [getAllusers, setGetallUsers] = useState([]);
  const [limit,setlimit] = useState(10)
  const [user, setUser] = useState('');
  const [totalCount,setTotalcount]= useState(0)
  const [notifiaction,setNotifiaction] = useState([])
  

  //store token in localstorage function
  const storeToken = (Tokenprovided) => {
    setToken(Tokenprovided);
    return localStorage.setItem("Token", Tokenprovided);
  };
  let isLogedIn = !!token;

  const setUserIdToLS = (UserID) => {
    setUserId(UserID)
    return localStorage.setItem("UserId", UserID);
  };
  // console.log(typeof(getToken))
  const userLogOut = () => {
    setToken("");
    setUserId("");
    localStorage.removeItem("Token");
    localStorage.removeItem("UserId");
  };
  const getAllUsers = async () => {
    try {
      const response = await fetch(`http://localhost:2000/getfriends?_limit=${limit}`, {

        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        setGetallUsers(data.data);
        setTotalcount(data.totalCount)
      }
    } catch (error) {
      console.log("get All Users error ", error);
    }
  };
  // const getAllUsers = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:2000/getfriends`, {

  //       // method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },    
  //     });
      
  //     console.log('responce', response.data);
  //     // console.log(response);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       // console.log("if responce id ok the ",data.allUsers);
  //       setGetallUsers(data);
  //     }
  //   } catch (error) {
  //     console.log("get All Users error ", error);
  //   }
  // };
  const userFetch = async () => {
    try {
      const response = await axios.get("http://localhost:2000/user", {
        // method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        const data = response.data
        // console.log("if responce id ok the ",data);
        setUser(data);
        // console.log( "user logic fetch",data);
      }
    } catch (error) {
      console.log("get user data fetch error ",error);
    }
  };

  useEffect(() => {
    if (isLogedIn) { 
      userFetch();
      getAllUsers();
    }
  }, [isLogedIn]);

  useEffect(()=>{
    getAllUsers();
    // clearTimeout(getAllUsers)
  },[limit])
  return (
    <userAuth.Provider
      value={{
        storeToken,
        setUserIdToLS,
        isLogedIn,
        getAllusers,
        user,
        token,
        userid,
        setlimit,
        limit,
        totalCount,
        userLogOut,
        notifiaction,setNotifiaction,
      }}
    >
      {/* {pass the childrens to the authprovider} */}
      {children}
    </userAuth.Provider>
  );
};
export const AuthUser = () => {
  const token = useContext(userAuth);
  if (!token) {
    throw new Error("some error in coustome hook Authprovider page");
  }
  return token;
};
