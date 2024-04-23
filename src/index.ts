import { config } from 'dotenv'
import express from 'express'
import apiRouter from '~/routes/api.routes'
import databaseService from '~/services/database.services'
config()
const app = express()
const port = 4000
databaseService.connect()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Cho phép truy cập từ tất cả các nguồn (*)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS') // Cho phép các phương thức yêu cầu
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization') // Cho phép các tiêu đề yêu cầu
  next()
})
app.use('/api', apiRouter)
app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
