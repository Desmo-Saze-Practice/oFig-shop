const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article', mainController.articlePage);

// page panier
router.get('/cart', cartController.cartPage);


// on exporte le router 
module.exports = router;