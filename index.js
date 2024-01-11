const express = require('express')
const userRouter = require('./routes/userRoutes.js')
const factRouter = require('./routes/factRoutes.js')
const cors = require('cors')
const connect = require('./database/db.js')

const app = express()
const port = 8001
app.use(express.json())
app.use(cors())

connect()

app.use(userRouter)
app.use(factRouter)

app.listen(port, () => {
    console.log(`your backend server is running on ${port}`)
})
