import { useState } from 'react'
import './ChangePassword.scss'
import { toast } from 'react-toastify'
import { changePassword } from '../../services/authService'
import Card from '../card/Card'
import { useNavigate } from 'react-router-dom'

const initialState = {
    oldPassword: "",
    password: "",
    password2: "",
  }

const ChangePassword = () => {
    const [formData, setFormData] = useState(initialState)
    const { oldPassword, password, password2 } = formData
    const navigate = useNavigate()
  
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    }

    const changePass = async (e) => {
        e.preventDefault()

        if(password !== password2) {
            return toast.error(" As novas senhas não se coincidem")
        }

        const formData = {
            oldPassword,
            password,
            password2
        }

        const data = await changePassword(formData)
        toast.success(data)
        navigate("/profile")
    }


  return (
    <div className='change-password'>
        <Card cardClass="password-card">
            <h3> Alterar Senha </h3>
            <form onSubmit={changePass} className='--form-control'>
                <input type="password" placeholder="Senha Atual" required name="oldPassword"  value={oldPassword} onChange={handleInputChange} />
                <input type="password" placeholder="Nova Senha" required name="password"  value={password} onChange={handleInputChange} />
                <input type="password" placeholder="Confirmar Nova Senha" required name="password2"  value={password2} onChange={handleInputChange} />
                <button type='submit' className='--btn --btn-primary'> Alterar </button>
            </form>
        </Card>
    </div>
  )
}

export default ChangePassword