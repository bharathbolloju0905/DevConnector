const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticateMiddleware");
const ConnectionControllers = require("../controllers/connectionController");

router.post("/connect",authenticate.authenticate,ConnectionControllers.ConnectUser)

module.exports = router