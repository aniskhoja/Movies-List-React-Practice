import React, { Component } from 'react';
import Table from './table';
import Like from './like';


export default class moviesTable extends Component {
    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { key: "Like", content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} /> },
        { key: "delete", content: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger">Delete</button> }
    ];

    render() {
      const {movies, onSort, sortColumn } = this.props
        return (
            <Table columns={this.columns} onSort={onSort} sortColumn={sortColumn} data={movies} />
        );
    };
};



