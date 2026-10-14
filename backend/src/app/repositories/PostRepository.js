import { consulta } from '../database/conexao.js'

class PostRepository {
    // CRUD
    async create({ titulo, conteudo, imagem }) {
        const sql = 'INSERT INTO posts (titulo, conteudo, imagem) VALUES (?, ?, ?);'
        const resultado = await consulta(sql, [titulo, conteudo, imagem || null], 'Não foi possível cadastrar!')
        return this.findById(resultado.insertId)
    }

    findAll() {
        const sql = 'SELECT * FROM posts ORDER BY criado_em DESC, id DESC;'
        return consulta(sql, [], 'Não foi possível localizar!')
    }

    async findById(id) {
        const sql = 'SELECT * FROM posts WHERE id = ?;'
        const linhas = await consulta(sql, [id], 'Não foi possível localizar!')
        return linhas[0] || null
    }

    async update(id, { titulo, conteudo, imagem }) {
        const sql = 'UPDATE posts SET titulo = ?, conteudo = ?, imagem = ? WHERE id = ?;'
        const resultado = await consulta(sql, [titulo, conteudo, imagem || null, id], 'Não foi possível atualizar!')
        if (resultado.affectedRows === 0) return null
        return this.findById(id)
    }

    async delete(id) {
        const sql = 'DELETE FROM posts WHERE id = ?;'
        const resultado = await consulta(sql, [id], 'Não foi possível apagar!')
        return resultado.affectedRows > 0
    }
}

// padrão Singleton
export default new PostRepository()
