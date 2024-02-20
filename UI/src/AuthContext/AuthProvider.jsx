

{
    //first we havbe to make a contaxt and create your owh user hooks
    // generate token
    // 1get the in to the localstorage
    // 2 make logout fuction and remove the token from the local storage.
    // 3 userAuthendiaction from wher we will get know weathe the user is authenticted or not 
    // and then get the data of th user using usereffect 

}

//create a coustamom hooks
import React, { createContext, useContext, useState } from 'react'

export const userAuth = createContext()

export const AuthProvider = ({children}) => {
  const [token,setToken] = useState(localStorage.getItem("Token"));//store token in localstorage

  //store token in localstorage function
  const storeToken =(Tokenprovided)=>{
    setToken(Tokenprovided)
    return localStorage.setItem('Token',Tokenprovided)

  }
  let isLogedIn = !!token;

  // console.log(typeof(getToken))
  const userLogOut = () => {
    setToken("");
    return localStorage.removeItem("Token");
    
  };


  return (
   <userAuth.Provider value={{
    storeToken,
    isLogedIn,
    // getToken
    userLogOut,
   }} >
    {/* {pass the childrens to the authprovider} */}
    {children}
   </userAuth.Provider>
  )
}
export const AuthUser = ()=>{
  const token = useContext(userAuth)
  if (!token)
  {
    throw new Error("some error in coustome hook Authprovider page")
  }
  return (token)
}


