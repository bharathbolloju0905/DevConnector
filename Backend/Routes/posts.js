const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authenticateMiddleware');
const uploadController = require('../Controllers/uploadController');

router.get("/allposts",authentication.authenticate,uploadController.getAllPosts);
router.get("/like/:postId",authentication.authenticate,uploadController.likePost);


module.exports = router ;