const axios = require('axios')
const { Recipe, Diet } = require('../db')
const { API_KEY } = process.env

const getApiInfo = async () => {
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=10`)
    const apiUrl = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5')
    const apiInfo = await apiUrl.data.results.map(e => {
        const newStep = e.analyzedInstructions[0]?.steps.map(e => {
            return {
                number: e.number,
                step: e.step
            }
        })
        return {
            id: e.id,
            name: e.title,
            summary: e.summary,
            healthScore: e.healthScore,
            image: e.image,
            diets: e.diets,
            steps: newStep
        }
    })
    //console.log(apiInfo.steps[0])
    return apiInfo    
}

const getDbInfo = async () => {
    const dbInfo = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name']
        }
    })

    const dbRecipe = dbInfo.map(e => {
        return {
            id: e.id,
            name: e.name,
            healthScore: e.healthScore,
            summary: e.summary,
            image: e.image,
            steps: e.steps,
            diets: e.diets.map(e => e.name)
        }
    })
    return dbRecipe;
}

const getAllRecipes = async () => {
    const apiCook = await getApiInfo();
    const apiDb = await getDbInfo();
    const allApi = apiCook.concat(apiDb);
    return allApi; 
}

const getById = async (id) => {
    if(id.length > 15){
        try {
            const getIdDb= await Recipe.findByPk(id, {
                include: {
                    model: Diet,
                    attributes: ['name']
                }
            })
            return {
                name: getIdDb.name,
                summary: getIdDb.summary,
                healthScore: getIdDb.healthScore,
                steps: getIdDb.steps,
                image: getIdDb.image,
                diets: getIdDb.diets?.map(e => e.name)
            }
        } catch (error) {
            console.log(error)
        }
    }
    try {
        const getIdApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        return {
            name: getIdApi.data.title,
            healthScore: getIdApi.data.healthScore,
            summary: getIdApi.data.summary,
            image: getIdApi.data.image,
            diets: getIdApi.data.diets,
            steps: getIdApi.data.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }       
    } catch (error) {
        console.log(error)
    }
}

//getApiInfo()

module.exports = {
    getAllRecipes,
    getById
}