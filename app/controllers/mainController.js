const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (req, res) => {
    dataMapper.getAllItems((error, result) => {
      if (error) {
        throw error;
      } else {
        res.render('accueil', { figurines: result.rows });
      }
    })
  },

  // méthode pour la page article
  itemPage: (req, res, next) => {

    const id = Number(req.params.id);

    dataMapper.getOneItemReview(id, (error, item) => {
      if (error) {
        res.redner('message', {message: 'something went wrong'})
      }
      if (!item) {
        next();
        return;
      }
      console.log();
      res.render('article', { item });
    })
  },

  error404: (req, res) => {
    res.status(404).render('message', { message: `Cette page n'existe pas`});
  }

};

module.exports = mainController;
