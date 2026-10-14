import PostRepository from '../repositories/PostRepository.js'

// Valida o body e devolve só os campos permitidos (evita gravar colunas inesperadas)
function validarPost(body = {}) {
    const titulo = String(body.titulo ?? '').trim()
    const conteudo = String(body.conteudo ?? '').trim()
    const imagem = String(body.imagem ?? '').trim()

    if (!titulo) return { erro: 'O título é obrigatório.' }
    if (titulo.length > 150) return { erro: 'O título pode ter no máximo 150 caracteres.' }
    if (!conteudo) return { erro: 'O conteúdo é obrigatório.' }
    if (imagem && !/^https?:\/\//i.test(imagem)) return { erro: 'A imagem deve ser uma URL http(s).' }

    return { dados: { titulo, conteudo, imagem: imagem || null } }
}

// O id da URL precisa ser um inteiro positivo
const idValido = (id) => /^[1-9]\d*$/.test(id)

class PostController {
    async index(req, res) {
        const posts = await PostRepository.findAll()
        res.json(posts)
    }

    async show(req, res) {
        if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido.' })
        const post = await PostRepository.findById(req.params.id)
        if (!post) return res.status(404).json({ erro: 'Post não encontrado.' })
        res.json(post)
    }

    async store(req, res) {
        const { erro, dados } = validarPost(req.body)
        if (erro) return res.status(400).json({ erro })

        const post = await PostRepository.create(dados)
        res.status(201).json(post)
    }

    async update(req, res) {
        if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido.' })
        const { erro, dados } = validarPost(req.body)
        if (erro) return res.status(400).json({ erro })

        const post = await PostRepository.update(req.params.id, dados)
        if (!post) return res.status(404).json({ erro: 'Post não encontrado.' })
        res.json(post)
    }

    async delete(req, res) {
        if (!idValido(req.params.id)) return res.status(400).json({ erro: 'ID inválido.' })
        const apagou = await PostRepository.delete(req.params.id)
        if (!apagou) return res.status(404).json({ erro: 'Post não encontrado.' })
        res.status(204).send()
    }
}

// padrão Singleton
export default new PostController()
