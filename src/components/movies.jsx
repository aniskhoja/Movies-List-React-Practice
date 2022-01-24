import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import ListGenres from './listGenres';
import MoviesTable from './moviesTable';
import Pagination from './pagination';
import _ from 'lodash';


export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        selectedGenre: 0,
        pageSize: 4,
        sortColumn: { path:"title", order: "asc"}
    };
    

    componentDidMount = () => {
        const genres = [{ _id:"", name:"All Genre" },...getGenres()]
        this.setState({ movies: getMovies(), genres });
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    };

    handleLike = movie => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movie }
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    };

    handleDelete = (id) => {
        const movies = this.state.movies.filter(movie => movie._id !== id)
        this.setState({ movies })
    };

    handleGenreChange = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies, sortColumn } = this.state;

        if (count === 0) return <p>There are no movie record</p>;
        const filtered = (selectedGenre._id) ? movies.filter(m => m.genre._id === selectedGenre._id) : movies
       
        // let object = sortColumn.path.split('.');
        // console.log(object[0])
        // const moviesSort = filtered.sort(
        //     (sortColumn.order === "desc") ?
        //     (!object[1]) ?
        //     ((a, b) => a[sortColumn.path] < b[sortColumn.path] ? -1 : 1) : 
        //     ((a, b) => a[object[0]][object[1]] < b[object[0]][object[1]] ? -1 : 1)
        //         : 
        //     (!object[1]) ?
        //     ((a, b) => a[sortColumn.path] < b[sortColumn.path] ? 1 : -1) : 
        //     ((a, b) => a[object[0]][object[1]] < b[object[0]][object[1]] ? 1 : -1)
        //     )

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        let moviesList = this.paginate(currentPage, pageSize, sorted);
        
        return (
            <div className="row">
                <p> Showing {filtered.length} movies in database </p>
                <div className="col-2">
                    <ListGenres genreItems={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreChange} />
                </div>
                <div className="col">
                    <MoviesTable movies={moviesList} onLike={ this.handleLike } sortColumn={sortColumn} onSort={ this.handleSort } onDelete={ this.handleDelete }/>
                    <Pagination itemCount={filtered.length} pageSize={pageSize} onCurrentPage={currentPage} onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    };

    paginate(currentPage, pageSize, filtered) {
        let index = (currentPage - 1) * pageSize;
        let movies = [];
        for (let i = index; i < (pageSize + index); i++) {
            if (filtered[i] !== undefined) {
                movies.push(filtered[i]);
            };
        };
        return movies;
    }
}
