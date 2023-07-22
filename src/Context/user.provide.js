import React, { useContext, useEffect, useState } from 'react'
import UserContext from './user.context'
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isAdminUserLoggedIn, isLoggedIn } from '../Auth/helper.auth'

const UserProvider = ({children}) => {

      const [isLogin,setIsLogin]=useState(false)
      const [userData,setUserData]=useState(null)
      const [isAdminUser,setAdminUser]=useState(false)

      useEffect(()=>{
            setIsLogin(isLoggedIn())
            setAdminUser(isAdminUserLoggedIn())
            setUserData(getDataFromLocalStorage())
      },[])

      const doLogin=(userData)=>{
           doLoginLocalStorage(userData)
           setIsLogin(true)
           setAdminUser(isAdminUserLoggedIn())
           setUserData(getDataFromLocalStorage())
      }

      const doLogout=()=>{
           doLogoutFromLocalStorage()
           setIsLogin(false)
           setAdminUser(isAdminUserLoggedIn())
           setUserData(null)
      }

  return (
    <UserContext.Provider value={{userData:userData,
                                  setUserData:setUserData,
                                  isLogin:isLogin,
                                  setIsLogin:setIsLogin,
                                  login:doLogin,
                                  logout:doLogout,
                                  isAdminUser:isAdminUser}}>  
                {children}
    </UserContext.Provider>
  )
}

export default UserProvider