/**
 * Created by gabguy on 05/05/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default:false }
});

module.exports = mongoose.model('Book', bookModel);