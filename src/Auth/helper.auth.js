//If we refresh the page then data of logged in user will be gone,to avoid this problem we will store the data in local Storage,using this file.

//To store the data in localStorage
export const doLoginLocalStorage=(data)=>{
 localStorage.setItem('userData',JSON.stringify(data))
}

//To fetch User from localStorage
export const getUserFromLocalStorage=()=>{
    const data = getDataFromLocalStorage()
    if(data!==null){
        return data.dto
    }
    return null
}

//To fetch the token of user from localStorage
export const getTokenFromLocalStorage=()=>{
    const data = getDataFromLocalStorage()
    if(data!==null){
        return data.jwtToken
    }
    return null
}

//To fetch data from  localStorage
export const getDataFromLocalStorage=()=>{
  const data= localStorage.getItem("userData")
  if(data!=null){
     return JSON.parse(data)
  }
  return null
}

//To remove data or Logout
export const doLogoutFromLocalStorage=()=>{
    localStorage.removeItem("userData")
}

//To check weather the user is loggedin or not
export const isLoggedIn=()=>{
    if(getTokenFromLocalStorage()){
        return true
    }
    return false
}

//To check weather User is normal or admin
export const isAdminUserLoggedIn=()=>{
    if(isLoggedIn()){
       const user = getUserFromLocalStorage()
       const roles=user.roles
       if(roles.find((role)=>role.roleId==="knfidnvdnvnvolsmlsmofo")){
         return true
       }
       return false
    }
    return false
}