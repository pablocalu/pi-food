import React from "react";
import { Link } from "react-router-dom";
import botonImg from '../../images/btn-landing.png'
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div className="fatherLanding">
            <div className="left-container">
                <div>
                    <h1>The best food is HOMEMADE</h1>
                    <h1>We fill your kitchen with recipes</h1>
                    <h2>Access Grandma's Recipes Book</h2>
                    <Link to='/recipes'>
                        <img src={botonImg} alt="btnimage" className="boton" />
                    </Link>
                </div>
            </div>
            <div className="rigth-container">

            </div>
        </div>
    )
}
