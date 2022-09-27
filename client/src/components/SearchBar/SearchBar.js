import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../redux/actions";
import './SearchBar.css'

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault(e);
        dispatch(getNameRecipes(name))
        setName('');
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input type="text" placeholder="Search Recipe..." value={name} onChange={(e) => handleInputChange(e)} className='text-search'/>
            <input type="submit" value='Search' className="btn-search"/>
        </form>
/*         <div>
            <input type="text" placeholder="Search Recipe..." onChange={(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)} >Search</button>
        </div> */
    )
}