import { Link } from "react-router-dom"
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import { useState } from "react"

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)

  const {name, email, password, password2} = formData

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value})
  }

  const register = (e) => {
    e.preventDefault()
    console.log(formData);
  }


  return (
    <div className={`container ${styles.auth}`}>
      <Card> 
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999"/>
          </div>
          <h2> Cadastra-se </h2>
          <span className={styles.register}>
            <p>Já tem uma conta ?<Link to="/login"> Entre aqui </Link></p>
          </span>
          <form onSubmit={register}>
            <input type="text" placeholder="Nome" required name="name" value={name} onChange={handleInputChange}/>
            <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange}/>
            <input type="password" placeholder="Senha" required name="password" value={password} onChange={handleInputChange}/>
            <input type="password" placeholder="Confirmar Senha" required name="password2" value={password2} onChange={handleInputChange}/>
            <button type="submit" className="--btn --btn-primary --btn-block"> Criar Conta </button>
          </form>
          <span className={styles.register}>
            <Link to="/"> Home </Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register