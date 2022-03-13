var express = require('express');
var router = express.Router();
var Register = require('../modules/registerModule');
const upload = require('../middleWare/multer');

//----------------------------* Resister Router *----------------------------//

router.post('/registeruser', upload.single('file'), Register.register);

//----------------------------* Login Router *----------------------------//

router.post('/login', Register.login);

module.exports = router;