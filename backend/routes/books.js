const {Router} = require('express');
const router = Router();
const Book = require('../models/book');
const {unlink} = require('fs-extra');
const path = require('path');

router.get('/',async (req, res) => {
    const books = await Book.find();    // busca y devuelve todos los libros que tenemos en la bbdd
    res.json(books);
});

router.post('/', async(req,res)=>{
    const {title, author, isbn} = (req.body);
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, isbn, imagePath});
    await newBook.save();
    res.json({message:'book saved'});
});

router.delete('/:id', async(req, res)=>{
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public' + book.imagePath));
    res.json({message:'Book deleted'});
});

module.exports = router;