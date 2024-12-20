import {v4 as uuidv4} from 'uuid';

class FileController {

    async uploadFile(req, res, next) {
        try {
            const file = req.files.file
            const fileName = uuidv4() + ".jpg"
            await file.mv("./public/" + fileName);
            res.status(200).json({
                success: true,
                image: fileName
            });
        } catch (e) {
            next(e);
        }
    }


}

export const fileController = new FileController();
