import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes.js'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))

// indicar para o express ler body com json
app.use(express.json())

// usar o routes depois do app.use(express.json())
app.use(routes)

// rota não encontrada
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada.' })
})

// tratamento de erros (precisa ter 4 parâmetros para o Express reconhecer)
// eslint-disable-next-line no-unused-vars
app.use((erro, req, res, next) => {
    console.error(erro)
    res.status(500).json({ erro: erro.message || 'Erro interno do servidor.' })
})

export default app
