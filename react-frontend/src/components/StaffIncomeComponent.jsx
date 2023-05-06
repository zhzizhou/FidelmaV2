import React from "react";
import StaffIncomeService from "../services/StaffIncomeService";

class StaffIncomeComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            income: 100000,
            value: '',
        }

        this.incomeHandler = this.incomeHandler.bind(this);
        this.withdrawMooney = this.withdrawMooney.bind(this);
    }

    testPost(){
        StaffIncomeService.postUsers();
    }

    componentDidMount(){
        console.log(this.state.value);
        console.log(this.state.income);
    }

    incomeHandler(event) {
        this.setState({value: event.target.value});
    }
    
    withdrawMooney(event) {
        if(this.state.value > this.state.income){
            alert('Withdrawn Unsuccessful: Insufficient Balance!')
        }else if(this.state.value !== 0){
            let alertW = `Successfully Withdrawn: $${this.state.value}!`
            alert(alertW);
            this.setState({
                income:this.state.income - this.state.value,
            });
        }else{
            alert('Withdrawn Unsuccessful: Need Type Amount You Want Withdraw!');
        }
        event.preventDefault();
    }
      
    render(){
        return(
            <>
                <div>
                    <div className = "incomeHead">
                        <img className = "historyBackIcon" src="/res/images/back.svg" alt="back to previous page" onClick={()=>window.location.href="/staff/dashboard"}/>
                        <h4>Total Income</h4>
                        <hr className = "historySeparateLine"/>
                    </div>
                    <div className = "incomeIconContainer">
                        <img src="/res/images/income.png" alt="income icon"/>
                        <h4>My Balance:</h4>
                    </div>
                    <div className = "totalIncome">
                        <h4><strong>${this.state.income}</strong></h4>
                    </div>
                    <form className = "withdrawInputContainer">
                        <label>
                            <input className = "withdrawInput" type="text" value={this.state.value} onChange={this.incomeHandler} />
                        </label>
                    </form>
                    <div className = "withdrawContainer">
                        <button className = "withdrawButton" onClick = {this.withdrawMooney}>Withdraw</button>
                    </div>
                </div>
            </>
        );
    }
}

export default StaffIncomeComponent