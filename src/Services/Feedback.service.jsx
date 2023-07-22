import { privateAxios } from "./Axios.service"

class FeedbackService{

    getAllFeedbackOfSingleProduct(productId){
        return privateAxios.get(`/feedbacks/${productId}`).then((res)=>
            res.data
        )
    }

    addFeedback(userId,productId,feedback){
        return privateAxios.post(`/feedbacks/${userId}/${productId}`,feedback).then((res)=>
            res.data
        )
    }

    deleteFeedback(feedbackId){
        return privateAxios.delete(`/feedbacks/${feedbackId}`).then((res)=>
            res.data
        )
    }

    editFeedback(feedbackId,feedback){
        return privateAxios.put(`/feedbacks/${feedbackId}`,feedback).then((res)=>
            res.data
        )
    }

}
export default new FeedbackService()