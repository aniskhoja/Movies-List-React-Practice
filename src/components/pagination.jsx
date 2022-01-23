import React from 'react';
import PropTypes from 'prop-types'

const Pagination = ({ pageSize, itemCount, onPageChange, onCurrentPage }) => {
 
    let array = []
    let pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount === 1) {
        return null
    }
    for (let i = 0; i < pageCount; i++) {
        array.push(i + 1) 
    }

    return (
        <nav aria-label="Page navigation example">
 
            <ul className="pagination">
                {array.map(page =>
                    <li key={page} style={{ cursor: 'pointer' }} className={page === onCurrentPage ? "page-item active" : "page-item"} >
                        <a className="page-link" onClick={() => { onPageChange(page) }} >{page}</a></li>
                )}
            </ul>
        </nav>);
}

Pagination.propTypes = {
    pageSize: PropTypes.number.isRequired,
    itemCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onCurrentPage: PropTypes.number.isRequired
}

export default Pagination;

