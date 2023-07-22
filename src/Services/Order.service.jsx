import { privateAxios } from "./Axios.service"

class OrderService{

    getAllOrders( pageNumber = 0,pageSize = 10,sortBy = "orderedDate",sortDir = "desc"){
        return privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    }

    updateOrder(order,orderId){
        return privateAxios.put(`/orders/${orderId}`,order).then((res)=>
            res.data
        )
    }

    deleteOrder(orderId){
        return privateAxios.delete(`/orders/${orderId}`).then((res)=>
            res.data
        )
    }

    createOrder(orderDetails){
        return privateAxios.post(`/orders`,orderDetails).then((res)=>
           res.data
       )
    }

    getOrderOfUser(userId){
        return privateAxios.get(`/orders/user/${userId}`).then((res)=>
           res.data
       )
    }
}

export default  new OrderService()