const path = require('path');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (request, response) => {
    const filePath = path.resolve(__dirname + '/../../integration/panier.html');
    response.sendFile(filePath);
  }

};


module.exports = cartController;
