const router = require('express').Router();
const multer = require('multer');

const imageServices = require('../services/imageServices');

const upload = multer();


router.post('/post/img', upload.single('imageFile'), async (req, res) => {

    const imgData = {
        imgName: req.body.name,
        img: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }

    await imageServices.createImage(imgData);
    res.redirect('/');
})

router.get('/image/:imageName', async (req, res) => {
    const imageName = req.params.imageName;

    const image = await imageServices.getImageByName(imageName);

    res.contentType(image.img.contentType);
    res.send(image.img.data)
})

module.exports = router;