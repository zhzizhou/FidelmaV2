import React from "react";
import DescriptionService from "../services/DescriptionService";

class DescriptionComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            quantity: 1,
            foodsInCart : [], 
            type : null,
            tableNum: '',
            phone : '',
            cartOpen : false,
        }
    }

    testPost(){
        DescriptionService.postUsers();
    }

    removeDish(){
        if(this.state.quantity > 1){
            this.setState({
                quantity:this.state.quantity - 1
            });
        }
        
    }

    addDish(){
        this.setState({
            quantity:this.state.quantity + 1
        });
    }

    componentDidMount(){
        if (typeof(this.props.location.state) != "undefined"){
            this.setState({foodsInCart : this.props.location.state[2], type : this.props.location.state[4]})
        }
        this.setState({tableNum : this.props.location.state[0], phone : this.props.location.state[1]})
    }

    getIngredient(){
        let ingredients = this.props.location.state[3].components;
        const Ingredients = Object.keys(ingredients)
        .filter((key) => ingredients[key] !== 0)
        .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: ingredients[key]
            });
        }, {});

        return Object.keys(Ingredients).join(', ');
    }
    

    backToTypeMenu(){
        this.props.history.push("/customer/menu/chicken",[this.props.location.state[0], this.props.location.state[1], this.state.foodsInCart, this.state.type])
    }

    // shopping cart functions
    storeInCart(dish){ 
        this.addToCartAnimation()
        let cart = this.state.foodsInCart
        let foodIndexInCart = this.findFoodIndexInCart(dish.id, cart)
        if (foodIndexInCart === -1){
            cart.push({
                id : dish.id,
                name : dish.name, 
                price: dish.price, 
                quantity: this.state.quantity,
                image : this.props.location.state[3].image
            })
        } else {
            cart[foodIndexInCart].quantity += this.state.quantity
        }
        this.setState({foodsInCart : cart})
    }

    addToCartAnimation(){
        let container = document.getElementsByClassName("photoContainer")[0]
        let p = document.getElementsByClassName("dishPhoto")[0]
        let newI = document.createElement("img")
        newI.src = p.src
        newI.className = "movingDishPhoto"
        container.appendChild(newI)
        setTimeout(() => {
            newI.classList.toggle('active')
            setTimeout(()=>{
                newI.remove()
            },500)
        }, 1)
            
    }

    calculateTotalPrice(){
        let totalPrice = 0;
        for (let i = 0; i < this.state.foodsInCart.length; i++){
            let dishInCart = this.state.foodsInCart[i]
            totalPrice += dishInCart.price * dishInCart.quantity
        }
        return totalPrice.toFixed(1)
    }

    changeDishQuantity(dishInCart, action){
        let cart = this.state.foodsInCart
        let foodIndex = this.findFoodIndexInCart(dishInCart.id, cart)
        if (action === 'add'){
            this.addDishQuantity(cart, foodIndex)
        } else if (action === 'delete') {
            this.deleteDishQuantity(cart, foodIndex)
        }
    }

    addDishQuantity(cart, foodIndex){
        if (foodIndex !== -1){
            cart[foodIndex].quantity += 1
            this.setState({foodsInCart : cart})
        } else {
            console.log("Error, try to add quantity of dish that not exist in the food cart")
        }
    }

    deleteDishQuantity(cart, foodIndex){
        if (foodIndex !== -1){
            cart[foodIndex].quantity -= 1
            if (cart[foodIndex].quantity === 0){
                cart.splice(foodIndex, 1)
            }
            // must use set state function 
            // set state will tell react to rerender this page
            // if change the value of state without set state
            // it will just simply change the store in state
            this.setState({foodsInCart : cart})
        } else {
            console.log("Error, try to delete quantity of dish that not exist in the food cart")
        }
    }

    findFoodIndexInCart(id, cart){
        for (let i = 0; i < cart.length; i++){
            if (id === cart[i].id){
                return i
            }
        }
        return -1
    }

    showCart(){
        this.toggleWithCart()
        this.setState({cartOpen: true})
    }

    closeCart(){
        if (this.state.cartOpen === true){
            this.setState({cartOpen: false})
            this.toggleWithCart()
        }
    }

    toggleWithCart(){
        let cart = document.getElementById("cartArea")
        cart.classList.toggle('active')
        let closeCartArea = document.getElementById("closeCartArea")
        closeCartArea.classList.toggle('active')
    }

    goToConfirmOrder(){
        this.props.history.push("/customer/confirmPage", [this.state.tableNum, this.state.phone, this.state.foodsInCart])
    }


    render(){
        return(
            <>
                <div id="closeCartArea" onClick={()=>this.closeCart()}></div>
                <div>
                    <div className = "dishHead">
                        <img className = "orderBackButton" src="/res/images/arrow.png" alt = "back" onClick={() => this.backToTypeMenu()} />
                        <h4>{this.props.location.state[3].name}</h4>
                    </div>
                    <div className = "photoContainer">
                        <img className = "dishPhoto" src={`data:image/jpeg;base64,${this.props.location.state[3].image}`} alt="dishPhoto"/>
                    </div>
                    <hr className = "dishSeparateLine"/>
                    <div className = "descriptionContainer">
                        <div className = "descriptionTitle">
                            <h4><strong>{this.props.location.state[3].name}</strong></h4>
                            <h4 className = "dishPrice">${this.props.location.state[3].price}</h4>
                        </div> 
                        <div className = "descriptionContent">
                            <p>{this.props.location.state[3].description}</p>
                        </div>
                    </div>
                    <div className = "dishIngredient">
                        <h4 className = "descriptionTitle">Ingredients:</h4>
                        <div className = "allIngredient">{this.getIngredient()}</div>
                    </div>
                    <div className = "dishQuantity">
                        <img className = "removeDish" src = "/res/images/back.svg" onClick = {this.removeDish.bind(this)} alt = "removeDish"/>
                        <div className = "currQuantity">{this.state.quantity}</div>
                        <img className = "addDish" src = "/res/images/back.svg" onClick = {this.addDish.bind(this)} alt = "addDish"/>
                    </div>
                    <div className = "addToOrder">
                        <img id="shoppingCart" src = "/res/images/shoppingCart.png" onClick={()=>this.showCart()} alt = "shoppingCart"/>
                        <button className = "addToOrderButton" 
                        onClick={() => this.storeInCart(this.props.location.state[3])}>Add to order</button>
                    </div>
                </div>

                <div className="cart" id="cartArea">
                    <span>Already Selected</span>
                    {this.state.foodsInCart.map((dishInCart) => (
                    <div className="foodBoxInCart" key={dishInCart.id}>
                        <div className="foodDescBoxInCart">
                            <img src={`data:image/jpeg;base64,${dishInCart.image}`} alt="food pic"/>
                            <div className="foodTextContentInCart">
                                <div className="foodNameInCart"><strong>{dishInCart.name}</strong></div>
                                <div className="foodPriceInCart">${dishInCart.price}</div>
                            </div>
                        </div>

                        <div className="changeQuantityArea">
                        <input className="QuantityBtnIconInCart" type="image" src="/res/images/deleteButton.png" alt="delete Button icon in food cart" onClick={()=>this.changeDishQuantity(dishInCart, 'delete')}/>
                        <div className = "currentQuantity">{dishInCart.quantity}</div>
                        <input className="QuantityBtnIconInCart" type="image" src="/res/images/addButton.png" alt="addButton icon in food cart" onClick={()=>this.changeDishQuantity(dishInCart, 'add')}/>
                        </div>
                    </div>
                    ))}
                    <div className="cartInfo">
                        <span>Total: ${this.calculateTotalPrice()}</span>
                        <button onClick={() => this.goToConfirmOrder()}>Order Now</button>
                    </div>
                </div>
            </>
        );
    }
}

export default DescriptionComponent