// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();

const express = require('express');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));
app.set("view engine", "ejs");
app.set('views', __dirname + "/app/views");

// Pour le panier : session
const session = require('express-session');
app.use(session({
  secret: 'somepassdude',
  resave: true,
  saveUninitialized: true,
  cookie: {
    //pas https donc false
    secure: false,
    maxAge: (1000 * 60 * 60)
  }
}));


// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
