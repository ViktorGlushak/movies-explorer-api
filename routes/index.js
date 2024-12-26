const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies')
const auth = require('../middlewares/auth');
const { unknownLink, createUser, login, logout } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../utils/userValidationJoi');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.post('/signout', logout);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('*', auth, unknownLink);

module.exports = router;
