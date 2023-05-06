import React from "react";
import IngredientService from "../services/IngredientService";
import IngredientPopupComponent from "./IngredientPopupComponent";
import EditIngredientComponent from "./EditIngredientComponent";
import IngredientPopupService from "../services/IngredientPopupService";

class IngredientComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            show:false,
            foods : [],
            allIngredients:[],
            displayAddPopup:false,
            ingredientId:''
        };

        this.deleteIngredient = this.deleteIngredient.bind(this);
        this.saveIngredient = this.saveIngredient.bind(this);
    }

    deleteIngredient (id) {
        console.log(id);
        IngredientService.deleteIngredient(id).then (
            res => {
                this.setState({allIngredients:this.state.allIngredients.filter(ingredient => ingredient.id !== id)});
            }
        )
    }

    openAddPopup = () => {
        this.setState({displayAddPopup:true});
    }

    closeAddPopup = () => {
        this.setState({displayAddPopup:false});
        
    }

    componentDidMount(){
        IngredientService.getIngredients().then((respond) => {
            this.setState({allIngredients : (respond.data)});
            console.log(this.state.allIngredients);
            console.log(typeof(this.state.allIngredients[0].name));
        });
    }

    testPost(){
        IngredientService.postUsers();
    }

    handleClick (id,e){
        e.stopPropagation();
        this.setState({
            show:true,
        });
        this.setState({ingredientId:id});
    }

    close = () =>{
        this.setState({
            show:false,
        });
        
    }

    saveIngredient = (event,name,quantity,price) => {
        console.log(name);
        console.log(quantity);
        console.log(price);
        let canSend = 1;
        if (!(/^[a-zA-Z]*$/).test(name)) {
            canSend = 0;
        }else if (quantity < 0 || quantity > 99999999) {
            canSend = 0;
        } else if (price < 0 || price > 99999) {
            canSend = 0;
        }

        if (name === '') {
            canSend = 0;
        }else if (quantity === '') {
            canSend = 0;
        }else if (price === '') {
            canSend = 0;
        }

        if (canSend === 1) {
            let ingredient = {name:name,quantity:quantity,price:price}
            console.log("ingredient=> " +JSON.stringify(ingredient));
            IngredientPopupService.postIngredients(ingredient).then(res => {
                this.closeAddPopup();
                window.location.reload()
            });
        }
            
        
        

    }

    render(){
        return(
            <>
                <div className = "main">
                    <div className="ingredientHeader" data-testid= 'gg'>
                        <img className = "backButton" src = "/res/images/back.svg" alt="back to previous page" onClick={()=>window.location.href="/staff/dashboard"}/>
                    </div>
                    <div className = "titleContainer" onClick={this.close}>
                        <img className = "rawMaterialIcon" src = "/res/images/material.svg" alt="raw material icon"/>
                        <h1 className = "title">Raw Materials</h1>
                    </div>

                    <div className = "ingredientContainer">
                        <div className = "tableContainer">
                            <table className = "ingredientTable">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity(g)</th>
                                        <th>Price</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.allIngredients.map((row) =>(
                                        <tr
                                            key = {row.id} data-testid = {row.name}
                                        >
                                            <td className = "ingredientName">{row.name}</td>
                                            <td>{row.quantity}</td>
                                            <td>{row.price}</td>
                                            <td>
                                                <button className="editIngredientButton" onClick={e => this.handleClick(row.id,e)}>Edit</button>
                                                <button className="deleteIngredientButton" onClick = {() => this.deleteIngredient(row.id)}>Delete</button>
                                            </td>
                                            <td>{this.state.show && <EditIngredientComponent close = {this.close} id = {this.state.ingredientId}/>}</td>
                                        </tr>
                                        
                                    ))}
                                </tbody>
                            </table>
                            <button className="addIngredient" onClick={this.openAddPopup}>add</button>
                            {this.state.displayAddPopup && <IngredientPopupComponent saveIngredient = {this.saveIngredient} closeAddPopup = {this.closeAddPopup}/>}
                            
                        </div>
                    </div>
                </div>

                
            </>
        );
    }
}

export default IngredientComponent