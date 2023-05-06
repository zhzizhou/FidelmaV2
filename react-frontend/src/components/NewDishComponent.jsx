import React,{Component,useCallback,useState} from "react";
import NewDishService from "../services/NewDishService";
import {useDropzone} from 'react-dropzone'
import { v4 as uuid } from 'uuid';
import NewDishPopupComponent from "./NewDishPopupComponent";
import axios from "axios";
import {REST_API} from "../constant";


global.constants = {
    imageNotSaved:true,
    formNotSaved : true,
};

function MyDropzone({childToParent}) {
    const [url, setUrl] = useState('/res/images/camera.png');
    const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    console.log(file);

    const formData = new FormData();
    formData.append("file",file);
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    setUrl(URL.createObjectURL(file));
    console.log(url);
    childToParent(formData);
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const test = console.log(url);

  
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />


          <div id = "camera">
            <div className = "content top">
                {test}
                <img className = "cameraImage" src={url} alt="put pic here"/>
            </div>
          </div> 

      </div>
    )
  }




class NewDishComponent extends Component{
 
    constructor(props){
        super(props)

        this.state = {
            name:'',
            price:'',
            kiloJoule : '',
            description:'',
            onion:'',
            beef:'',
            chicken:'',
            type:'',
            ingredients:[],
            typedComponents:{},
            checkCode:{},
            checkPrice:'',
            file:'',
            display:false,
            imageNotSaved:true,
            formNotSaved : true
            
        }
        this.nameHandler = this.nameHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.onionHandler = this.onionHandler.bind(this);
        this.beefHandler = this.beefHandler.bind(this);
        this.chickenHandler = this.chickenHandler.bind(this);
        this.saveDish = this.saveDish.bind(this);
        this.back = this.back.bind(this);
        this.childToParent = this.childToParent.bind(this);
    }

    openPopup = () => {
        this.setState({display:true});
    }

    closePopup = () => {
        this.setState({display:false});
    }
      
    childToParent = (childData) => {
        this.setState({file:childData});
    }
    
    componentDidMount(){
        NewDishService.getIngredients().then((respond) => {
            this.setState({ingredients : (respond.data)});
        });
    }

    saveDish = async (e) => {
        e.preventDefault();
        if (this.state.file.size > 2097152) {
            console.log("file is too large");
            console.log(this.state.file.size)
            return;
        }
        this.setState({imageNotSaved: true});
        this.setState({formNotSaved: true});
        var canSend = 1;
        let fileSizeValid = 0;
        if (this.state.file !=='') {
            for (var pair of this.state.file.entries()) {
                console.log(fileSizeValid);
                console.log(typeof(pair[1].size));
                if ( 0 < pair[1].size  && pair[1].size < 2097152){
                    fileSizeValid = 1;
                }
            }
        }
        
        console.log(fileSizeValid);
        if (this.state.file === '' || fileSizeValid === 0) {
            canSend = 0;
        }


        if (this.state.name === '' || !(/^[a-zA-Z ]*$/).test(this.state.name)) {
            canSend = 0;
        }

        if (this.state.price === '' || this.state.price < 0 || this.state.price > 99999) {
            canSend = 0;
        }

        if (this.state.kiloJoule === '' || this.state.kiloJoule < 0 || this.state.kiloJoule > 99999) {
            canSend = 0;
        }

        if (this.state.description === '') {
            canSend = 0;
        }

        let components = this.state.typedComponents;
        var find = 0;
        let objectArr = Object.entries(components);
        for (let i = 0; i < this.state.ingredients.length; i++) {
            find = 0;
            for (var j = 0; j < objectArr.length; j++) {
                if (objectArr[j][0] === this.state.ingredients[i].name) {
                    find = 1;
                }
            }
            if (find === 0) { //staff does not give the input for this ingredient
                components[this.state.ingredients[i].name] = 0;
            }
        }
        for (let i = 0; i < this.state.ingredients.length; i++) {
            if (components[this.state.ingredients[i].name] === '') {
                components[this.state.ingredients[i].name] = 0;
            }
        }

        var allzero = 1;
        for (var i = 0; i < this.state.ingredients.length; i++) {
            if (components[this.state.ingredients[i].name] !== 0) {
                allzero = 0;
            }
        }

        if (allzero === 1) {
            canSend = 0;
        }


        if (canSend === 0) {
            console.log("need a popup");
            this.setState({display: true});
        } else {
            const unique_id = uuid();
            let dish = {
                name: this.state.name,
                price: this.state.price,
                kiloJoule: this.state.kiloJoule,
                description: this.state.description,
                components,
                type: this.props.location.state,
                id: unique_id
            };
            console.log("dish=> " + JSON.stringify(dish));

            this.state.file.append("id", unique_id);
            for (let pair of this.state.file.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            NewDishService.createNewDish(dish).then(
                () => {
                    console.log("form successful");
                }).catch(err => {
                    console.log(err.response.data);
                })


            NewDishService.createNewDish(dish);
                
            let count = 0;
            while (this.state.formNotSaved === true) {
                         this.state.formNotSaved = await axios.get(REST_API + "/staff/menu/checkForm/" + unique_id).then((respond) => {
                            console.log(respond.data);
                            return respond.data;
                        });

                count+=1;
                console.log(this.state.formNotSaved);
                let delay = 0;
                while (delay !== 1000000) {
                    delay+=1;
                }
                if (count === 50 && this.state.formNotSaved === true) {
                    break;
                }
            }

            if (this.state.formNotSaved === true) {
                // need a popup here
                console.log("form is not saved!");
            } else { // start to send image
                let imageCount = 0;
                NewDishService.sendImage(this.state.file)
                    while (this.state.imageNotSaved === true) {
                        this.state.imageNotSaved = await axios.get(REST_API + "/staff/menu/checkImage/" + unique_id).then((respond) => {
                                    console.log(respond.data);
                                    return respond.data;
                                });
                        let delay = 0;
                        while (delay !== 100000000) {
                            delay+=1;
                        }
                        imageCount += 1;
                        if (imageCount === 100 && this.state.imageNotSaved === true) {

                            break;
                        }
                    }

                    if (this.state.imageNotSaved === true) {
                        console.log("image is not saved!");
                    } else {
                        this.props.history.push('/staff/menu/' + this.props.location.state, this.props.location.state);
                    }
            }

        }
    }

    
    nameHandler = (event) =>{
        this.setState({name:event.target.value});
    }

    priceHandler = (event) => {
        this.setState({price:event.target.value});
    }

    descriptionHandler = (event) => {
        this.setState({description:event.target.value});
    }



    onionHandler(event,ingredient) {
        var key = ingredient.name;
        var value = event.target.value;
        let typedComponent = this.state.typedComponents;
        typedComponent[key] = value;
        this.setState({typedComponents : typedComponent})
    }

    beefHandler = (event) => {
        this.setState({beef:event.target.value});
    }

    chickenHandler = (event) => {
        this.setState({chicken:event.target.value});
    }


    kjHandler = (event) => {
        this.setState({kiloJoule:event.target.value});
    }

    back = async (e) => {
        e.preventDefault();
        this.props.history.push('/staff/menu/' + this.props.location.state, this.props.location.state);
        
    }

    render(){
        return(
            
            <>
                <div>
                    <div>
                        <button onClick={this.back} className = "min" >
                        <img className = "backSign" src="/res/images/backSign.jpg" alt="back to the previous page"/>
                        </button>
                    </div>
                    
                    
                    <MyDropzone childToParent={this.childToParent}/> 
                    <div id= "editPart">    
                        <form>            
                        <div className = "content edit">
                            <h2 className="addSubTitle">Name</h2>
                            <input className = "inputPart" type="text"  name = "name" data-testid = "nameNewDish" maxLength = "30"
                            value = {this.state.name} onChange={this.nameHandler}/>
                            <div>{this.state.name && !(/^[a-zA-Z ]*$/).test(this.state.name) && <span className="errorAddNewDish" data-testid="error-msg-name">Please enter a valid name.</span>}
                            </div>
                            <h2 className="addSubTitle">Price</h2>
                            <input className = "inputPart" type="number"  name = "price" data-testid = "priceNewDish" min = "0" max = "99999"
                            value={this.state.price} onChange={this.priceHandler}/>
                            <div>{this.state.price && (this.state.price < 0 || this.state.price > 99999) && <span className="errorAddNewDish" data-testid="error-msg-price">Please enter a valid price.</span>} 
                            </div>
                            <h2 className="addSubTitle">kiloJoule</h2>
                            <input className = "inputPart" type="number"  name = "kilojoule" data-testid = "kiloJouleNewDish" min = "0" max = "99999"
                            value = {this.state.kiloJoule} onChange={this.kjHandler}/>
                            <div>{this.state.kiloJoule && (this.state.kiloJoule < 0 || this.state.kiloJoule > 99999) && <span className="errorAddNewDish" data-testid="error-msg-kiloJoule">Please enter a valid kiloJoule.</span>} 
                            </div>
                            <h2 className="addSubTitle">Description</h2>
                            <textarea className = "inputPartSpecial"  name = "description"  data-testid = "description" maxLength = "80"
                            value = {this.state.description} onChange={this.descriptionHandler}></textarea>
                            <h2 className="ingredients">Ingredients</h2>
                            <div id="myDropdown" className="ingredientsList">
                                {
                                    this.state.ingredients.map(
                                         ingredient =>
                                         <div key = {ingredient.name}>
                                            <span className = "name">{ingredient.name}</span>
                                            <span className = "unit">g</span>
                                            <input className = "quantity" type="number" name = "onion"
                                             onChange={e => this.onionHandler(e,ingredient)}  />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div id = "saveButton"> <button className = "min"  onClick = {this.saveDish} id = "save" >Save</button></div>
                        </form> 
                        
                    </div>  
                    
                </div>
                {this.state.display && <NewDishPopupComponent closePopup = {this.closePopup}/>}
            </>
        );
    }

}

export default NewDishComponent