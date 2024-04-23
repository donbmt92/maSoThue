import { Router } from 'express'
import {
  deleteController,
  getController,
  getTaxeController,
  searchController,
  updateController,
  uploadController
} from '~/controllers/api.controllers'

const apiRouter = Router()
apiRouter.get('/', getController)
apiRouter.get('/get/:id', getTaxeController)
apiRouter.post('/search', searchController)
apiRouter.post('/upload', uploadController)
apiRouter.delete('/delete/:id', deleteController)
apiRouter.patch('/update/:id', updateController)
export default apiRouter
