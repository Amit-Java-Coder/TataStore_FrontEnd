import { createContext } from "react";

//To send the data from one component to another we can use props,for which will have to write a lot of code and the prject will look messy,so we are using Context Api...
const UserContext = createContext(null)

export default UserContext