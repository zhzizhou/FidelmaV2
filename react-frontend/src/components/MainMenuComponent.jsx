import React from "react";


class MainMenuComponent extends React.Component{

    render(){
        return(
            <>
                <div>
                    <div className="menuHead">
                        <img id="menuPic" src="/res/images/menuBackground.jpg" alt="menu head pic" />
                        <img className="logo" src="/res/images/projectIcon.png" alt="logo" />
                        
                    </div>

                    <div id ="menuBox"><span id="menuWord">menu</span></div>
                    <div className="nav">
                        <input name="returnBtn" type="image" onClick={()=>window.location.href="/staff/dashboard"} src="/res/images/arrow.png" alt="return button icon" />
                    </div>

                    <div>
                        <h2 id = "mainMenuChickenHead"> Beef </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/beef1.jpg" alt="beef type example pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">100% Australian grain-fed beef, paired with selected fresh vegetables and delicious sauces,
                                can bring you the ultimate dining experience.</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" data-testid = "beefButton" onClick={()=>this.props.history.push("/staff/menu/beef","beef")}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>
                    
                    <div>
                        <h2 id = "mainMenuChickenHead"> Chicken </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/chicken2.jpg" alt="chicken type example pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">High-quality chicken is chosen from family farms. 100% natual and hormone free.</div>
                            </div>
                            <div className = "menuView">
                            <button className = "mainMenuEnterButton" data-testid = "chickenButton" onClick={()=>this.props.history.push("/staff/menu/chicken","chicken")}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>
                    
                    <div>
                        <h2 id = "mainMenuChickenHead"> Chip </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/cheeseFires.jpg" alt="chips type example pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">Choose fresh potatoes from premium Australian farms</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.props.history.push("/staff/menu/chip","chip")}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>

                    <div>
                        <h2 id = "mainMenuChickenHead"> Side </h2>  {/* waiting for backend for finish functions*/}
                        <hr className="separateLine"/>
                        <div className = "menuGridContainer">
                            <div className = "menuPic">
                                <img className = "mainMenuPic" src="/res/images/onionRing.jpg" alt="sides type example pic"/>
                            </div>
                            <div className = "menuDes">
                                <div className = "mainMenuDescription">100% Australian fresh high quality onions for deep frying and deep frying in high quality corn oil.</div>
                            </div>
                            <div className = "menuView">
                                <button className = "mainMenuEnterButton" onClick={()=>this.props.history.push("/staff/menu/side","side")}>View more</button>
                            </div>
                        </div>
                        <hr id = "mainMenuBooomLine" className="separateLine"/>
                    </div>

                </div>
            </>
        );
    }

}

export default MainMenuComponent