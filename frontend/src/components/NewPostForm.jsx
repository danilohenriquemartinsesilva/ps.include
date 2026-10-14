import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import logoNewPost from '../assets/logoNewPost.svg'
import image from '../assets/image.svg'
import log_out from '../assets/log_out.svg'

const VAZIO = { titulo: '', conteudo: '', imagem: '' }

// Serve para criar um post novo OU editar um existente (quando "postEmEdicao" é passado)
function NewPostForm({ postEmEdicao, onSalvar, onCancelar, enviando }) {
  const [campos, setCampos] = useState(VAZIO)
  const [mostrarImagem, setMostrarImagem] = useState(false)

  // Quando o usuário clica em "Editar", preenche o formulário com o post
  useEffect(() => {
    if (postEmEdicao) {
      setCampos({
        titulo: postEmEdicao.titulo,
        conteudo: postEmEdicao.conteudo,
        imagem: postEmEdicao.imagem || '',
      })
      setMostrarImagem(Boolean(postEmEdicao.imagem))
    } else {
      setCampos(VAZIO)
      setMostrarImagem(false)
    }
  }, [postEmEdicao])

  const atualizarCampo = (e) => setCampos({ ...campos, [e.target.name]: e.target.value })

  const aoEnviar = async (e) => {
    e.preventDefault() // evita recarregar a página
    const salvou = await onSalvar(campos)
    if (salvou) {
      setCampos(VAZIO)
      setMostrarImagem(false)
    }
  }

  const podeEnviar = campos.titulo.trim() && campos.conteudo.trim() && !enviando

  return (
    <div className="newPost" id="formulario">
      <img src={logoNewPost} alt="Ícone de novo post" />
      <form className="formNewPost" onSubmit={aoEnviar}>
        <div className="texts">
          <input
            className="title"
            name="titulo"
            placeholder="Escreva seu tema..."
            maxLength={150}
            value={campos.titulo}
            onChange={atualizarCampo}
          />
          <textarea
            className="publication"
            name="conteudo"
            placeholder="Escreva sua publicação..."
            value={campos.conteudo}
            onChange={atualizarCampo}
          />
          {mostrarImagem && (
            <input
              className="imageUrl"
              name="imagem"
              type="url"
              placeholder="Cole aqui o link (URL) da imagem..."
              value={campos.imagem}
              onChange={atualizarCampo}
            />
          )}
        </div>

        <div className="buttons">
          {postEmEdicao && (
            <button type="button" className="button1" onClick={onCancelar}>
              Cancelar
            </button>
          )}
          <button type="button" className="button1" onClick={() => setMostrarImagem(!mostrarImagem)}>
            Adicionar imagem <img src={image} alt="" />
          </button>
          <button type="submit" className="button2" disabled={!podeEnviar}>
            {enviando ? 'Enviando...' : postEmEdicao ? 'Salvar' : 'Publicar'} <img src={log_out} alt="" />
          </button>
        </div>
      </form>
    </div>
  )
}

NewPostForm.propTypes = {
  postEmEdicao: PropTypes.shape({
    titulo: PropTypes.string,
    conteudo: PropTypes.string,
    imagem: PropTypes.string,
  }),
  onSalvar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
  enviando: PropTypes.bool,
}

export default NewPostForm
