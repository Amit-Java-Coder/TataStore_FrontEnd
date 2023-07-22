import axios from "axios";
import { privateAxios} from "./Axios.service";
//User related methods are written here and we can invoke it in our serviceProvider file which will make changes in backend as well as in user-interface...
class UserService{
      registerUser(user){
            return axios.post("/users",user);
      }

      loginUser(loginData){
            return axios.post("/auth/login",loginData).then((res)=>res.data)
      }

      getUserData(userId){
            return axios.get(`/users/${userId}`).then((res)=>res.data)
      }

      updateUser(user){
            return privateAxios.put(`/users/${user.userId}`,user).then((res)=>res.data)
      }

      getAllUsers(pageNumber = 0,pageSize = 10,sortBy = "addedDate",sortDir = "asc"){
            return privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((res)=>res.data 
            )
      }
} 
export default new UserService()