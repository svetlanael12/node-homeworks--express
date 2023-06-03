const Router = require('express')
const router = new Router()

// авторизация пользователя (метод всегда возвращает Code: 201 и статичный объект: { id: 1, mail: "test@mail.ru" })
router.post('/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

module.exports = router