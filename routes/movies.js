const router = require('express').Router();
const { getMovies, createMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', createMovie);

module.exports = router;
