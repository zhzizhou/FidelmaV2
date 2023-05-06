import React from "react";


class LoginComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            username:'',
            password:'',
        }
        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.save = this.save.bind(this);
    }  

    usernameHandler = (event) =>{
        this.setState({username:event.target.value});
    }

    passwordHandler = (event) =>{
        this.setState({password:event.target.value});
    }

    save(event){
        var teamUsername = "comp30022";
        var teamPassword = "tg123123";
        if(this.state.username !== teamUsername){
            alert('Unregistered User! Please Login again!');
            this.reset();
        } else if(this.state.password !== teamPassword){
            alert('Wrong Password! Please Login again!');
            this.reset();
        } else{
            alert('Login Successfully! Welcome Back!')
            this.goToDashboard();
        }
    }

    reset(){
        this.setState({
            username:'',
            password:'',
        });
    }

    goToDashboard(){
        window.location.href="/staff/dashboard";
    }

    render(){
        return(
            <>
                <div className = "loginMain">
                    <div className = "orderHead">
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                    </div>
                    <div className = "storeName">
                        <span id="loginStoreName">Fidelma</span>
                    </div>
                    <div className = "staffLogin">
                        <h4><strong>Username</strong></h4>
                        <div className = "loginInputContainer">
                            <input className = "loginInput" value = {this.state.username} onChange={this.usernameHandler}/>
                        </div>
                    </div>
                    <div className = "staffLogin">
                        <h4><strong>Password</strong></h4>
                        <div className = "loginInputContainer">
                            <input className = "loginInput" type="password" value = {this.state.password} onChange={this.passwordHandler}/>
                        </div>
                    </div>
                    <div className = "loginContainer">
                        <button className = "loginButton" onClick = {this.save}>Log in</button>
                    </div>
                </div>
            </>
        );
    }
}

export default LoginComponent