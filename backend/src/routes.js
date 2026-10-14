import { Router } from 'express'
import PostController from './app/controllers/PostController.js'

const router = Router()

// Express 4 não captura erros de funções async sozinho.
// Este wrapper envia o erro para o middleware de erro em vez de derrubar o servidor.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

// ROTAS
router.get('/posts', asyncHandler(PostController.index))
router.get('/posts/:id', asyncHandler(PostController.show))
router.post('/posts', asyncHandler(PostController.store))
router.put('/posts/:id', asyncHandler(PostController.update))
router.delete('/posts/:id', asyncHandler(PostController.delete))

export default router
