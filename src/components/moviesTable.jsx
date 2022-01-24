import React, { Component } from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader';
import Like from './like';


export default class moviesTable extends Component {
    columns = [
        { path: "title", label: "Title" },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        { key: "Like", content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)} /> },
        { key: "delete", content: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger">Delete</button> }
    ]

    render() {
      const {movies, onLike, onDelete, onSort, sortColumn } = this.props
        return <table className="table">
            <TableHeader columns={this.columns} onSort={onSort} sortColumn={sortColumn} />
            <TableBody data={movies} columns={this.columns} onLike={onLike} onDelete={onDelete} />

        </table>;
    };
};



