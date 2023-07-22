import { privateAxios } from "./Axios.service";

class ProductService{
     
    createProductWithoutCategory(product){
        return privateAxios.post('/products',product).then((res)=>
            res.data
        )
    }

    createProductInCategory(product,categoryId){
        return privateAxios.post(`/categories/${categoryId}/products`,product).then((res)=>
            res.data
        )
    }

    getAllProducts( pageNumber = 0,pageSize = 1000,sortBy = "addedDate",sortDir = "asc"){
        return privateAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data)
    }

    deleteProduct(productId){
        return privateAxios.delete(`/products/${productId}`).then((res)=>
            res.data
        )
    }

    updateProduct(product,productId,categoryId){
        return privateAxios.put(`/products/${productId}/${categoryId}`,product).then((res)=>
           res.data
        )
    }

    updateProductCategory(categoryId,productId){
        return privateAxios.put(`/categories/${categoryId}/products/${productId}`).then((res)=>
           res.data     
        )
    }

    searchProducts(query){
        return privateAxios.get(`/products/search/${query}`).then((res)=>
          res.data
        )
    }

    getAllLiveProducts(pageNumber = 0,pageSize = 1000,sortBy = "title",sortDir = "asc"){
        return privateAxios.get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((res)=>
          res.data
        )
    }

    getProductById(productId){
        return privateAxios.get(`/products/${productId}`).then((res)=>
          res.data
        )
    }


    getAllProductsOfCategory(categoryId,pageNumber = 0,pageSize = 10,sortBy = "title",sortDir = "asc"){
        return privateAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then((res)=>
          res.data
        )
    }
}

export default  new ProductService()