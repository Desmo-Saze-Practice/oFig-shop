const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();

// accueil
router.get('/', mainController.homePage);

// article
router.get('/article/:id', mainController.itemPage);

// panier
router.get('/cart/add/:id', cartController.addItem);
router.get('/cart', cartController.cartPage);

// 404
router.use(mainController.error404);


// on exporte le router 
module.exports = router;