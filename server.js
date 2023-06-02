const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "", id = uuid()) {
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.id = id
  }
}

const library = {
  books: [
    new Book("Война и мир", "«Война и мир» — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года.", "Лев Толстой",),
  ],
};

const app = express()
app.use(express.json())

// получить все книги
app.get('/api/books', (req, res) => {
  const {books} = library
  res.json(books)
})

// получить книгу по ID
app.get('/api/books/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

// создать книгу
app.post('/api/books', (req, res) => {
  const {books} = library
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  books.push(newBook)

  res.status(201)
  res.json(newBook)
})

// авторизация пользователя (метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" })
app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

// редактировать книгу по ID
app.put('/api/books/:id', (req, res) => {
  const {books} = library
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)

  if (idx !== -1){
    books[idx] = {
      ...books[idx],
      title, 
      description, 
      authors, 
      favorite, 
      fileCover, 
      fileName
    }
    res.json(books[idx])
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

// удалить книгу по ID
app.delete('/api/books/:id', (req, res) => {
  const {books} = library
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
   
  if(idx !== -1){
    books.splice(idx, 1)
    res.json('ok')
  } else {
    res.status(404)
    res.json('404 | страница не найдена')
  }
})

const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))