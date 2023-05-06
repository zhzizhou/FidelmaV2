import React from "react";
import MenuService from "../services/MenuService";
class CustomerMenuComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {foods : [], foodsInCart : [], tableNum : '', phone : '', cartOpen : false}
    }


    componentDidMount(){
        MenuService.getUsers(this.props.location.state[this.getLast(this.props.location.state)]).then((respond) => {
            this.setState({foods : (respond.data)});
            console.log(typeof(this.state.foods));
            console.log((respond.data));
        });
        if (typeof(this.props.location.state[2]) != "undefined"){
            this.setState({foodsInCart : this.props.location.state[2]})
        }
        this.setState({
            tableNum : this.props.location.state[0],
            phone : this.props.location.state[1]
        })
    }

    capitalizeFirst (str) {
        if (!str) {
            return "s";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    

    returnMainMenu(){
        let type = this.props.location.state[this.props.location.state.length-1]
        this.props.history.push("/customer/mainMenu", [this.state.tableNum, this.state.phone ,this.state.foodsInCart ,type])
    }

    viewInDetails(dish){
        let type = this.props.location.state[this.props.location.state.length-1]
        this.props.history.push("dishDescription",[this.state.tableNum, this.state.phone,this.state.foodsInCart, dish ,type])
    }

    getLast(arr) {
        return arr.length-1;
    }

    // shopping cart functions
    goToConfirmOrder(){
        this.props.history.push("/customer/confirmPage", [this.state.tableNum, this.state.phone, this.state.foodsInCart])
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
        this.setState({cartOpen : true})
    }

    closeCart(){
        if (this.state.cartOpen === true){
            this.setState({cartOpen : false})
            this.toggleWithCart()
        }
    }

    toggleWithCart(){
        let cart = document.getElementById("cartArea")
        cart.classList.toggle('active')
        let closeCartArea = document.getElementById("closeCartArea")
        closeCartArea.classList.toggle('active')
    }

    render(){
        return(
            <>
                <div id="closeCartArea" onClick={()=>this.closeCart()}></div>
                <div id="normlaStateMenu">
                    <div className="menuHead">
                        <img id="menuPic" src="/res/images/menuBackground.jpg" alt="menu head background pic" />
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                        
                    </div>

                    <div id ="menuBox"><span id="menuWord">menu</span></div>
                    <div className="nav">
                        <input name="returnBtn" type="image" onClick={() => this.returnMainMenu()} src="/res/images/arrow.png" alt="return button icon" />
                        <span>Table No.{this.state.tableNum}</span>
                    </div>
                    <div className="innerMenuContainer">
                        <div className = "menuTitle">
                            <h2 id = "menuTitleWord">{
                                
                                this.capitalizeFirst(this.props.location.state[this.getLast(this.props.location.state)])
                            
                            }</h2>
                        </div>
                    </div>
                    
                    <div>
                        {this.state.foods.map((dish) => (
                            <div className="foodUnit" key={dish.id}>
                           <hr className="separateLine"/>
                            <div className = "customerMenuGridContainer">
                                <div className = "customerMenuPic">{dish.image !== undefined &&<img className = "gridPic" src={`data:image/jpeg;base64,${dish.image}`} alt="dish pic"/>}</div>
                                <div className = "customerMenuName"><strong>{dish.name}</strong></div>
                                <div className = "customerMenuDes">{dish.description}</div>
                                <div className = "customerMenuCalorie"><strong>{dish.kiloJoule}KJ</strong></div>
                                <div className = "customerMenuPrice"><strong>${dish.price}</strong></div>
                                <div className = "customerMenuOperation">
                                {
                                    dish.crash === true && <div className="soldOutDiv addDishArea">Not Available</div>
                                }
                                {
                                    dish.crash === false && dish.soldOut === true && <div className="soldOutDiv addDishArea">Sold Out</div>
                                }
                                {
                                    dish.soldOut === false && dish.crash === false && <input className="arrowBtn" name="arrowBtn" type="image" src="/res/images/arrowIcon.png" alt="view more arrow icon" 
                                    onClick={()=>this.viewInDetails(dish)}/>
                                }
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                    <input id="shoppingCart" name="shoppingCartBtn" type="image" src="/res/images/shoppingCart.png" alt="shopping cart icon" onClick={()=>this.showCart()}/>
                    
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

export default CustomerMenuComponent