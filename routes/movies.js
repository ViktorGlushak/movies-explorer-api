const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidator, movieIdValidator } = require('../utils/movieValidationJoi');

router.get('/', auth, getMovies);

router.post('/', movieValidator, auth, createMovie);

router.delete('/:movieId', movieIdValidator, auth, deleteMovie);

module.exports = router;
