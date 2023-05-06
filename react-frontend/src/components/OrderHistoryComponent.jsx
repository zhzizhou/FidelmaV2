import React from "react";
import OrderHistoryService from "../services/OrderHistoryService";
import OrderDetailComponent from "./OrderDetailComponent";

class OrderHistoryComponent extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            orders: [],
            show:false,
            phone:''
        }
    }

    componentDidMount() {
        OrderHistoryService.getOrders().then((res) => {
            this.setState({orders:(res.data)});
            console.log(typeof(this.state.orders[0].phoneNumber));
            
        })
    }

    handleClick (order,id,e){
        e.stopPropagation();
        this.props.history.push(`/staff/orderDetails/${id}`,order);
    }

    close = () =>{
        this.setState({
            show:false,
        });
        
    }

    orderCompleted(id) {
        OrderHistoryService.postComplete(id).then(res => {
            console.log("successful");
            window.location.reload();
        })

    }

    deleteOrder(id) {
        OrderHistoryService.deleteOrder(id).then(
            res => {
                this.setState({orders:this.state.orders.filter(order => order.id !== id)})
            }
        )
    }

    phoneHandler = (event) =>{
        this.setState({phone:event.target.value});
    }

    render(){
        return(
            <>
                <div>
                    <div className = "historyHead">
                        <img className = "historyBackIcon" src="/res/images/back.svg" alt="back to previous page" onClick={()=>window.location.href="/staff/dashboard"}/>
                        <h4>Order Summary</h4>
                        <hr className = "historySeparateLine"/>
                    </div>
                    <div className="historyTableContainer">
                    <input className = "orderSearch" type = "number" value = {this.state.phone} onChange={this.phoneHandler} data-testid = "phoneNumOrder" placeholder="search by phone number..."/>
                    <div className = "errorMsgOrder">{this.state.phone && !(/0?(4)[0-9]{8}/).test(this.state.phone) && <span className="errorOrder" data-testid="error-msg-OrderPhoneNum">Please enter a valid phone number.</span>} 
                        </div>
                        <table className = "historyTable">
                            <thead>
                                <tr>
                                    <th>Table No.</th>
                                    <th>Phone Number</th>
                                    <th>Shipping Status</th>
                                    <th>Order Details</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.filter((order => {
                                    if (this.state.phone === '') {
                                        return order;
                                    } else if (order.phoneNumber.includes(this.state.phone)){
                                        return order;
                                    }
                                    return null;
                                })).map((order) => (
                                    <tr key = {order.id}>
                                        <td>{order.tableNumber}</td>
                                        <td>{order.phoneNumber}</td>
                                        <td><strong>{order.orderStatus}</strong> <button className="completeButton" onClick={()=>this.orderCompleted(order.id)}>Complete</button></td>
                                        <td><button className = "checkDetailButton" onClick={e => this.handleClick(order,order.id,e)}> Details</button></td>
                                        <td><button className = "checkDetailButton" onClick = {() => this.deleteOrder(order.id)}> Delete </button></td>
                                        {this.state.show && <OrderDetailComponent close = {this.close} detail = {this.state.detail}/>}
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

}

export default OrderHistoryComponent