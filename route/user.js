const router = require('express').Router();
const { registerUser, loginUser, deleteUser } = require('../controller/user');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/delete/:id').delete(deleteUser);

module.exports = router;
