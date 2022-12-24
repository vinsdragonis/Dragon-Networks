const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jwt');
const User = require("../models/User");

module.exports = router;