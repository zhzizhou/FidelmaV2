import axios from "axios";
import {REST_API} from "../constant";

const USERS_REST_API_URL = REST_API + '/staff/dashboard';

class DashboardService{

    getUsers(){
        return axios.get(USERS_REST_API_URL)
    }

    postUsers(){
        return axios.post(USERS_REST_API_URL, "test");
    }
    
}

export default new DashboardService()