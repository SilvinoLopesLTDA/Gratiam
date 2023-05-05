import { Link } from "react-router-dom"
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { AiOutlineMail } from "react-icons/ai"
import { useState } from "react"
import { forgotPassword, validateEmail } from "../../services/authService"
import { toast } from "react-toastify"

const Forgot = () => {

  const [email, setEmail] = useState("")

  const forgot = async (e) => {
    e.preventDefault()

    if (!email) {
      return toast.error("Preencha o campo corretamente")
    }

    if (!validateEmail(email)) {
      return toast.error("Por favor digite um email valido")
    }

    const userData = {
      email
    }

    await forgotPassword(userData)
    setEmail("")
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Card> 
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999"/>
          </div>
          <h2> Esqueceu a Senha ? </h2>
          <form onSubmit={forgot}>
            <input type="email" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <button type="submit" className="--btn --btn-primary --btn-block"> Obter Email de Redefinição </button>
          <div className={styles.links}>
            <p><Link to="/"> -Home </Link></p> 
            <p><Link to="/login"> -Entrar </Link></p>
          </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Forgot