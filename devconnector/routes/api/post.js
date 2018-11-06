const express = require('express')
const router = express.Router();


// @routes GET api/posts/test
// @desc Tests post route
// @access Public

router.get('/test', (req, res) => res.json({message: "Post Works"}));

module.exports = router;