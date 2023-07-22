import React, { useContext, useEffect, useState } from 'react'
import CartContext from './cart.context'
import CartSevice from '../Services/Cart.sevice'
import { toast } from 'react-toastify'
import UserContext from './user.context'

const CartProvider = ({children}) => {

  const {isLogin,userData}=useContext(UserContext)
  const [cart,setCart]=useState(null)
  useEffect(()=>{
    try{
      if(isLogin){
        loadUserCart(userData.dto.userId)
        console.log(userData.dto.userId)
      }else {
        setCart(null);
      }
    }catch(error){
       //console.log(error)
    }
  },[isLogin])


  const loadUserCart=(userId)=>{
      CartSevice.getCart(userId).then((res)=>{
        console.log(res)
        setCart(res)
      }).catch((error)=>{
        //console.log(error)
        setCart(null)
        //toast.error("Cart couldn't fetch!!!")
      })
  }

  //Add item to Cart
  const addItemToCart=(productId,quantity)=>{
    if(isLogin){
     CartSevice.addToCart(userData.dto.userId,productId,quantity).then((res)=>{
      setCart(res)
      toast.success("Item updated in Cart...")
     }).catch((error)=>{
      console.log(error)
      toast.error("Item updated in Cart!!!")
     })
    }
    else{
      toast.info("Please do login to add items to Cart...")
    }
  }

  //Remove item from cart
  const removeItemFormCart=(itemId)=>{
     CartSevice.removeItemFromcart(userData.dto.userId,itemId).then((res)=>{
      console.log(res)
      toast.success("Item removed from Cart!!!")

      const newItemList=cart.items.filter((item)=>{
          return (item.cartItemId !== itemId)
      })

      setCart({...cart,newItemList})
     }).catch((error)=>{
      console.log(error)
      toast.error("Item couldn't remove!!!")
     })
  }

  return (
      <CartContext.Provider value={{
        cart:cart,
        setCart:setCart,
        addItemToCart:addItemToCart,
        removeItemFormCart:removeItemFormCart,
        loadUserCart:loadUserCart
      }}>{children}</CartContext.Provider>
  )
}

export default CartProvider