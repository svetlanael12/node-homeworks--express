const express = require('express')
const router = require('./routes/index')
const error404 = require('./middleware/error404')

const app = express()
app.use(express.json())

app.use('/api', router)
app.use(error404)

const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }))
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))