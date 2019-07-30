import React, { Component } from 'react'
import Recipe from './Recipe'
import RecipeSearch from './RecipeSearch'
export default class RecipeList extends Component {
    render() {
        const { recipes, handleDetails, value, handleChange, handleSubmit, error } = this.props
        return (
           <React.Fragment>
               
              <RecipeSearch value={value} handleChange={handleChange} handleSubmit={handleSubmit} />
                {/* title */} 
                <div className="container mx-auto">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
                            <h1 className="text-slanted mt-5"> Recipe List </h1>
                        </div>
                    </div> 
                    {/* endo of title */}
                    <div className="row">
                        {
                            error ? (<h1 className="text-danger" style={{ textAlign:'center', width: '100%'}}>{error}</h1>) : 
                            recipes.map(recipe => {
                                return <Recipe key = {recipe.recipe_id} recipe = {recipe} handleDetails={()=>handleDetails(0, recipe.recipe_id)} />;
                                
                            })
                        }
                    </div>
                </div>                    
            </React.Fragment>
        )
    }
}
