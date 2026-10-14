import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

// Extrai a mensagem de erro enviada pela API (ou uma mensagem padrão)
export function mensagemDeErro(erro) {
  if (erro.response?.data?.erro) return erro.response.data.erro
  if (erro.code === 'ERR_NETWORK') return 'Não foi possível conectar ao servidor. Ele está rodando?'
  return 'Ocorreu um erro inesperado.'
}

export const listarPosts = () => api.get('/posts').then((r) => r.data)
export const criarPost = (dados) => api.post('/posts', dados).then((r) => r.data)
export const atualizarPost = (id, dados) => api.put(`/posts/${id}`, dados).then((r) => r.data)
export const apagarPost = (id) => api.delete(`/posts/${id}`)
