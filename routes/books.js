var express = require('express');
var router = express.Router();
var db = require('../db/api');

//Show books //

router.get('/', function(req, res, next) {
  db.listbooks().then(function(data){
    res.render('listbooks', {books: data});
  });
});


//Add a book//

router.get('/addbooks', function(req, res, next){
  res.render('addbook');
});

  router.post('/addbooks', function(req, res, next){
    var book = {
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      image: req.body.image
    };
    db.addBook(book).then(function(){
      res.redirect('/books');
    });
  });

//Show book details//

    router.get('/:id', function(req, res, next){
      console.log(req.params.id);
      db.findBookById(req.params.id).then(function(data){
        res.render('bookdetail', {book: data});
      });
    });

//Delete Book//

router.get('/:id/deletebook', function(req, res, next) {
 db.deletebook(req.params.id).then(function(){
   res.redirect('/books');
 }).catch(function(error) {
     next(error);
 });
});

//Edit Book//

router.get('/:id/editbook',
function(req, res, next){
  db.findBookById(req.params.id).then(function(data){
    res.render('editbook', {book: data});
  });
});

router.post('/:id/editbook', function(req, res, next){
  var book = {
    title: req.body.title,
    genre: req.body.genre,
    description: req.body.description,
    image: req.body.image
  };
  db.editBook(req.params.id, book).then(function(){
    res.redirect('/books');
  });
});


module.exports = router;
