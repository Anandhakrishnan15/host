import { Navigate } from "react-router-dom";
import { AuthUser } from "../AuthContext/AuthProvider";
import { useEffect } from "react";
const LogOut = ()=>{
    const  {userLogOut} =AuthUser()
    useEffect(()=>{
        userLogOut();
        location.reload()
        // refreshPage();
    },[userLogOut])

    return <Navigate to="/login"/>
}

export default LogOut