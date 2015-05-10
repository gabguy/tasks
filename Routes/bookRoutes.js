/**
 * Created by gabguy on 05/05/2015.
 */
var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    bookRouter.route('/')
        .post(function (request, response) {
            var book = new Book(request.body);

            book.save();
            response.status(201).send(book); // Created
        })
        .get(function (request, response) {
            var query = {};

            if (request.query.genre) // Cleaning user request
            {
                query.genre = request.query.genre;
            }

            Book.find(query, function (err, books) {
                if (err)
                {
                    response.status(500).send(err);
                }
                else
                {
                    response.json(books);
                }
            });
        });

    // Middleware to reduce code duplication
    bookRouter.use('/:bookId', function (request, response, next) {
        Book.findById(request.params.bookId,
            function (err, book) {
                if (err)
                {
                    response.status(500).send(err);
                }
                else if(book)
                {
                    request.book = book;
                    next();
                }
                else
                {
                    response.status(404).send('No book found!');
                }
            });
    });

    bookRouter.route('/:bookId')
        .get(function (request, response) {
            response.json(request.book);
        })
        .put(function (request, response) {
            request.book.title = request.body.title;
            request.book.author = request.body.author;
            request.book.genre = request.body.genre;
            request.book.read = request.body.read;
            request.book.save(function (err) {
                if (err)
                {
                    response.status(500).send(err);
                }
                else
                {
                    response.json(request.book);
                }
            });
        })
        .patch(function (request, response) {
            if (request.body._id)
            {
                delete request.body._id; // So we won't be able to update the id
            }

            for (var key in request.body)
            {
                request.book[key] = request.body[key];
            }

            request.book.save(function (err) {
                if (err)
                {
                    response.status(500).send(err);
                }
                else
                {
                    response.json(request.book);
                }
            });
        })
        .delete(function (request, response) {
            request.book.remove(function (err) {
                if (err)
                {
                    response.status(500).send(err);
                }
                else
                {
                    response.status(204).send('Removed');
                }
            });
        });

    return bookRouter;
};

module.exports = routes;