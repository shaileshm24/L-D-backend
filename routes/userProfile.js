import express from 'express';
import {upload,uploadProfileImage,deleteProfilePhotoFromDB} from '../models/uploadProfilePhoto/uploadProfileImg';
import {viewPersonalProfile} from '../models/personalInfo/viewPersonalInfo';
import {editPersonalInfo} from '../models/personalInfo/editPersonalInfo';
import {validateToken} from '../middleware/tokenVerify'
const router = express.Router();

router.post('/upload/:id', [validateToken,upload,uploadProfileImage]);
router.get('/myProfile/:id', [validateToken,viewPersonalProfile]);
router.put('/editProfile/:id', [validateToken,editPersonalInfo]);
router.delete('/deleteProfileImg/:id', [validateToken,deleteProfilePhotoFromDB]);

export default router;
