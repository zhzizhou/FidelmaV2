import React from "react";
import UserService from "../services/DashboardService";

class DashboardComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {foods : []}
    }

    testPost(){
        UserService.postUsers();
    }

    render(){
        return(
            <>
                <div>
                    <div className="dashboardHeader">
                        <img className = "dashboardImg" src = "/res/images/TGLogo.png" alt = "staff" />
                        <div className = "staffName">
                            <h3>The Greatest Team</h3>
                            <button className = "editButton" onClick={()=>window.location.href="/staff/profile"}>
                                Edit Profile</button>
                            <button className = "editButton" onClick={()=>window.location.href="/"}>
                                Sign out</button>
                        </div>
                    </div>
                    <div className = "dashboardBar" onClick={()=>window.location.href="/staff/income"}>
                        <div className = "dashboardContent">
                            <img className = "dashboardIcon" src = "/res/images/money.svg" alt = "money" />
                            <h2>Total Income</h2>
                        </div>
                    </div>
                    <div className = "dashboardBar" onClick={()=>window.location.href="/staff/orderHistory"}>
                        <div className = "dashboardContent">
                            <img className = "dashboardIcon" src = "/res/images/order.svg" alt = "order" />
                            <h2>Order Summary</h2>
                        </div>
                    </div>
                    <div className = "dashboardBar" onClick={()=>window.location.href="/staff/ingredient"}>
                        <div className = "dashboardContent">
                            <img className = "dashboardIcon" src = "/res/images/material.svg" alt = "material" />
                            <h2>Raw Materials</h2>
                        </div>
                    </div>
                    <div className = "dashboardBar" onClick={()=>window.location.href="/staff/mainMenu"}>
                        <div className = "dashboardContent">
                            <img className = "dashboardIcon" src = "/res/images/menu.svg" alt = "menu" />
                            <h2>Menu</h2>
                        </div>
                    </div>

                </div>
            </>
        );
    }

}

export default DashboardComponent