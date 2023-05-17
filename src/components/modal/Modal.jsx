import PropTypes from "prop-types"
import './Modal.scss'

const Modal = ({ id="modal", onClose = () => {}, children }) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }
  return (
    <div id="modal" className="modal" onClick={handleOutsideClick}>
        <div className="container">
            <button className="close" onClick={onClose}/>
                <div className="content">{children}</div>
        </div>
    </div>
  )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  }

export default Modal