import React,{Component} from "react";
import BackDrop from "./BackDrop";

class IngredientPopupComponent extends Component {
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

    

    render() {
        return (
            <React.Fragment>
            <BackDrop show={this.props.show}  />
            
                <div className="addPopup">
                    <h2 className="addPopupTitle" >Adding new ingredient  <button className="closeAddPopup" onClick={this.props.closeAddPopup}>x</button></h2>
                    <form data-testid = 'form' >
                    <div>
                    <h3 className="addPopupSubTtile">Name</h3>
                    <input className="addPopupInput" type="text" data-testid = "name" aria-label= "name" maxLength = "15"
                    value = {this.state.name} onChange={this.nameHandler} />

                    <div>
                    {this.state.name && !(/^[a-zA-Z]*$/).test(this.state.name) && <span className="errorAddPopup" data-testid="error-msg-name">Please enter a valid name.</span>}
                    </div>
                    </div>

                    <div>
                    <h3 className="addPopupSubTtile">Quantity</h3>
                    <input className="addPopupInput" type="number" data-testid = "quantity" aria-label= "quantity" min = "0" max = "99999999"
                    value = {this.state.quantity} onChange={this.quantityHandler} />
                    
                    <div>
                    {this.state.quantity && (this.state.quantity < 0 || this.state.quantity > 99999999) &&<span className="errorAddPopup" data-testid="error-msg-quantity">Please enter a valid quantity.</span>} 
                    </div>
                    </div>

                    <div>
                    <h3 className="addPopupSubTtile">Price</h3> 
                    <input className="addPopupInput" type="number" data-testid = "price" aria-label= "price" min = "0" max = "99999"
                    value = {this.state.price} onChange={this.priceHandler} />
                    <div>
                    {this.state.price && (this.state.price < 0 || this.state.price > 99999) && <span className="errorAddPopup" data-testid="error-msg-price">Please enter a valid price.</span>} 
                    </div>
                    </div>
                    </form>
                    <button className = "addPopupSubmitButton" onClick = {e => this.props.saveIngredient(e,this.state.name,this.state.quantity,this.state.price)} data-testid = "submit">Submit</button>
                </div>
            </React.Fragment>
        )
        
    }
}

export default IngredientPopupComponent