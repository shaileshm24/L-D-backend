import express from 'express';
import {upload,uploadProfileImage,deleteProfilePhotoFromDB} from '../uploadProfilePhoto/uploadProfileImg';
import {viewPersonalProfile} from '../personalInfo/viewPersonalInfo';
import {editPersonalInfo} from '../personalInfo/editPersonalInfo';
import {validateToken} from '../middleware/tokenVerify'
const router = express.Router();

router.post('/upload/:id', [validateToken,upload,uploadProfileImage]);
router.get('/myProfile/:id', [validateToken,viewPersonalProfile]);
router.put('/editProfile/:id', [validateToken,editPersonalInfo]);
router.delete('/deleteProfileImg/:id', [validateToken,deleteProfilePhotoFromDB]);

export default router;
