import React, { useContext, useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../Auth/helper.auth'
import { isJwtExpired } from 'jwt-check-expiration'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../Context/user.context'

const UseJwtTokenExpiration = () =>{
    
  const token=getTokenFromLocalStorage()
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate()
  const {logout}=useContext(UserContext)

  useEffect(()=>{
    try{
        if(isJwtExpired(token)){
            console.log("Token Is Expired")
            setFlag(true)
            toast.error("Token Is Expired!!! Relogin...")
            navigate("/login")
        }
    }catch (error) {
      console.log(error);
    }
  },[])

  return flag 
}

export default UseJwtTokenExpiration