const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const imageController = require('./src/controllers/imageController');


// force redirect to https
// router.use((req, res, next) => {
//     if (req.headers['x-forwarded-proto'] !== 'https') {
//         return res.redirect('https://' + req.headers.host + req.url);
//     }
//     next();
// });


router.use(homeController);
router.use(imageController);

module.exports = router;