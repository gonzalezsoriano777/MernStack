const express = require('express')
const router = express.Router();


// Private routes are used so that only registed users can do specific things like create a profile and have a description etc..
// In order to get a private route is to have a token along with it
// Once registered you recieve a token in which gives you the opportunity to call for requests..
// @routes GET api/users/test
// @desc Tests users route
// @access Public

router.get('/test', (req, res) => res.json({msg: "Users Works"}));

module.exports = router;