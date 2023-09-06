import PropTypes from "prop-types";

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr-3">
      <h3 className="--color-dark">{num}</h3>
      <p className="--color-dark">{text}</p>
    </div>
  );
};

NumberText.propTypes = {
  num: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NumberText;
