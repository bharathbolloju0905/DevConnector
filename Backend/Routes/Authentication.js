const express = require('express');
const router = express.Router();
const authenticateController = require('../Controllers/Authentication');
const authenticateMiddleware = require('../middlewares/authenticateMiddleware');

router.get('/', (req, res) => {
    res.send('Authentication Route');
});

router.post('/register', authenticateController.register);
router.post('/login', authenticateController.login);
router.get('/logout', authenticateController.logout);
router.get('/profile', authenticateMiddleware.authenticate,authenticateController.getUser);
router.get('/people-you-know', authenticateMiddleware.authenticate, authenticateController.getPeopleYouKnow);

module.exports = router;