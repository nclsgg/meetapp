import { extname } from 'path';
import File from '../models/File';

class FileController {
  async store(req, res) {
    const filetypes = ['.jpeg', '.jpg', '.png', '.gif'];
    const extension = extname(req.file.originalname);

    if (filetypes.indexOf(extension) === -1) {
      return res.status(401).json({
        error: `Arquivo ${extension} não permitido`,
      });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
}

export default new FileController();
