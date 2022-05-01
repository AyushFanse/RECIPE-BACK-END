const express = require('express');
const router = express.Router();
const upload = require('../middleWare/multer');
const {
            multipleMediaUpload,
            getAllMultiMedias,
            deleteMultiMedia,
            updateMultiMedia,
            LikeMultiMedia,
            UnlikeMultiMedia,
            commentsMultiMedia,
            getMultiMediaById,
            deleteCommentsMultiMedia
      } = require('../modules/imageModule');
    


//----------------------------* Routes for Multi_Media *----------------------------//

router.post('/multimedia', upload.array('files', 12),multipleMediaUpload);
router.get('/multimedia/get/all', getAllMultiMedias);
router.get('/multimedia/get/:postId', getMultiMediaById);
router.patch('/multimedia/update/:id', upload.array('files', 12),updateMultiMedia);
router.delete('/multimedia/delete/:id',deleteMultiMedia);
router.put('/multimedia/like/:id', LikeMultiMedia);
router.put('/multimedia/unlike/:id', UnlikeMultiMedia);
router.put('/multimedia/comments/:id', commentsMultiMedia);
router.put('/multimedia/deletecomments/:id', deleteCommentsMultiMedia);

//----------------------------* Exporting Part *----------------------------//

module.exports = router;