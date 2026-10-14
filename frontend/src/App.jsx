import { useCallback, useEffect, useState } from 'react'
import logoHeader from './assets/logoHeader.svg'
import mail from './assets/mail.svg'
import linkedin from './assets/linkedin.svg'
import instagram from './assets/instagram.svg'

import NewPostForm from './components/NewPostForm.jsx'
import PostCard from './components/PostCard.jsx'
import RecentPosts from './components/RecentPosts.jsx'
import { listarPosts, criarPost, atualizarPost, apagarPost, mensagemDeErro } from './services/api.js'

function App() {
  const [posts, setPosts] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const [postEmEdicao, setPostEmEdicao] = useState(null)

  const carregarPosts = useCallback(async () => {
    setCarregando(true)
    setErro('')
    try {
      setPosts(await listarPosts())
    } catch (e) {
      setErro(mensagemDeErro(e))
    } finally {
      setCarregando(false)
    }
  }, [])

  // busca os posts uma vez, quando a página abre
  useEffect(() => {
    carregarPosts()
  }, [carregarPosts])

  // devolve true se salvou (o formulário usa isso para se limpar)
  const salvarPost = async (dados) => {
    setEnviando(true)
    setErro('')
    try {
      if (postEmEdicao) {
        const atualizado = await atualizarPost(postEmEdicao.id, dados)
        setPosts(posts.map((p) => (p.id === atualizado.id ? atualizado : p)))
        setPostEmEdicao(null)
      } else {
        const novo = await criarPost(dados)
        setPosts([novo, ...posts])
      }
      return true
    } catch (e) {
      setErro(mensagemDeErro(e))
      return false
    } finally {
      setEnviando(false)
    }
  }

  const iniciarEdicao = (post) => {
    setPostEmEdicao(post)
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })
  }

  const apagar = async (post) => {
    if (!window.confirm(`Excluir a publicação "${post.titulo}"?`)) return
    setErro('')
    try {
      await apagarPost(post.id)
      setPosts(posts.filter((p) => p.id !== post.id))
      if (postEmEdicao?.id === post.id) setPostEmEdicao(null)
    } catch (e) {
      setErro(mensagemDeErro(e))
    }
  }

  return (
    <div className="body">
      <header className="header">
        <img className="logo_header" src={logoHeader} alt="Logo do cabeçalho" />
      </header>

      <section className="feed">
        <div className="main">
          <NewPostForm
            postEmEdicao={postEmEdicao}
            onSalvar={salvarPost}
            onCancelar={() => setPostEmEdicao(null)}
            enviando={enviando}
          />

          {erro && (
            <div className="alert" role="alert">
              {erro}
              <button type="button" className="alertRetry" onClick={carregarPosts}>
                Tentar de novo
              </button>
            </div>
          )}

          {carregando && <p className="statusMessage">Carregando publicações...</p>}

          {!carregando && !erro && posts.length === 0 && (
            <p className="statusMessage">Nenhuma publicação ainda. Escreva a primeira!</p>
          )}

          {posts.map((post) => (
            <PostCard key={post.id} post={post} onEditar={iniciarEdicao} onApagar={apagar} />
          ))}
        </div>

        <div className="recent">
          <RecentPosts posts={posts} />
          <h1 className="copyright">Direitos reservados à empresa Include Jr.</h1>
        </div>
      </section>

      <footer className="footer">
        <img src={logoHeader} alt="Logo do rodapé" />
        <span className="textFooter">Direitos reservados à empresa Include Jr.</span>
        <div className="icons">
          <img src={mail} alt="Ícone de e-mail" />
          <img src={linkedin} alt="Ícone do LinkedIn" />
          <img src={instagram} alt="Ícone do Instagram" />
        </div>
      </footer>
    </div>
  )
}

export default App
