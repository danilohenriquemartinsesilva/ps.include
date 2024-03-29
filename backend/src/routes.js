import { Router } from 'express'
import SelecaoController from './app/controllers/SelecaoController.js'

const router = Router()

// ROTAS
router.get('/blog', SelecaoController.index)
router.get('/blog/:id', SelecaoController.show)
router.post('/blog', SelecaoController.store)
router.put('/blog/:id', SelecaoController.update)
router.delete('/blog/:id', SelecaoController.delete)

export default router
