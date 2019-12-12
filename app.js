require('./config/config');
require('./config/jwt_helper');
require('./models/db');
require('./config/passportConfig');


const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const routeController = require('./routes/route-controller');
const indexController = require('./controllers/index-controller')
const { config, engine } = require('express-edge');
 const expressValidator = require('express-validator');
 const expressSession = require('express-session');
//  const appSecret = require('./config/config.json');


const app = express();
const port = process.env.PORT || "8000"; 

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);


app.use(express.static('public'));
// middleware
app.use(bodyParser.urlencoded(({extended: false})));
app.use(bodyParser.json()); 
app.use(cors());
app.use(passport.initialize());


// routes
app.get("/", indexController.index);
app.use("/api", routeController );

app.get("/testing", indexController.testing);
app.get('/register', indexController.register);



app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

function observe1(){
  console.log('observe 1')
}
function observe2(){
  console.log('observe 2')
}