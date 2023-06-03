const Router = require('express')
const router = new Router()
const booksRouter = require('./booksRouter')
const userRouter = require('./userRouter')

router.use('/books', booksRouter)
router.use('/user', userRouter)

module.exports = router