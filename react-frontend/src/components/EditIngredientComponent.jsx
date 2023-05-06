import React,{Component} from "react";
import IngredientService from "../services/IngredientService";
import BackDrop from "./BackDrop";

class EditIngredientComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            name:'',
            quantity:'',
            price:''
        }
        this.nameHandler = this.nameHandler.bind(this);
        this.quantityHandler = this.quantityHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.saveIngredient = this.saveIngredient.bind(this);
    }
    
    componentDidMount(){
        console.log(this.props.id);
        IngredientService.getIngredientById(this.props.id).then( (res) => {
            let ingredient = res.data;
           
            this.setState({
                name : ingredient.name,
                quantity : ingredient.quantity,
                price: ingredient.price    
            });
        });
    }

    nameHandler = (event) =>{
        this.setState({name:event.target.value});
    }

    quantityHandler = (event) =>{
        this.setState({quantity:event.target.value});
    }

    priceHandler = (event) =>{
        this.setState({price:event.target.value});
    }

    saveIngredient = (event) => {
        event.preventDefault();
        let ingredient = {name:this.state.name,quantity:this.state.quantity,price:this.state.price}
        console.log("ingredient=> " +JSON.stringify(ingredient));
        IngredientService.editIngredient(ingredient,this.props.id).then(res => {
            this.props.close();
            window.location.reload();
        });

    }
    
    test = () => {
        console.log(this.state.name);
        console.log(!(/^[a-zA-Z]*$/).test(this.state.name));
    }

    render() {
        return (
            <React.Fragment>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
            <form>
                <div className="editPopup">
                    <h2 className="editPopupTitle" >Editing ingredient  <button className="closeAddPopup" onClick = {this.props.close}>x</button></h2>
                    

                    <h3 className="editPopupSubTtile1">Name</h3>
                    <input className="editPopupInput1" type="text" maxLength = "15"
                    value = {this.state.name} onChange={this.nameHandler} />
                    {this.test()}
                    {this.state.name && !(/^[a-zA-Z]*$/).test(this.state.name) && <span className="errorEdit" data-testid="error-msg-name">Please enter a valid name.</span>}
                    
                    <h3 className="editPopupSubTtile2">Quantity</h3>
                    <input className="editPopupInput2" type="number" min = "0" max = "99999999"
                    value = {this.state.quantity} onChange={this.quantityHandler} />
                    {this.state.quantity && (this.state.quantity < 0 || this.state.quantity > 99999999) &&<span className="errorEdit" data-testid="error-msg-quantity">Please enter a valid quantity.</span>} 

                    <h3 className="editPopupSubTtile3">Price</h3>
                    <input className="editPopupInput3" type="number" min = "0" max = "99999"
                    value = {this.state.price} onChange={this.priceHandler} />
                    {this.state.price && (this.state.price < 0 || this.state.price > 99999) && <span className="errorEdit" data-testid="error-msg-price">Please enter a valid price.</span>} 

                    <button className = "editPopupSubmitButton" onClick = {this.saveIngredient}>Submit</button>
                </div>
            </form>
            </React.Fragment>
        )
        
    }
}

export default EditIngredientComponent