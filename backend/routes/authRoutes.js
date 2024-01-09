const express = require("express");

const router = express.Router();
const { login, register } = require("../controller/auth");

/* prefix => api/auth */
router.post("/login", login);
router.post("/register", register);

module.exports = router;
