const express = require('express');
const router = express.Router();

const upload = require('../middlewares/mutler');
const { authenticate } = require('../middlewares/authenticateMiddleware');
const  uploadImage  = require('../Controllers/uploadController');



router.post('/upload', authenticate, upload.single('file'), uploadImage.getUploadedImage);
router.post('/updateDetails', authenticate, upload.single('file'), uploadImage.getUpdateDetails);


module.exports = router;