import React from "react";


class CustomerMainMenuComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = { foodsInCart : [], tableNum : '', phone : '', cartOpen : false}
    }

    componentDidMount(){
        if (typeof(this.props.location.state[2]) != "undefined"){
            this.setState({foodsInCart : this.props.location.state[2]})
        }
        this.setState({tableNum : this.props.location.state[0], phone : this.props.location.state[1]})
    }

    goToChicken(){
        this.props.history.push("/customer/menu/chicken", [this.state.tableNum, this.state.phone,this.state.foodsInCart, "chicken"])
    }

    goToBeef(){
        this.props.history.push("/customer/menu/beef" ,[this.state.tableNum, this.state.phone,this.state.foodsInCart, "beef"])
    }

    goToChips(){
        this.props.history.push("/customer/menu/chip" ,[this.state.tableNum, this.state.phone,this.state.foodsInCart, "chip"])
    }

    goToSides(){
        this.props.history.push("/customer/menu/side" ,[this.state.tableNum, this.state.phone,this.state.foodsInCart, "side"])
    }

     // shopping cart functions
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
            this.setState({cartOpen:false})
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
                    <div className="menuHead">
                        <img id="menuPic" src="/res/images/menuBackground.jpg" alt="menu pic" />
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                        
                    </div>

                    <div id ="menuBox"><span id="menuWord">menu</span></div>
                    <div className="mainMenuTableNum">
                        <span>Table No.{this.props.location.state[0]}</span>
                    </div>

                    <div>
                        <h2 id = "mainMenuChickenHead"> Beef </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/beef1.jpg" alt="menu pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">100% Australian grain-fed beef, paired with selected fresh vegetables and delicious sauces,
                                can bring you the ultimate dining experience.</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.goToBeef()}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>
                    
                    <div>
                        <h2 id = "mainMenuChickenHead"> Chicken </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/chicken2.jpg" alt="menu pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">High-quality chicken is chosen from family farms. 100% natual and hormone free.</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.goToChicken()}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>

                    <div>
                        <h2 id = "mainMenuChickenHead"> Chip </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/cheeseFires.jpg" alt="menu pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">Choose fresh potatoes from premium Australian farms</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.goToChips()}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>

                    <div>
                        <h2 id = "mainMenuChickenHead"> Side </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/onionRing.jpg" alt="menu pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">100% Australian fresh high quality onions for deep frying and deep frying in high quality corn oil.</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.goToSides()}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>

                    <input id="shoppingCart" name="shoppingCartBtn" type="image" src="/res/images/shoppingCart.png" alt="shopping cart icon" onClick={() => this.showCart()}/>

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

export default CustomerMainMenuComponent