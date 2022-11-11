import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getFilteredDiets, sortByAZ, sortByHS} from "../../redux/actions";
import { Link } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import './Home.css'

export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        dispatch(getRecipes())
        
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleDietFilter(e) {
        dispatch(getFilteredDiets(e.target.value))
        setCurrentPage(1)
    }

    function handleAzOrder(e) {
        e.preventDefault();
        dispatch(sortByAZ(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }

    function handleHsSort(e) {
        e.preventDefault();
        dispatch(sortByHS(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`)
    }


    return allRecipes.length > 0 && allRecipes !== undefined ? (
        <div className="backHome">
            <div className="create-container">
                <div className="create-img"></div>
                <Link to='/createrecipe'><button className="create-btn">Create</button></Link>
            </div>
            <div className="title-container">
                <h1 className="title-container2">What GRANDMA'S recipe are you going to cook today?</h1>
                <SearchBar />
            </div>
            <div className="nav-bar">
                <button onClick={e => { handleClick(e) }} className='ref-btn'>
                    Refresh
                </button>
                <div>
                    <h4 className="select-title">Alphabetic Order</h4>
                    <select onChange={e => handleAzOrder(e)} className='select-box'>
                        <option value="none">Choose an order</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </div>
                <div>
                    <h4 className="select-title">Order by Diet</h4>
                    <select onChange={e => handleDietFilter(e)} className='select-box'>
                        <option value="all">Choose an order</option>
                        <option value="all">All</option>
                        <option value="gluten free">Gluten free</option>
                        <option value="ketogenic">Ketogenic</option>
                        <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="pescatarian">Pescatarian</option>
                        <option value="paleolithic">Paleolithic</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30">Whole 30</option>
                        <option value="dairy free">Dairy free</option>
                        <option value="fodmap friendly">Fodmap Friendly</option>
                    </select>
                </div>
                <div>
                    <h4 className="select-title">Order by Healthscore</h4>
                    <select onChange={e => handleHsSort(e)} className='select-box'>
                        <option value="none">Choose an order</option>
                        <option value="high">High-Low</option>
                        <option value="low">Low-High</option>
                    </select>
                </div>
            </div>
            <div>

            <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
</div>
            <div className="recipeGrid">
                {
                    currentRecipes?.map(r => {
                        return (
                            <Recipe
                                key={r.id}
                                name={r.name}
                                image={r.image}
                                healthScore={r.healthScore}
                                diets={r.diets}
                                id={r.id}
                            />)
                    })
                }
            </div>
            <div>

                <Paginate
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    paginate={paginate}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    ) :
        <Loading />
}
