
import React, { Component } from 'react'
import './App.css'
import {recipes} from "./tempList"
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'

export default class App extends Component {
  state = {
    recipes: recipes,
    url: "https://www.food2fork.com/api/search?key=cc459e789e52b48750e9671f6ec09db4",
    base_url: "https://www.food2fork.com/api/search?key=cc459e789e52b48750e9671f6ec09db4",    
    details_id: 35387,
    pageIndex: 1,
    search: '', 
    query: '&q=',
    error: ''
}

async getRecipe(){
    try{
        const data = await fetch(this.state.url);
        const jsondata = await data.json();
        if(jsondata.recipes.length === 0){
          this.setState(() =>{
            return {error: 'No result(s) Found'}
          })
        }else{
          console.log(jsondata.recipes);
          this.setState(() =>{
            return {recipes: jsondata.recipes}
          })
        }
    }catch(error){
       console.log(error);
    }

}

componentDidMount(){
  this.getRecipe();
}

displayPage = (index) => {
  switch(index){
    default:
    case 1:
      return(<RecipeList 
        recipes = {this.state.recipes}
         handleDetails={this.handleDetails}
         value={this.state.search} 
         handleChange={this.handleChange} 
         handleSubmit={this.handleSubmit}
         error={this.state.error}
        />
      );
    break;
    case 0:
      return(<RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />);
    break
  }
}
handleIndex = index =>{
  this.setState({
    pageIndex: index
  });
}
handleDetails = (index, id) => {
  console.log(index, id);
  this.setState({
    pageIndex:index,
    details_id: id
  });
}

handleChange = (e) =>{
  this.setState({
    search: e.target.value
  }, () => {
    console.log("okay nah");
  })
}

handleSubmit = (e) =>{
  e.preventDefault();
  console.log("submitted");
  const {search, query, base_url } = this.state;
  console.log(base_url);
  this.setState(() => {
    return {url: `${base_url}${query}${search}`, search:""}},
    () =>{
      this.getRecipe();
    }
  )
}
render() {
  
  return (
    <React.Fragment>
      {this.displayPage(this.state.pageIndex)}      
    </React.Fragment>
  )
}
}
