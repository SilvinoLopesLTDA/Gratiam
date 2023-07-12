import PropTypes from "prop-types";
import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, count, icon, onClick }) => {
  return (
    <div className={`info-box ${bgColor}`} onClick={onClick}>
      <span className="info-icon --color-white">{icon}</span>
      <span className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  bgColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.object.isRequired,
  onClick: PropTypes.func, // Adicione a propriedade de evento de clique
};

export default InfoBox;
