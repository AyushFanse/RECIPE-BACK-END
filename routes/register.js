var express = require('express');
var router = express.Router();
var Register = require('../modules/registerModule');

//----------------------------* Resister Router *----------------------------//

router.post('/registeruser', Register.register);

//----------------------------* Login Router *----------------------------//

router.post('/login', Register.login);

module.exports = router;