const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const imageController = require('./src/controllers/imageController');

router.use(homeController);
router.use(imageController);

module.exports = router;