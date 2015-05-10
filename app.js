/**
 * Created by gabguy on 05/05/2015.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var database = mongoose.connect('mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/',
    {user: 'admin', pass: 'h224VJUXVn83'});

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', function (request, response) {
    response.send('Welcome to my API!');
});

app.listen(port, function () {
    console.log('Gulp running my app on port ' + port);
});