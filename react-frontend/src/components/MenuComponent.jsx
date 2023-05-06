import React from "react";
import MenuService from "../services/MenuService";
import NewDishService from "../services/NewDishService";

class MenuComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {foods : [],imageDic:{}};
        this.deleteDish = this.deleteDish.bind(this);
    }


    deleteDish(id) {
        NewDishService.deleteDish(id).then(
            res => {
                this.setState({foods:this.state.foods.filter(food => food.id !== id)});
                console.log(this.state.foods);
            }
        )
    }

    componentDidMount() {
        MenuService.getUsers(this.props.location.state).then((respond) => {
            this.setState({foods: (respond.data)});
            console.log(this.state.foods);
        });
    }

    accessEditingMode(){
        let editBtn =  document.getElementById("editBtn");
        let addBtnAreas = document.getElementsByClassName("addDishArea");
        let delBtns = document.getElementsByClassName("staffMenuDeleteButton");
        let updateButton = document.getElementsByClassName("staffMenuUpdateButton");

        if (editBtn.innerHTML === "Edit"){
            editBtn.innerHTML = "Editing";
            document.getElementById("addMoreButton").style.display = "flex";
            
            for(let i = 0; i < addBtnAreas.length; i++){
                addBtnAreas[i].style.display = "none"
                delBtns[i].style.display = "block"
                updateButton[i].style.display = "block"
            }

        } else {
            editBtn.innerHTML = "Edit";
            document.getElementById("addMoreButton").style.display = "None";

            for(let i = 0; i < addBtnAreas.length; i++){
                addBtnAreas[i].style.display = "block"
                delBtns[i].style.display = "none"
                updateButton[i].style.display = "none"
            }
        }
    };

    editMode(){
        let editBtn =  document.getElementById("editBtn");
        let delBtns = document.getElementsByClassName("staffMenuDeleteButton");
        let updateButton = document.getElementsByClassName("staffMenuUpdateButton");

        if (editBtn.innerHTML === "Edit"){
            editBtn.innerHTML = "Editing";
            document.getElementById("addMoreButton").style.display = "flex";

            for(let i = 0; i < delBtns.length; i++){
                delBtns[i].style.display = "block";
                updateButton[i].style.display = "block";
            }
        } else {
            editBtn.innerHTML = "Edit";

            for(let i = 0; i < delBtns.length; i++){
                delBtns[i].style.display = "none"
                updateButton[i].style.display = "none"
            }
        }
    }

    async editDish(dish) {
        await this.props.history.push(`/staff/menu/edit/${dish.id}`,dish);
    }

    capitalizeFirst (str) {
        if (!str) {
            return "s";
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    };


    createDish(type) {
        this.props.history.push("/staff/menu/newDish",type);
        
    }

    render(){
        return(
            <>
                <div>
                    <div className="menuHead">
                        <img id="menuPic" src="/res/images/menuBackground.jpg" alt="menu head background" />
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                        
                    </div>

                    <div id ="menuBox"><span id="menuWord">menu</span></div>
                    <div className="nav">
                        <input name="returnBtn" type="image" onClick={()=>window.location.href="/staff/mainMenu"} src="/res/images/arrow.png" alt="return button icon" />
                    </div>
                    <div className="innerMenuContainer">
                        <div className = "menuTitle">
                            <h2 id = "menuTitleWord">{
                            
                                this.capitalizeFirst(this.props.location.state)
                            
                            }</h2>
                        </div>
                        <button id="editBtn" type="button" onClick={this.editMode}>Edit</button>
                    </div>

                    <div>
                        {this.state.foods.map((dish) => (
                            <div className="foodUnit" key={dish.id}>
                           <hr className="separateLine"/>
                            <div className="foodBox">
                            </div>
                            <div className = "staffMenuGridContainer">
                                <div className = "staffMenuPic">{dish.image !== undefined &&<img className = "gridPic" src={`data:image/jpeg;base64,${dish.image}`} alt="dish pic"/>}</div>
                                {
                                    dish.crash === false && <div className = "staffMenuName"><strong>{dish.name}</strong></div>
                                }
                                {
                                    dish.crash === true && 
                                    <div className = "staffMenuName crashDish">
                                        <div><strong>{dish.name}</strong></div>
                                        <div><strong>Ingredient Error!</strong></div>
                                    </div>
                                    
                                }
                                <div className = "staffMenuDes">{dish.description}</div>
                                <div className = "staffMenuCalorie"><strong>{dish.kiloJoule}KJ</strong></div>
                                <div className = "staffMenuPrice"><strong>${dish.price}</strong></div>
                                <div className = "staffMenuOperation">
                                    <button className = "staffMenuDeleteButton addDishArea" id = "staffMenuDeleteButton" onClick = {() => this.deleteDish(dish.id)}>delete</button>
                                    <button className = "staffMenuUpdateButton addDishArea" id = "staffMenuUpdateButton" onClick = {()=> this.editDish(dish)}> Update</button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <button id="addMoreButton" onClick={()=>this.createDish(this.props.location.state)}>Add more dish</button>
                </div>
            </>
        );
    }

}

export default MenuComponent