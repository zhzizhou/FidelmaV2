import React from "react";
import ProfileService from "../services/ProfileService";

class ProfileComponent extends React.Component{

    testPost(){
        ProfileService.postUsers();
    }

    render(){
        return(
            <>
                <div>
                    <div className = "ingredientHeader">
                        <img className = "backButton" src = "/res/images/back.svg" alt="back to previous page" onClick={()=>window.location.href="/staff/dashboard"}/>
                    </div>
                    <div className = "profileTitle">
                        <h3>Edit Profile</h3>
                        <hr className = "titleSeparateLine"/>
                    </div>
                    <div>
                        <img className = "profileImg" src = "/res/images/TGLogo.png" alt = "staff" />
                    </div>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Name</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>The Greatest Team</h4>
                        </div>
                    </div>    
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>ID</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>1000001</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Gender</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>Male</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Date of Birth</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>01/01/2002</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Contact Number</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>0412345678</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Email</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>adc@gmail.com</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>
                    <div className = "profileContent">
                        <div className = "left">
                            <h4><strong>Address</strong></h4>
                        </div>
                        <div className = "right">
                            <h4>Parkville VIC 3010</h4>
                        </div>
                    </div>  
                    <hr className = "profileSeparateLine"/>

                </div>
            </>
        );
    }
}

export default ProfileComponent