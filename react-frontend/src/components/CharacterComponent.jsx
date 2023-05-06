import React from "react";
import CharacterService from "../services/CharacterService";

class CharacterComponent extends React.Component{

    testPost(){
        CharacterService.postUsers();
    }

    render(){
        return(
            <>
                <div className = "selectionMain">
                    <div className="introTitle">
                        <h3>Welcome to Fidelma!</h3>
                        <p>Created by The Greatest Team</p>
                    </div>
                    <div className = "characterTitle">
                        <h4>How's your day?</h4>
                    </div>
                    <div className = "characterContainer">
                        <button className = "characterButton" data-testid = 'customer'
                        onClick={()=>this.props.history.push("/enterPage",this.props.location.state)}
                        >I'm a customer</button>
                    </div>
                    <div className = "characterContainer">
                        <button className = "characterButton" data-testid = 'staff'
                        onClick={()=>this.props.history.push("/staff/login",this.props.location.state)}
                        >I'm a staff</button>
                    </div>
                    <div className = "copyRightTitle">
                        <p>Copyright © 2022 COMP30022</p>
                    </div>
                    
                </div>
            </>
        );
    }
}

export default CharacterComponent