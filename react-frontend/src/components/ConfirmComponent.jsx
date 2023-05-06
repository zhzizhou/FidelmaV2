import React from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import {REST_API} from "../constant";

class ConfirmComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {foodsInCart : [], tableNum : '', phone : '',orderComment:''}
        this.nameHandler = this.nameHandler.bind(this);
        this.saveOrder = this.saveOrder.bind(this);

    }

    nameHandler = (event) => {
        this.setState({orderComment:event.target.value});
    }

    componentDidMount(){
        console.log(this.props.location.state)
        if (typeof(this.props.location.state[2]) != "undefined"){
            this.setState({foodsInCart : this.props.location.state[2]})
        }
        this.setState({tableNum :  this.props.location.state[0]})
        this.setState({phone : this.props.location.state[1]})
    }

    backToMainMenu(){
        this.props.history.push("/customer/mainMenu",[this.state.tableNum, this.state.phone, this.state.foodsInCart])
    }

    calculateTotalPrice(){
        let totalPrice = 0;
        for (let i = 0; i < this.state.foodsInCart.length; i++){
            let dishInCart = this.state.foodsInCart[i]
            totalPrice += dishInCart.price * dishInCart.quantity
        }
        return totalPrice.toFixed(1)
    }

    saveOrder = (e) => {
        e.preventDefault();
        // let order = {
        //     tableNum
        // }
        // axios.post("http://localhost:8080/customer/orderConfirm",).then()
        console.log(this.state.foodsInCart);
        let cart = {};
        for (var i = 0; i < this.state.foodsInCart.length; i++) {
            cart[this.state.foodsInCart[i].id] = [this.state.foodsInCart[i].quantity,this.state.foodsInCart[i].price,this.state.foodsInCart[i].name];
        }
        
        const unique_id = uuid();
        let order = {
            id:unique_id,
            tableNumber : this.state.tableNum,
            phoneNumber : this.state.phone,
            name : this.state.orderComment,
            cart
        }
        console.log("order=> " + JSON.stringify(order));
        axios.post( REST_API + "/customer/orderConfirm",order).then( (res) => {
            console.log(res.data)

            if (res.data === 1){
                this.openPopUpWindow("ingredientWarning")
            } else if (res.data === 2){
                this.props.history.push("/submitPage",this.props.location.state);
            } else {
                this.openPopUpWindow("systemErrorWarning")
            }
        })
        
    }

    openPopUpWindow(id){
        let window = document.getElementById(id)
        window.style.display = "flex"
    }

    closeIngredientPopWindow(){
        let window = document.getElementById("ingredientWarning")
        window.style.display = "none"
    }

    closeSystemErrorPopWindow(){
        let window = document.getElementById("systemErrorWarning")
        window.style.display = "none"
    }

    closePopWindow(id){
        console.log(id)
        let window = document.getElementById(id)
        console.log(window)
        window.classList.toggle('active')
    }

    render(){
        return(
            <>
                <div>
                    <div className = "confirmHead">
                        <img className = "orderBackButton" src = "/res/images/back.svg" alt="back to previous page" onClick={() => this.backToMainMenu()}/>
                        <h4>Fidelma</h4>
                    </div>
                    <div className = "orderTitle">
                        <div className = "orderTableNum">
                            <h4><strong>Table No.</strong></h4>
                            <h4>{this.state.tableNum}</h4>
                        </div>
                        <div className = "orderPhoneNum">
                            <h4>Phone Numebr:</h4>
                            <h4>{this.state.phone}</h4>
                        </div>
                    </div>
                    <hr className = "confirmSeparateLine"/>
                    <div className = "orderDetail">
                        {this.state.foodsInCart.map((dish) =>(
                            <div className = "grid-container" key = {dish.id}>
                                <div className = "item1">
                                    <img className = "gridPic" src={`data:image/jpeg;base64,${dish.image}`} alt="dish pic"/>
                                </div>
                                <div className = "item2"><strong>{dish.name}</strong></div>
                                <div className = "item3">add-on details: xxxx</div>
                                <div className = "item4"><strong>x{dish.quantity}</strong></div>
                                <div className = "item5"><strong>${(dish.price*dish.quantity).toFixed(1)}</strong></div>    
                            </div>
                        ))}
                        <div className = "addComment">
                            <div className = "commentTitle">
                                <h4>Please leave comment here</h4>
                            </div>   
                            <form>
                                <input className = "orderComment" type = "text" name = "orderInput"
                                value = {this.state.orderComment} onChange={this.nameHandler}/>
                            </form>
                        </div>
                    </div>
                    <div className = "finishOrder">
                        <div className = "totalCost">
                            <h4><strong>Total:</strong></h4>
                            <h4><strong>${this.calculateTotalPrice()}</strong></h4>
                        </div> 
                        <button className = "finishOrderButton" onClick = {this.saveOrder} >Order Now</button>
                        
                    </div>
                </div>


                <div className="popUpWarning" id="ingredientWarning">
                    <div className="popUpTitle popUpItem"><strong>Not enough Ingredient</strong></div>
                    <div className="popUpContent popUpItem">Order is not submit successfully, please seek assistance from Staff members</div>
                    <button className="popUpBtn popUpItem" onClick={()=>this.closeIngredientPopWindow()}>OK</button>
                </div>

                <div className="popUpWarning" id="systemErrorWarning">
                    <div className="popUpTitle popUpItem"><strong>System Error!</strong></div>
                    <div className="popUpContent popUpItem">Order is not submit successfully, please seek assistance from Staff members</div>
                    <button className="popUpBtn popUpItem" onClick={()=>this.closeSystemErrorPopWindow()}>OK</button>
                </div>

            </>
        );
    }
}

export default ConfirmComponent