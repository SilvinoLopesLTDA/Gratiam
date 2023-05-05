import { useState } from 'react'
import Card from '../../components/card/Card'
import './Contact.scss'
import { toast } from 'react-toastify'
import { BACKEND_URL } from '../../services/authService'
import axios from 'axios'

const contact = () => {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const data = {
        subject,
        message
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/api/contactus/`, data)
            setSubject("")
            setMessage("")
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='contact'>
        <h3 className="--mt">
            Envie seu Feedback
        </h3>
        <div className="section">
            <form onSubmit={sendEmail}>
                <Card cardClass="card">
                    <label> Assunto </label>
                    <input
                        type="text"
                        name="subject"
                        placeholder='Assunto'
                        required 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <label> Mensagem </label>
                    <textarea 
                        cols="30"
                        rows="10"
                        name="message" 
                        required 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <button className='--btn --btn-primary'> Enviar </button>
                </Card>
            </form>
        </div>
    </div>
  )
}

export default contact