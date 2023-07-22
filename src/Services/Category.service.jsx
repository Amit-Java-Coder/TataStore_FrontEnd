import axios from "axios"
import { privateAxios } from "./Axios.service"

class CategoryService{
     addCategory(category){
        return privateAxios.post("/categories",category).then((res)=>res.data)
     }

     viewCategory(){
       return privateAxios.get("/categories").then((res)=>res.data)
     }

     deleteCategory(categoryId){
       return privateAxios.delete(`/categories/${categoryId}`).then((res)=>res.data)
     }

     updateCategory(category){
       return privateAxios.put(`/categories/${category.categoryId}`,category).then((res)=>res.data)
     }
    
}

export default new CategoryService()