import React from "react";
import EnterService from "../services/EnterService";


class EnterComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            tableNum:'',
            phone:'',
        }
        this.tableNumHandler = this.tableNumHandler.bind(this);
        this.phoneHandler = this.phoneHandler.bind(this);
        this.save = this.save.bind(this);
    }
    
    testPost(){
        EnterService.postUsers();
    }

    componentDidMount(){
        console.log(this.state.tableNum)
    }

    tableNumHandler = (event) =>{
        this.setState({tableNum:event.target.value});
    }

    phoneHandler = (event) =>{
        this.setState({phone:event.target.value});
    }

    save(event){
        console.log(this.state.tableNum);
        console.log(this.state.phone);
        var tableNumPattern = /^-?[1-9]\d*$/;
        var phonePattern = /0?(4)[0-9]{8}/;

        if(this.state.tableNum === '' || this.state.phone === ''){
            alert('You need to enter all informations, please enter them again!');
            this.reset();
        }else if(tableNumPattern.test(this.state.tableNum) === false){
            alert('Please enter valid table number!');
            this.reset();
        }else if(phonePattern.test(this.state.phone) === false){
            alert('Please enter valid phone number!');
            this.reset();
        }else{
            alert('Welcome to Fidelma!');
            this.goToMainMenu();
        }
        event.preventDefault();
    }

    reset(){
        this.setState({
            tableNum:'',
            phone:'',
        });
    }

    // if you want to parse more data in here which will
    // break the list of length 2, notify Yichen
    // because it is a list, the menu component is using index
    // to transfer data
    // current status, index 0 is tableNum, index 1 is phone
    // index 2 is food in cart, last index must be type
    goToMainMenu(){
        this.props.history.push("/customer/mainMenu",[this.state.tableNum, this.state.phone]);
    }

    render(){
        return(
            <>
                {/* <video className = "backgroundVideo" src = {enterPageVideo} autoPlay loop muted/> */}
                <div className = "orderMain">
                    <div className="orderHead">
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                    </div>
                    <form>
                    <div className = "tableNum">
                        <h4>Table No.</h4>
                        <input className = "tableInput" value = {this.state.tableNum} type = 'number' onChange={this.tableNumHandler} data-testId = "tableNum" min = '0' max = '100'/>
                        <div className = "errorMsg1">{this.state.tableNum && ((this.state.tableNum < 0 || this.state.tableNum > 100) || (/^-?[1-9]\d*$/).test(this.state.tableNum) === false) && <span className="error" data-testid="error-msg-tableNum">Please enter a valid table number.</span>} 
                        </div>
                    </div>
                    <div className = "tableNum">
                        <h4>Phone Number</h4>
                        <input className = "tableInput" value = {this.state.phone} onChange={this.phoneHandler} data-testid = "phoneNum"/>
                        <div className = "errorMsg2">{this.state.phone && !(/0?(4)[0-9]{8}/).test(this.state.phone) && <span className="error" data-testid="error-msg-phoneNum">Please enter a valid phone number.</span>} 
                        </div>
                    </div>
                    <div className = "startOrder">
                        <button className = "orderButton" onClick = {this.save}>Start Order</button>
                    </div>
                    </form>
                    
                </div>
            </>
        );
    }
}

export default EnterComponent