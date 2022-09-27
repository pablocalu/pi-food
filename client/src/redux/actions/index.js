import axios from 'axios';
import { GET_ALL_RECIPES, FILTER_BY_DIET, SORT_BY_AZ, SORT_BY_HS, GET_NAME_RECIPES, GET_DIETS, GET_RECIPE_DETAIL, RECIPE_DETAIL, DELETE_RECIPE, CLEAN_DETAIL, SET_PAGE } from './const';

export function getRecipes() {
    return async function (dispatch) {
        try {
            const dataRecipe = await axios.get('http://localhost:3001/recipes')
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: dataRecipe.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getNameRecipes(name) {
    return async function (dispatch) {
        try {
            const nameRecipe = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            const test = nameRecipe?.status === 200 
            console.log(test)
            if(test){
                console.log(nameRecipe.data)
                return dispatch({
                    type: GET_NAME_RECIPES,
                    payload: nameRecipe.data
                })
            } else {
                return dispatch({
                    type: GET_NAME_RECIPES,
                    payload: [{
                        "name" : "UPS",
                        "summary" : "",
                        "image" : "linkdeimage",
                        "diets" : [""]
                    }]
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export function getFilteredDiets(payload) {
    return {
        type: FILTER_BY_DIET,
        payload
    }
}

export function sortByAZ(payload) {
    return {
        type: SORT_BY_AZ,
        payload
    }
}

export function sortByHS(payload) {
    return {
        type: SORT_BY_HS,
        payload
    }
}

export function getDiets() {
    return async function (dispatch) {
        const dietInfo = await axios.get(`http://localhost:3001/diets`)
        return dispatch({
            type: GET_DIETS,
            payload: dietInfo.data
        })
    }
}

export function createRecipe(payload) {
    return async function () {

        console.log(payload)
        const createData = await axios.post(`http://localhost:3001/recipes`, payload)
        return createData;
    }
}

export function getRecipeDetail(id) {
    return async function (dispatch) {
        const idRecipe = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: idRecipe.data
        })
    }
}

export function recipeDetail(data = {}) {
    return {
        type: RECIPE_DETAIL,
        payload: data
    };
}

export function cleanDetail() {
    return {
        type: CLEAN_DETAIL,
        payload: {}
    };
}




export function deleteRecipe(id) {
    return async function (dispatch) {
        try {
            const remove = await axios.delete(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: DELETE_RECIPE,
                payload: remove.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}