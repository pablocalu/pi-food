import React from "react";
import './Paginate.css'

export default function Paginate({ recipesPerPage, allRecipes, paginate, currentPage, setCurrentPage }) {

    const pageNumber = []
    const allPages = Math.ceil(allRecipes / recipesPerPage)
    for (let i = 1; i <= allPages; i++) {
        pageNumber.push(i)
    }
    function prevPage() {
        setCurrentPage(currentPage - 1);
    }

    function nextPage() {
        setCurrentPage(currentPage + 1);
    }
    return (
        <div className="paginate-container">
            <button className='paginate-btn' disabled={currentPage <= 1} onClick={prevPage}>
                {'<'}
            </button>
            <ul>
                {
                    pageNumber?.map(number => {
                        return (
                            <button className={number === currentPage ? 'paginate-btn-active' : 'paginate-btn'} key={number} onClick={() => paginate(number)} >
                                {number}
                            </button>
                        )
                    }
                    )
                }
            </ul>
            <button className='paginate-btn' disabled={currentPage >= allPages} onClick={nextPage}>
                {'>'}
            </button>
        </div>

    )
}