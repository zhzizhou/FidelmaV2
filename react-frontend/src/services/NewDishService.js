import axios from "axios";
import {REST_API} from "../constant";

const DISH_REST_API_URL = REST_API + '/staff/menu/newDish';

class NewDIshService{

    getIngredients(){
        return axios.get(DISH_REST_API_URL)
    }

    createNewDish(dish) {
        return axios.post(DISH_REST_API_URL,dish)
    }

    deleteDish(dishId) {
        return axios.delete(DISH_REST_API_URL+'/' + dishId);
    }

    //{headers:{"Content-Type":"multipart/form-data"}}
    sendImage(image) {
        return axios.post(REST_API + '/staff/menu/newDishImage',image);
    }
    
}

export default new NewDIshService()