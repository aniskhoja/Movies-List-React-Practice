import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './like'
import Pagination from './pagination';

export default class Movies extends Component {
    state = {
        movies : getMovies(),
        currentPage: 1,
        pageSize: 4
    }



    handlePageChange = (page) => {
        this.setState({ currentPage: page})
    }

    handleLike = movie => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movie }
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handleDelete = (id) => {
       const movies = this.state.movies.filter(movie => movie._id !== id)
       this.setState({ movies })
    }
  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    let index = (currentPage - 1) * pageSize
    let movies = []
    for (let i = index; i < (pageSize + index); i++) {
        if(this.state.movies[i] !== undefined) {
            movies.push(this.state.movies[i])
        }
    }


    if(count === 0)
      return "There are no movie record"
    return <React.Fragment>
    <p> Showing {count} movies in database </p>
    <table className="table">
        <thead>
            <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
    <tbody>
        {movies.map(movie => 
        <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td><Like liked={movie.liked} onLike={ () => { this.handleLike(movie) } } /></td>
            <td><button onClick={() => { this.handleDelete(movie._id) }} className="btn btn-danger">Delete</button></td>
        </tr>
        )}
    </tbody>
    </table>
    <Pagination itemCount={count} pageSize={pageSize} onCurrentPage={currentPage} onPageChange={this.handlePageChange}/>
        </React.Fragment>;
  }
}
