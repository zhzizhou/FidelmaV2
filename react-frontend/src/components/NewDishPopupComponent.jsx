import React,{Component} from "react";
import BackDrop from "./BackDrop";

class NewDishPopupComponent extends Component {
    render () {
        return (
            <React.Fragment>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
            <div className="addPopupNewDish">
                <h2 className = "addPopupTitleNewDish"> Warning </h2>
                
                <h5 className="NewDishPopUpContent"> Please fill in the information about the dish, </h5>
                <h5 className="NewDishPopUpContent"> some of the ingredients must be filled in with the quantity, </h5>
                <h5 className="NewDishPopUpContent"> and finally don't forget to upload the picture as well </h5>
                <button className = "addPopupSubmitButton" onClick = {this.props.closePopup}>OK</button>
            </div>
            </React.Fragment>
        )
    }

}

export default NewDishPopupComponent