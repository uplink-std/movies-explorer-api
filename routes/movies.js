const router = require('express').Router();
const { getMovies } = require('../controllers/movies');

router.get('/', getMovies);

module.exports = router;
