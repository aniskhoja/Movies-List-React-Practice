import React, { Component } from 'react';
import { getGenres } from '../services/fakeGenreService';
import { getMovies } from '../services/fakeMovieService';
import Like from './like';
import ListGenres from './listGenres';
import Pagination from './pagination';



export default class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        selectedGenre: 0,
        pageSize: 4
    };
    

    componentDidMount = () => {
        const genres = [{ name:"All Genre" },...getGenres()]
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

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre, movies } = this.state;

        if (count === 0) return <p>There are no movie record</p>;
        const filtered = (selectedGenre._id) ? movies.filter(m => m.genre._id === selectedGenre._id) : movies
        let moviesList = this.paginate(currentPage, pageSize, filtered);

      return (
          <div className="row">
              <p> Showing {filtered.length} movies in database </p>
              <div className="col-2">
                  <ListGenres genreItems={ this.state.genres } selectedItem={this.state.selectedGenre} onItemSelect={ this.handleGenreChange }/>
              </div>
              <div className="col">
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
                      {moviesList.map(movie =>
                          <tr key={movie._id}>
                              <td>{movie.title}</td>
                              <td>{movie.genre.name}</td>
                              <td>{movie.numberInStock}</td>
                              <td>{movie.dailyRentalRate}</td>
                              <td><Like liked={movie.liked} onLike={() => { this.handleLike(movie) }} /></td>
                              <td><button onClick={() => { this.handleDelete(movie._id) }} className="btn btn-danger">Delete</button></td>
                          </tr>
                      )}
                  </tbody>
              </table>
              <Pagination itemCount={filtered.length} pageSize={pageSize} onCurrentPage={currentPage} onPageChange={this.handlePageChange} />
              </div> 
          </div>);
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
