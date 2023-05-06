import React,{Component} from "react";
import BackDrop from "./BackDrop";

class EditDishPopupComponent extends Component {
    render () {
        return (
            <React.Fragment>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed} />
            <div className="editPopupNewDish">
                <h2 className = "addPopupTitleNewDish"> Warning </h2>
                
                <h5 className="NewDishPopUpContent"> Please do some changes. </h5>

                <h5 className="NewDishPopUpContent"> If you did, maybe image is too large. </h5>
                <h5 className="NewDishPopUpContent"> It should be less than 2MB. </h5>

                <button className = "addPopupSubmitButton" onClick = {this.props.closePopup}>OK</button>
            </div>
            </React.Fragment>
        )
    }

}

export default EditDishPopupComponent