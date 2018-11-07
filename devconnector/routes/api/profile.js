const express = require('express')
const router = express.Router();

// Load User Model
const User = require('../models/User');

// @routes GET api/profile/test
// @desc Tests profile route
// @access Public


router.get('/test', (req, res) => res.json({msg: "Profile Works"}));

// @routes GET api/profile/register
// @desc  Register user
// @access Public
router.get('/register', (req, res) => {
});

module.exports = router;