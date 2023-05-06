import axios from "axios";
import {REST_API} from "../constant";

const USERS_REST_API_URL = REST_API + '/staff/ingredient';

class IngredientService{

    getIngredients(){
        return axios.get(USERS_REST_API_URL)
    }

    postIngredients(ingredient){
        return axios.post(USERS_REST_API_URL,ingredient);
    }
    
}

export default new IngredientService()