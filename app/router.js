const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();

// test
router.get('/test', (req, res) => {
    res.sendFile(__dirname + '/views/old/article.html');
});

// accueil
router.get('/', mainController.homePage);

// article
router.get('/article/:id', mainController.itemPage);

// panier
router.get('/cart/add/:id', cartController.addItem);
router.get('/cart', cartController.cartPage);
router.get('/cart/delete/:id', cartController.cardDelete);

// 404
router.use(mainController.error404);


// on exporte le router 
module.exports = router;