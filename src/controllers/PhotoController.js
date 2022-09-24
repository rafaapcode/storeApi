import multer from 'multer';
import multerConfig from '../config/multer.js';
import Photo from '../models/Photo.js';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  storage(req, res) {
    return upload(req, res, async err => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { employee_id } = req.body;
        const { filename, originalname } = req.file;
        const photo = await Photo.create({ filename, originalname, employee_id });
        return res.json(photo);
      } catch (e) {
        return res.status(400).json({
          errors: ['Employee not exist'],
        });
      }
    });
  }
}

export default new PhotoController();
