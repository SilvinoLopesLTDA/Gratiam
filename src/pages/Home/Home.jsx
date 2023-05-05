import { GrGatsbyjs } from "react-icons/gr"
import { Link } from 'react-router-dom'

import heroImg from '../../../public/assets/inv-img.png'

import "./Home.scss"
import NumberText from "./NumberText"
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink"

const Home = () => {
  return (
    <div className="home">
        <nav className="container --flex-between">
          <div className="logo">
            <GrGatsbyjs size={35} />
          </div>
          <ul className="home-links">
            <ShowOnLogout>
              <li>
                <Link to="/register" className="register-link"> Cadastrar </Link>
              </li>
            </ShowOnLogout>
            <ShowOnLogout>
              <li>
                  <button className="--btn --btn-primary">
                    <Link to="/login"> Entrar </Link>
                  </button>
                </li>
            </ShowOnLogout>
            <ShowOnLogin>
              <li>
                <button className="--btn --btn-primary">
                  <Link to="/dashboard"> Dashboard </Link>
                </button>
              </li>
            </ShowOnLogin>
          </ul>
        </nav>

        {/* HERO SECTION */}

        <section className="container hero">
          <div className="hero-text">
            <h1> Solução de<span> gerenciamento </span>de inventário e estoque </h1>
            <p> Sistema de inventário para controlar e gerir os produtos do armazém em tempo real e integrado para facilitar o desenvolvimento do seu negócio. </p>
            <div className="hero-buttons">
              <button className="--btn --btn-secondary">
                <Link to="/register" className="--color-dark"> Comece Aqui </Link>
              </button>
            </div>
            <div className="--flex-start">
              <NumberText num="14K" text="Marcas" />
              <NumberText num="23K" text="Usuarios Ativos" />
              <NumberText num="500+" text="Parceiros" />
            </div>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Imagem da Dashboard" />
          </div>
        </section>
    </div>
  )
}

export default Home