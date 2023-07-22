import React, { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import { isLoggedIn } from '../../Auth/helper.auth'
import UserContext from '../../Context/user.context'
import UseJwtTokenExpiration from '../../Hooks/useJwtTokenExpiration'

const Dashboard = () => {

  UseJwtTokenExpiration()
  const userContext=useContext(UserContext)
  const loggedInView=()=>{        
    return (
      <div>        
          <Outlet/>
      </div>
    )
  }
      
  //When one user will login all the pages which he/she can access,we have to make that private 
  //By putting condition we can achieve that
       return(
            (isLoggedIn())  ?  loggedInView() : <Navigate to='/login'/>
       )

}

export default Dashboard