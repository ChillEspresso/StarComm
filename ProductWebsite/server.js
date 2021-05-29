const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const path = require('path');

app.use(express.json());

//serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//Connect MongoDb
require('./server/database/database')();

//View Engine
app.engine('hbs', hbs({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'hbs');

//Calling routes
app.use('/',require('./server/router/router'));

app.listen(3000, ()=> console.log(`Server started on http://localhost:3000`));