import React, { Component } from 'react'
import {recipe} from '../tempDetails'
export default class RecipeDetails extends Component {
    // constructor(props){
    //     super(props);

    //     this.state = {
    //         recipe:recipe,
    //         url:`https://www.food2fork.com/api/get?key=cc459e789e52b48750e9671f6ec09db4&rId=${this.props.id}`
    //     }
    // }
    
    // async componentDidMount(){
    //  try{
    //         const data = await fetch(this.state.url);
    //         const jsondata = await data.json();
    //         this.setState({
    //             recipe: jsondata.recipe
    //         });
    //     }catch(error){
    //        console.log(error);
    //     }
    // }
    state = {
        recipe:recipe
    }
    async componentDidMount(){
        const id = this.props.id;
        const url = `https://www.food2fork.com/api/get?key=cc459e789e52b48750e9671f6ec09db4&rId=${this.props.id}`
        try{
            const data = await fetch(url);
            const jsondata = await data.json();
            console.log(jsondata);
            this.setState({
                recipe: jsondata.recipe
            });
        }catch(error){
            console.log(error);
        }
    }
    render() {
        const {
            image_url, 
            publisher, 
            publisher_url, 
            source_url, 
            title, 
            ingredients
        } = this.state.recipe;
        const {handleIndex, handleDetails} = this.props;
        return (
            <React.Fragment>
                <div class="container">
                    <div class="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <button
                             type="button"
                             name="" 
                             id=""
                            class="btn btn-warning mb-5 text-capitalize btn-block"
                            onClick={()=>{handleIndex(1)}}
                            >
                                Back to Recipe
                            </button>
                            <img src={image_url} className="d-block w-100" alt="recipe" />
                        </div>
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className="text-uppercase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">
                                provided by {publisher_url}
                            </h6>
                            <a href={publisher_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-2 text-capitalize"
                            >
                                publisher Webpage
                            </a>
                            <a href={publisher_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary mt-2 mx-3 text-capitalize"
                            >
                                Recipe url
                            </a>
                            <ul className="list-group mx-4">
                                <h2 className="mt-3 mb-4">Ingredients</h2>
                                {
                                    ingredients.map((item, index) => {
                                        return(
                                            <li key={index} className="list-group-item text-slanted">
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <h1> Hello from Details </h1>
            </React.Fragment>
        )
    }
}
