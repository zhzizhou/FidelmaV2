import React,{Component,useCallback,useState} from "react";
import EditDishService from "../services/EditDishService";
import {useDropzone} from 'react-dropzone'
import axios from "axios";
import EditDishPopupComponent from "./EditDishPopupComponent";
import {REST_API} from "../constant";


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
                <img className = "cameraImage" src={url} alt = ''/>
            </div>
          </div> 

      </div>
    )
  }

class EditDishComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            id:this.props.match.params.id,
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
            allIngredients:[],
            file:'',
            currentimage:'',
            display:false
            
        }
        this.nameHandler = this.nameHandler.bind(this);
        this.priceHandler = this.priceHandler.bind(this);
        this.onionHandler = this.onionHandler.bind(this);
        this.beefHandler = this.beefHandler.bind(this);
        this.chickenHandler = this.chickenHandler.bind(this);
        this.editDish = this.editDish.bind(this);
        this.back = this.back.bind(this);
        this.childToParent = this.childToParent.bind(this);
    }  
    
    childToParent = (childData) => {
        this.setState({file:childData});
    }

    componentDidMount(){
        axios.get(REST_API + '/staff/menu/editDish/image/' + this.state.id).then((respond) => {
            this.setState({currentimage:respond.data.image.data});
            
            console.log(this.state.currentimage);
        })
        EditDishService.getDishById(this.state.id).then((respond) => {
            this.setState({allIngredients : (respond.data)});
            console.log(this.props.location.state);
            let objectArr = Object.entries(this.props.location.state.components);
            console.log(objectArr);
            console.log(this.state.allIngredients);
            var find = 0;
            for (var i = 0; i < this.state.allIngredients.length ;i++) {
                find = 0;
                for (var j = 0; j < objectArr.length;j++) {
                    if (this.state.allIngredients[i].name === objectArr[j][0]) {
                        find = 1;
                    }
                }
                if (find === 0) {
                    objectArr[this.state.allIngredients[i].name] = 0;
                }
            }

            console.log(objectArr);
            this.setState({ingredients:objectArr});
            console.log(this.state.ingredients);
        });
    }

    openPopup = () => {
        this.setState({display:true});
    }

    closePopup = () => {
        this.setState({display:false});
    }

    editDish = (e) =>{
        e.preventDefault();
        let components = this.state.typedComponents;
        console.log(Object.entries(components));
        console.log(this.state.ingredients);
        let arr = Object.entries(components);
        var found = 0;
        for (var k = 0; k < this.state.ingredients.length;k++) {
            found = 0;
            for (var z = 0; z < arr.length;z++) {
                if (arr[z][0] === this.state.ingredients[k][0]) {
                    found = 1;
                }
            }

            if (found === 0) {
                components[this.state.ingredients[k][0]] = this.state.ingredients[k][1];
            }
        }
        arr = Object.entries(components);
        var find = 0;
        for (var i = 0; i < this.state.allIngredients.length; i++) {
            find = 0;
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][0] === this.state.allIngredients[i].name) {
                    find = 1;
                }
            }
            if (find === 0) {
                components[this.state.allIngredients[i].name] = 0;
            }
        }
        console.log(components);

        if (!this.state.name) {
            this.setState({name:this.props.location.state.name})
        }

        if (!this.state.price) {
            this.setState({price:this.props.location.state.price})
        }

        if (!this.state.kiloJoule) {
            this.setState({kiloJoule:this.props.location.state.kiloJoule})
        }

        if (!this.state.description) {
            this.setState({description:this.props.location.state.description})
        }

        let componentsArr = Object.entries(components);
        console.log(componentsArr);
        for (var l = 0;l<componentsArr.length;l++) {
            if (!componentsArr[l][1]) {
                var value;
                for (var h = 0; h < this.state.ingredients.length;h++){
                    if (this.state.ingredients[h][0] === componentsArr[l][0]) {
                        value = this.state.ingredients[h][1];
                    }
                }
                components[componentsArr[l][0]] = value;
            }
        }

        var canSend = 0;

        if (!(/^[a-zA-Z ]*$/).test(this.state.name)) {
            canSend = 0;
        }

        if (this.state.price < 0 || this.state.price > 99999) {
            canSend = 0;
        }

        if (this.state.kiloJoule < 0 || this.state.kiloJoule > 99999) {
            canSend = 0;
        }

        if (this.state.description === '') {
            canSend = 0;
        }

        if (this.state.name !== this.props.location.state.name) {
            canSend = 1;
        }

        if (this.state.price !== this.props.location.state.price) {
            canSend = 1;
        }

        if (this.state.description !== this.props.location.state.description) {
            canSend = 1;
        }

        if (this.state.kiloJoule !== this.props.location.state.kiloJoule) {
            canSend = 1;
        }

        for (var y = 0 ; y < componentsArr.length; y++) {
            console.log(typeof(componentsArr[y][1]));
            console.log(typeof(this.state.ingredients[y][1]));
            if (componentsArr[y][1] !== this.state.ingredients[y][1]) {
                canSend = 1;
                break;
            }
        }

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

        if (fileSizeValid === 0) {
            canSend = 0;
        }else {
            canSend = 1;
        }

        if (this.state.file === '') {
            canSend = 1;
        }

        if (canSend === 0) {
            this.setState({display: true});
        }else {
            let dish = {name:this.state.name,price:this.state.price,kiloJoule:this.state.kiloJoule,description:this.state.description,components,type: this.props.location.state.type};
            console.log("dish=> " +JSON.stringify(dish));
            console.log(this.state.file);
            if(this.state.file !== '') {
                axios.post(REST_API + "/staff/menu/dish/imageEdit/" + this.state.id,this.state.file).then(
                () => {
                    console.log("successful");
                }).catch(err => {
                    console.log(err.response.data);
                })
            }
            
            EditDishService.editDish(dish,this.state.id).then( res=> {
                setTimeout(()=> {
                    this.props.history.push('/staff/menu/' + this.props.location.state.type,this.props.location.state.type);
                },2000)
            });
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
    var key = ingredient[0];
    var value = event.target.value;
    console.log(key);
    console.log(value);
    let typeComponent = this.state.typedComponents;
    typeComponent[key] = value;
    this.setState({typedComponents : typeComponent});
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

back = (e) => {
    e.preventDefault();
    console.log(this.props.location.state);
    this.props.history.push('/staff/menu/' + this.props.location.state.type,this.props.location.state.type);
}
    render(){
        return(
            <>
                <div  >
                    <div>
                        <button onClick={this.back} className = "min" >
                        <img className = "backSign" src="/res/images/backSign.jpg" alt = "back"/>
                        </button>
                    </div>
                    
                    <MyDropzone childToParent={this.childToParent}/> 

                    <div id= "editPart">    
                        <form>            
                        <div className = "content edit">
                            <h2 className="addSubTitle">Name</h2>
                            <input className = "inputPart" type="text"  name = "name" maxLength = "30"
                            placeholder = {this.props.location.state.name} onChange={this.nameHandler}/>
                            <div>{this.state.name && !(/^[a-zA-Z ]*$/).test(this.state.name) && <span className="errorAddNewDish" data-testid="error-msg-name">Please enter a valid name.</span>}
                            </div>
                            <h2 className="addSubTitle">Price</h2>
                            <input className = "inputPart" type="number"  name = "price" min = "0" max = "99999"
                            placeholder = {this.props.location.state.price} onChange={this.priceHandler}/>
                            <div>{this.state.price && (this.state.price < 0 || this.state.price > 99999) && <span className="errorAddNewDish" data-testid="error-msg-price">Please enter a valid price.</span>}
                            </div>
                            <h2 className="addSubTitle">kiloJoule</h2>
                            <input className = "inputPart" type="number"  name = "kilojoule" min = "0" max = "99999"
                            placeholder = {this.props.location.state.kiloJoule} onChange={this.kjHandler}/>
                            <div>{this.state.kiloJoule && (this.state.kiloJoule < 0 || this.state.kiloJoule > 99999) && <span className="errorAddNewDish" data-testid="error-msg-kiloJoule">Please enter a valid kiloJoule.</span>} 
                            </div>
                            <h2 className="addSubTitle">Description</h2>
                            <textarea className = "inputPartSpecial"  name = "description" maxLength = "80"
                            placeholder = {this.props.location.state.description} onChange={this.descriptionHandler}></textarea>
                            <h2 className="ingredients">Ingredients 
                                <button  className="min">
                                <img src="/res/images/backButton.jpg" className="icon icon-arrow" alt = "back"/>
                                </button> </h2>
                            <div id="myDropdown" className="ingredientsList">
                                {
                                    this.state.ingredients.map(
                                         ingredient =>
                                        <div key = {ingredient[0]}>
                                            <span className = "name">{ingredient[0]}</span>
                                            <span className = "unit">g</span>
                                            <input className = "quantity" type="number"  name = "onion"
                                            placeholder = {ingredient[1]} onChange={e => this.onionHandler(e,ingredient)}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div id = "saveButton"> <button className = "min"  onClick = {this.editDish} id = "save" >Save</button></div>
                        </form> 
                        
                    </div>   
                </div>
                {this.state.display && <EditDishPopupComponent closePopup = {this.closePopup}/>}
            </>
        );
    }

}

export default EditDishComponent