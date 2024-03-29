// tive que pegar o codigo htlm e tranformar pra jsx, pois não estava conseguindo integrar
import logoHeader from './assets/logoHeader.svg'
import logoNewPost from './assets/logoNewPost.svg'
import image from './assets/image.svg'
import imagenone from './assets/imagenone.png'
import mail from './assets/mail.svg'
import linkedin from './assets/linkedin.svg'
import instagram from './assets/instagram.svg'
import log_out from './assets/log_out.svg'

import React, { useEffect } from 'react'
import './App.css'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

function App() {
// não consegui testar as requisições pq eu perdi meu banco de dados no backend(tentando alterar algumas coisas)
// mas acho que "só" faltava isso, colocar as rotas para funcionar
  api.get('/blog').then((response) => {
    console.log(response)
  })

  return (
    <div className="body">
      <header className="header">
        <img className="logo_header" src={logoHeader} alt="Logo do cabeçalho" />
      </header>

      <section className="feed">
        <div className="main">
          <div className="newPost">
            <img src={logoNewPost} alt="Ícone de novo post" />
            <form action="" method="post" className="formNewPost">
              <div className="texts">
                <textarea className="title" placeholder="Escreva seu tema..."></textarea>
                <textarea className="publication" placeholder="Escreva sua publicação..."></textarea>
              </div>

              <div className="buttons">
                <button className="button1">Adicionar imagem <img src={image} alt="Ícone de imagem" /></button>
                <button className="button2">Publicar <img src={log_out} alt="Ícone de publicar" /></button>
              </div>
            </form>
          </div>

          <div className="post">
            <div className="user">
              <img src={logoNewPost} className="logoPost" alt="Logo do post" />
              <div className="username">
                <h1 className="namePost">Include Jr</h1>
                <span className="descriptionName">Dev. web | soluções inovadoras</span>
              </div>
            </div>
            <div className="descriptionPost">
              <h1 className="titlePost">Tema Lorem Ipsum</h1>
              <p className="contentPost">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus gravida sodales consequat. Curabitur condimentum congue felis eget congue. Fusce sed magna nec sem luctus dictum id at nibh.
              </p>
              <img className="postImage" src={imagenone} alt="Imagem do post" />
              <div className="buttons">
                <button className="button1">Adicionar imagem <img src={image} alt="Ícone de imagem" /></button>
                <button className="button2">Publicar <img src={log_out} alt="Ícone de publicar" /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="recent">
          <div className="recents">
            <h1 className="titlesection">Ultimas publicações</h1>
            <div className="postsrecents">
              <h2 className="article">TEMA LOREM IPSUM..</h2>
              <h2 className="article">TEMA LOREM IPSUM..</h2>
              <h2 className="article">TEMA LOREM IPSUM..</h2>
            </div>
          </div>
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