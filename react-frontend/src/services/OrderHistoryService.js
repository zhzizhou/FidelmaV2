import axios from "axios";
import {REST_API} from "../constant";

const ORDERS_REST_API_URL = REST_API + '/staff/allOrders';

class OrderHistoryService{

    getOrders(){
        return axios.get(ORDERS_REST_API_URL);
    }

    deleteOrder(orderId) {
        return axios.delete(REST_API + '/staff/deleteOrder/' + orderId);
    }

    postComplete(orderId) {
        return axios.post(REST_API + '/staff/completeOrder/' + orderId);
    }
}

export default new OrderHistoryService()