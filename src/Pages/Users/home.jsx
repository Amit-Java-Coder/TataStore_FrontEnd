import React, { useContext } from 'react'
import UserContext from '../../Context/user.context'
import { Navigate } from 'react-router-dom'

const Home = () => {
   
     const userContext=useContext(UserContext)

  return (
    <div>
        {JSON.stringify(userContext.userData)}
    </div>
  )
}

export default Home