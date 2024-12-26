const Movie = require('../models/movie');
const NotFoundError404 = require('../errors/notFoundError404');
const ForbiddeError403 = require('../errors/forbiddeError403');
const { USER_NOT_FOUND, FILM_DOES_NOT_EXIST, NOT_ENOUGH_RIGHTS, FILM_WAS_DELETED } = require('../utils/constants');

const getMovies = async (req, res, next) => {
    const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    if (!movies) { next(new NotFoundError404(USER_NOT_FOUND)); return; }
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieId = req.params.movieId;
  Movie.find({ movieId, owner })
    .then((movie) => {
      if (!movie.length) { next(new NotFoundError404(FILM_DOES_NOT_EXIST)); return; }
      if (movie[0].owner.toString() !== req.user._id) { next(new ForbiddeError403(NOT_ENOUGH_RIGHTS)); return; }
      return Movie.deleteOne(movie[0]).then(res.send({ message: FILM_WAS_DELETED.replace("$movieId", movieId) }));
    }).catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
