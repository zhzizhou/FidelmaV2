import axios from "axios";
import {REST_API} from "../constant";

const USERS_REST_API_URL = REST_API + '/staff/menu/';

class UserService{

    getUsers(type){
        return axios.get(USERS_REST_API_URL + type)
    }

    postUsers(type){
        return axios.post(USERS_REST_API_URL+type, "test");
    }
    
}

export default new UserService()