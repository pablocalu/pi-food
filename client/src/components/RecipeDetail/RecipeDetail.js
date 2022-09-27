import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, deleteRecipe, getRecipeDetail, recipeDetail } from '../../redux/actions';
import { useEffect } from "react";
import './RecipeDetail.css'

export default function RecipeDetail(props){

    const id = props.match.params.id
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecipeDetail(id))
        dispatch(recipeDetail)
    }, [dispatch, id])

    const recipe = useSelector((state) => state.detail)

    const remove = () => {
        dispatch(deleteRecipe(id))
        alert(`${recipe.name} recipe has been successfully deleted`)
        props.history.push('/recipes')
    }

    const cleanBack = () => {
        dispatch(cleanDetail())
    }
    const backDetail = () => {
        props.history.goBack()
    }

    const allcb = () => {
        cleanBack();
        backDetail();
    }


    return(
        <div className="container-detail">
            <div className="container-detail-2">
                <div>
                <button  className="detail-btn" onClick={allcb}>Back</button>            
                </div>
                <div className="detail-title">
                    <h2>{recipe.name}</h2>
                </div>
                <div className="detail-img-container">
                    <img  className="detail-img" src={recipe.image} alt={recipe.name} />
                </div>
                <div className="hs-container-detail">
                    <div>Health Score: {recipe.healthScore}</div>
                </div>
                <div className="detail-diets-container">
                        {
                            recipe.diets?.map((diet) => (
                                <button className="detail-diets" key={diet}>
                                    {diet.toUpperCase()}
                                </button>
                            ))
                        }
                </div>
                <div>
                <p className="sum-container" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
                </div>
                <div className="detail-step-container">
                <p className="detail-step">{recipe.steps?.map(e=> 
                        <p>{e.number} - {e.step}</p>) } </p>
                </div>
                {
                    id.length > 15 ? <div className="div-delete-btn"><button className="delete-btn" onClick={remove}> Delete Recipe </button></div> : ""
                }       
            </div>
        </div>
    )
}