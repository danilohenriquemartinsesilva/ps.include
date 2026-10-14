import 'dotenv/config'
import mysql from 'mysql2'

// Pool de conexões: reaproveita conexões e se recupera se o MySQL cair.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306, // porta do MySQL (a do servidor Node é outra!)
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'blog_include',
    waitForConnections: true,
    connectionLimit: 10
})

/**
 * Executa um comando SQL com ou sem valores.
 * @param {string} sql instrução SQL a ser executada
 * @param {any} valores valores para os "?" do SQL (opcional)
 * @param {string} mensagemReject mensagem de erro amigável
 * @returns {Promise<any>} linhas (SELECT) ou resultado (INSERT/UPDATE/DELETE)
 */
export const consulta = (sql, valores = [], mensagemReject = 'Erro no banco de dados') => {
    return new Promise((resolve, reject) => {
        pool.query(sql, valores, (erro, resultado) => {
            if (erro) {
                console.error(`[DB] ${mensagemReject}:`, erro.message)
                return reject(new Error(mensagemReject))
            }
            return resolve(resultado)
        })
    })
}

export default pool
