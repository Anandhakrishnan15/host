import axios from 'axios'
import React, { useState } from 'react'

const GetallUsersHooks = () => {
const  [getAllusers,setGetallUsers]=useState([])
const getUsersFetch=async()=>{
    try {
        const getData = await axios.get("http://localhost:2000/users")
        const usergetails = getData.json()
        if(usergetails.error)
        {
            throw new Error(usergetails.error)
        }
        setGetallUsers(usergetails.allUsers)
    } catch (error) {
        console.log("get All Users error ",error );
    }
}
return {getAllusers}
}
export default GetallUsersHooks