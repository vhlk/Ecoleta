import React from "react"
import logo from "../../assets/logo.svg"
import "./styles.css"
import {FiLogIn} from "react-icons/fi"
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header> <img src={logo} alt="Logo" /> </header>
      <main>
        <h1>Bem vindo ao marketplace de resíduos recicláveis</h1>
        <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
        <Link to="/create-point">
          <span> <FiLogIn /> </span>
          <strong>Cadastre agora seu ponto de coleta</strong>
        </Link>
      </main>
      </div>
    </div>
  )
}

export default Home