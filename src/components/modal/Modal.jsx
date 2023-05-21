import PropTypes from "prop-types"
import './Modal.scss'

const Modal = ({ id="modal", onClose = () => {}, children, payClass, contentClass }) => {
    const handleOutsideClick = (e) => {
        if(e.target.id === id) onClose()
    }
  return (
    <div id="modal" className="modal" onClick={handleOutsideClick}>
        <div className={`${payClass} container`}>
            <button className="close" onClick={onClose}/>
                <div className={`${contentClass}`}>{children}</div>
        </div>
    </div>
  )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    payClass: PropTypes.string.isRequired,
    contentClass: PropTypes.string.isRequired
  }

export default Modal