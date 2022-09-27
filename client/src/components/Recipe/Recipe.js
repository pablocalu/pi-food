import React from "react";
import { Link } from "react-router-dom";
import './Recipe.css'

export default function Recipe({ name, diets, image, healthScore, id, }) {
    return (

        <div className="recipe">
            {name === 'UPS' ? <div className="ups-container"><div className="ups-title">{name}</div><div>Grandma still doesn't know that recipe</div><div className='ups-img'></div><div>Tell grandma how to create it in the recipe book</div></div> :
                <div className="card">
                    <div className="img-container">
                        <img src={image} alt={name} className='recipe-img' />
                    </div>
                    <div className="info-container">
                        <div className="title">
                            <h3> {name.toUpperCase()} </h3>
                        </div>
                        <div className="text">
                            <h4>Health Score: {healthScore} </h4>
                        </div>
                        <div className="text">
                            <h4>Diets: {diets?.map((diet) => (
                                <button className="diet-btn" key={diet}>
                                    {diet.toUpperCase()}
                                </button>
                            ))} </h4>
                        </div>
                        <div>
                        <Link to={`/recipes/${id}`}>                    
                                <button className="btn">Recipe Detail</button>                    
                        </Link>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}