const dataMapper = require('../dataMapper');

const cartController = {


  cartPage: (req, res) => {

    const cart = req.session.cart;

    if (cart) {

      const details = {
        shipping: 9.99,
        totalTF: 0,
        vat: 0.20
      }

      // calcul du prix * nombre d'item par item, puis cout global
      cart.forEach(item => {
        item.subtotal = item.quantity * item.price;
        details.totalTF += item.subtotal;
      });

      // TVA
      details.vatAmount = details.totalTF * details.vat;

      // TTC
      details.total = details.totalTF + details.vatAmount + details.shipping;

      res.render('panier', {
        cart,
        details
      });
    } else {
      res.render('panier', { cart });
    }

  },

  addItem: (req, res, next) => {
    // on verifie si il y a un objet cart dans les coockies
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // on stock l'objet récupéré dans une variable
    const cart = req.session.cart;

    // l'id provenant de l'url
    const id = Number(req.params.id);

    const foundItem = cart.find(item => {
      console.log('item id ', item.id, ' id ', id);
      return item.id === id
    });

    if (!foundItem) {

      dataMapper.getOneItem(id, (error, item) => {

        if (error) {
          res.render('message', { message: 'Une erreur est survenue, veuillez réessayer ulterieurement'});
          return;
        }
        if (!item) {
          next();
          return;
        }

        item.quantity = 1;
        cart.push(item);
        res.redirect('/cart');
        // res.redirect('panier');
      });
    }
    else {
      foundItem.quantity++;
      res.redirect('/cart');
      // res.redirect('panier');
    }
  },

  cardDelete: (req, res, next) => {

    const id = Number(req.params.id);

    const cart = req.session.cart;

    const itemInCart = cart.find( item => {
      console.log('item id ', item.id, ' id ', id);
      return item.id === id
    });

    if (itemInCart) {
      
      itemInCart.quantity--;
      
      // avec filter, probleme: cela créer un nouveau tableau
      req.session.cart = req.session.cart.filter(item => item.quantity > 0);

      res.redirect('/cart');
    } else {
      next();
    }

  }
};

module.exports = cartController;