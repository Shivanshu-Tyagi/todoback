const express = require('express') 
const connectDB = require('./database/dbConnection')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors())

app.use(express.json())
connectDB();

app.use('/users' , require('./api/users'))
app.use('/todos' , require('./api/todos'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))