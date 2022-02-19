var express = require('express');
var User = require('../modules/userModule');
var router = express.Router();

///////////////////////////* Routes for Users *////////////////////////////

router.get('/getusers', User.getUser);
router.get('/getuser/:userId', User.getUserById);
router.patch('/updateuser/:userId', User.updateUser);
router.patch('/updatepassword/:userId', User.updatePassword);
router.delete('/deleteuser/:userId', User.deleteUser);
router.put('/savepost/:userId', User.SavePost);
router.put('/deletesavedpost/:userId', User.DeleteSavedPost);


module.exports = router;
