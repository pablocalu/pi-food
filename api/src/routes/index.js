const { Router } = require('express');
const { getAllRecipes, getById } = require('../controllers/recipes')
const { getAllDiets } = require('../controllers/diets')
const { Recipe, Diet } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes', async (req, res) => {
    try {
        const { name } = req.query
        let recipesTotal = await getAllRecipes();
        if(name) {
            let recipesName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            recipesName.length ?
            res.status(200).send(recipesName) :
            res.status(204).send('Cannot find a recipe with this name.')
        } else {
            res.status(200).send(recipesTotal)
        }
    } catch (error) {
        res.send(400).json(error)
    }
})

router.get('/recipes/:id', async (req,res) => {
    const { id } = req.params
    const getInfoById = await getById(id)
    return res.send(getInfoById)
})

router.get('/diets', async (req, res) => {
    const loadDiets = await getAllDiets()
    res.status(200).send(loadDiets)
})

router.post('/recipes', async (req,res) => {
    const { name, summary, steps, healthScore, image, diets } = req.body
    console.log(req.body)
    try {
        const newRecipe = await Recipe.create({
            name,
            summary,
            steps,
            healthScore,
            image
        });
        let getDiets = await Diet.findAll({
            where: {
                name: diets
            }
        });
        newRecipe.addDiet(getDiets);
        return res.status(201).send(newRecipe)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/recipes/:id', async (req,res) => {
    const { id } = req.params
    await Recipe.destroy({
        where:{
            id
        }
    })
    res.send('Recipe deleted.')
})

module.exports = router;
