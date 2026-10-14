import { useState } from 'react'
import PropTypes from 'prop-types'
import logoNewPost from '../assets/logoNewPost.svg'

const formatarData = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })

function PostCard({ post, onEditar, onApagar }) {
  const [imagemQuebrada, setImagemQuebrada] = useState(false)

  return (
    <div className="post" id={`post-${post.id}`}>
      <div className="user">
        <img src={logoNewPost} className="logoPost" alt="Logo do post" />
        <div className="username">
          <h1 className="namePost">Include Jr</h1>
          <span className="descriptionName">Dev. web | soluções inovadoras</span>
          <span className="postDate">{formatarData(post.criado_em)}</span>
        </div>
      </div>
      <div className="descriptionPost">
        <h1 className="titlePost">{post.titulo}</h1>
        <p className="contentPost">{post.conteudo}</p>
        {post.imagem && !imagemQuebrada && (
          <img
            className="postImage"
            src={post.imagem}
            alt={`Imagem do post: ${post.titulo}`}
            onError={() => setImagemQuebrada(true)}
          />
        )}
        <div className="buttons">
          <button type="button" className="button1" onClick={() => onEditar(post)}>
            Editar
          </button>
          <button type="button" className="button2" onClick={() => onApagar(post)}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    conteudo: PropTypes.string.isRequired,
    imagem: PropTypes.string,
    criado_em: PropTypes.string.isRequired,
  }).isRequired,
  onEditar: PropTypes.func.isRequired,
  onApagar: PropTypes.func.isRequired,
}

export default PostCard
