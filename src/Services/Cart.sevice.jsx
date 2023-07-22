import { privateAxios } from "./Axios.service"

class CartService{
    
    addToCart(userId,productId,quantity){
        return privateAxios.post(`/carts/${userId}`,{productId,quantity}).then((res)=>
           res.data
        )
    }
    
    getCart(userId){
        return privateAxios.get(`/carts/${userId}`).then((res)=>
           res.data
        )
    }
    
    clearCart(userId){
        return privateAxios.delete(`/carts/${userId}`).then((res)=>
           res.data
        )
    }
    
    removeItemFromcart(userId,itemId){
        return privateAxios.put(`/carts/${userId}/items/${itemId}`).then((res)=>
           res.data
        )
    }

}

export default new CartService()