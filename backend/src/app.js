import express from 'express'
import routes from './routes.js'
import cors from 'cors'

const app = express()

// indicar para o express ler body com json
app.use(express.json())

app.use(cors())

// usar o routes depois do app.use(express.json())
app.use(routes)

export default app

// eu tinha conseguido conectar o banco de dados do mysql, mas eu fui alterar algumas coisas aqui no back e acabei fazendo alguma besteira.
