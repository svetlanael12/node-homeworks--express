const Router = require('express')
const router = new Router()
const Book = require('../constants/Book')
const {library} = require('../constants/library')
const fileMulter = require('../middleware/upload-file')
// const fisleMulter = require('../public')

// получить все книги
router.get('/', (req, res) => {
  const {books} = library
  res.json(books)
})

// получить книгу по ID
router.get('/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json({status: '404 | страница не найдена'})
  }
})

// скачать книгу по ID
router.get('/:id/download', (req, res) => {
  const {books} = library;
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx !== -1){
    if (books[idx].fileBook) {
      const file = `${__dirname}/../${books[idx].fileBook}`;
      res.download(file);
    }
  } else {
    res.status(404)
    res.json({status: '404 | страница не найдена'})
  }
})

// создать книгу
router.post('/', 
  fileMulter.single('book-file'),
  (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    let fileBook
    if(req.file){
      const {path} = req.file
      fileBook = path
    }
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
  }
)

// редактировать книгу по ID
router.put('/:id', 
  fileMulter.single('book-file'),
  (req, res) => {
    const {books} = library
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    let fileBook
    if(req.file){
      const {path} = req.file
      fileBook = path
    }

    if (idx !== -1){
      books[idx] = {
        ...books[idx],
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName,
        fileBook
      }
      res.json(books[idx])
    } else {
      res.status(404)
      res.json({status: '404 | страница не найдена'})
    }
  }
)

// удалить книгу по ID
router.delete('/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
   
  if(idx !== -1){
    books.splice(idx, 1)
    res.json({status: 'ok'})
  } else {
    res.status(404)
    res.json({status: '404 | страница не найдена'})
  }
})

module.exports = router