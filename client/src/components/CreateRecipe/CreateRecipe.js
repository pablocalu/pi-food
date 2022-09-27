import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { };
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, getDiets } from "../../redux/actions";
import './CreateRecipe.css'


export default function CreateRecipe() {

    const history = useHistory();
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets)
    const listDiets = diets.map((e) => e.name)
    const [input, setInput] = useState({
        name: '',
        healthScore: 1,
        summary: '',
        image: 'https://cutt.ly/TVPjXfg',
        diets: [],
        steps: ''
    })
    const [formErrors, setFormErrors] = useState({})

    function handleBlur(e) {
        handleChange(e)
        setFormErrors(validate(input))
    }


    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])



    function handleChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setFormErrors(validate(input))
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
        if (!e.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter((diet) => diet !== e.target.value)
            })
        }
        //console.log(input.diets)
    }

    function validate(recipe) {
        let errors = {}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        //name validations
        if (!recipe.name.trim()) {
            errors.name = 'Name must be completed'
        } else if (!regexName.test(recipe.name.trim())) {
            errors.name = 'Symbols not allowed'
        } else if (recipe.name.trim().length < 3) {
            errors.name = 'Name must have more than 3 letters'
        }

        //summary validations
        if (!recipe.summary.trim()) {
            errors.summary = 'Summary must be completed'
        } else if (!regexName.test(recipe.summary.trim())) {
            errors.summary = 'Symbols not allowed'
        }
        //steps validation   
        if (!recipe.steps) {
            errors.steps = 'Steps must be completed'
        }

        return errors
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(createRecipe({
            ...input,
            steps: [{ number: "", step: input.steps }]
        }))
        alert('Succesfull')
        setInput({
            name: '',
            healthScore: '',
            summary: '',
            image: '',
            diets: [],
            steps: ''
        })
        history.push('/recipes')
    }

    return (
        <div>
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)} className='form-container'>
                    <div className="btn-b-container">
                        <Link to='/recipes'><button className="btn-back-form">Back</button></Link>
                    </div>
                    <div className="title-form">
                        <h1>Create your Recipe</h1>
                        <h3>And helps GRANDMA fill her book</h3>
                    </div>
                    <div className="name-form">
                        <div>
                            <label>Name</label>
                        </div>
                        <div>
                            <input type="text" value={input.name.toUpperCase()} name='name' onChange={(e) => handleChange(e)} onBlur={handleBlur} className='form-s-input'/>
                            {formErrors.name ? <h5 className="err-form"><small>{formErrors.name}</small></h5> : false}
                        </div>
                    </div>
                    <div className="hs-form">
                        <div>
                            <label>Health Score</label>
                        </div>
                        <div className='hs-input'>
                            <input className='hs-input' type="range" value={input.healthScore} name='healthScore' min={1} max={100} onChange={(e) => handleChange(e)} />
                            <p>{input.healthScore}</p>
                        </div>
                    </div>
                    <div className="sum-form">
                        <div>
                            <label>Summary</label>

                        </div>
                        <div>
                            <input className='form-s-input' type="text" value={input.summary} name='summary' onChange={(e) => handleChange(e)} onBlur={handleBlur} />
                            {formErrors.summary ? <h5 className="err-form"><small>{formErrors.summary}</small></h5> : false}

                        </div>
                    </div>
                    <div className="img-form">
                        <div>
                            <label>Image Link</label>
                        </div>
                        <div>
                            <input className='form-s-input' type="text" value={input.image} name='image' onChange={(e) => handleChange(e)} />
                        </div>
                            <img className="img-link" src={input.image} alt="recipe" />
                    </div>
                    <div onChange={(e) => handleCheck(e)} className='check-form'>
                        <label>You must choose at least one type of diet</label>
                        {listDiets.map((e) => {
                            return (
                                <div key={e}>
                                    <input type="checkbox" name='diets' value={e} />
                                    <label>{e.toUpperCase()}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className="step-form">
                        <div>
                            <label>Steps</label>

                        </div>
                        <div>
                            <textarea className='form-b-input' type="text" value={input.steps} name='steps' onChange={(e) => handleChange(e)} rows='2' onBlur={handleBlur} />
                            {formErrors.steps ? <h5 className="err-form"><small>{formErrors.steps}</small></h5> : false}

                        </div>
                    </div>
                    <div className="create-btn-form">
                        {Object.keys(formErrors).length === 0 && input.name.length >3 && input.diets.length >= 1 ? <button type="submit" className="btn-create-form">Create Recipe</button> : <h4 className="err-form">Fields are missing</h4>}
                    </div>

                </form>

            </div>

        </div>
    )
}