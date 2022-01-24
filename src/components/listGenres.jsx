import React from 'react';
import PropTypes from 'prop-types'
const ListGenres = (props) => {
    const { genreItems, onItemSelect, textProperty, valueProperty, selectedItem } = props
    return <ul className="list-group">
        {genreItems.map(item =>
            <li key={item[valueProperty]}
                className={ selectedItem._id === item._id ? "list-group-item active" : "list-group-item"} 
                onClick={() =>  onItemSelect(item) }>{item[textProperty]}
            </li>
        )}
    </ul>
};

ListGenres.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

ListGenres.propTypes = {
    genreItems: PropTypes.array.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.any.isRequired
}

export default ListGenres;


