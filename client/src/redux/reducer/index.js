import { GET_ALL_RECIPES, FILTER_BY_DIET, SORT_BY_AZ, SORT_BY_HS, GET_NAME_RECIPES, CREATE_RECIPE, GET_DIETS, GET_RECIPE_DETAIL, DELETE_RECIPE, CLEAN_DETAIL} from "../actions/const";


const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_NAME_RECIPES:
            return {
                ...state,
                recipes: action.payload,
            }
        case FILTER_BY_DIET: //me creo 2 estados, para que cada vez que necesito filtrar siempre tengo un estado con TODO, si no voy a filtrar sobre lo filtrado
            const allRecipes = state.allRecipes
            const dietsFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(r => r.diets.includes(action.payload))
            return {
                ...state,
                recipes: dietsFiltered
            }
        case SORT_BY_AZ:
            const allRecipes2 = state.recipes
            const sortAz = action.payload === 'az' ? allRecipes2.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            }) :
                allRecipes2.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                });
            return {
                ...state,
                recipes: sortAz
            }
        case SORT_BY_HS:
            const allRecipes3 = state.recipes;
            const sortHS = action.payload === 'high' ? allRecipes3.sort((a, b) => {
                if (a.healthScore < b.healthScore) {
                    return 1;
                }
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                return 0;
            }) :
                allRecipes3.sort((a, b) => {
                    if (a.healthScore > b.healthScore) {
                        return 1
                    }
                    if (a.healthScore < b.healthScore) {
                        return -1
                    }
                    return 0
                });
            return {
                ...state,
                recipes: sortHS
            }
        case CREATE_RECIPE:
                return {
                    ...state
                }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAN_DETAIL:
                return {
                    ...state,
                    detail: action.payload
                };
        case DELETE_RECIPE:
            const recipesId = state.allRecipes
            const deleteRecipe = recipesId.filter(e => e !== action.payload)
            return{
                ...state,
                allRecipes: deleteRecipe
                } 
        default:
            return state
    }
}

export default rootReducer;