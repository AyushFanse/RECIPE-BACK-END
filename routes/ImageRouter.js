'use strict';
const express = require('express');
const router = express.Router();
const {upload} = require('../middleWare/multer');
const {
            profilePicUpload, 
            multipleMediaUpload,
            getAllProfilePics,
            getAllMultiMedias,
            updateProfilePic,
            deleteProfilePic,
            deleteMultiMedia,
            updateMultiMedia,
            LikeMultiMedia,
            UnlikeMultiMedia,
            commentsMultiMedia,
            deleteCommentsMultiMedia
      } = require('../modules/imageModule');
    

//----------------------------* Routes for Profil_Pics *----------------------------//

router.post('/profilepic', upload.single('file'),profilePicUpload);
router.get('/profilepic/get/all', getAllProfilePics);
router.patch('/profilepic/update/:id', upload.single('file'), updateProfilePic); /*Update Part*/
router.delete('/profilepic/delete/:id', deleteProfilePic);

//----------------------------* Routes for Multi_Media *----------------------------//

router.post('/multimedia', upload.array('files'),multipleMediaUpload);
router.get('/multimedia/get/all', getAllMultiMedias);
router.patch('/multimedia/update/:id', upload.array('files'),updateMultiMedia); /*Update Part*/
router.delete('/multimedia/delete/:id',deleteMultiMedia);
router.put('/multimedia/like/:id', LikeMultiMedia);
router.put('/multimedia/unlike/:id', UnlikeMultiMedia);
router.put('/multimedia/comments/:id', commentsMultiMedia);
router.put('/multimedia/deletecomments/:id', deleteCommentsMultiMedia);

//----------------------------* Exporting Part *----------------------------//

module.exports = router;