const NumberText = ({ num, text }) => {
  return (
    <div className="--mr-3">
      <h3 className="--color-dark">{num}</h3>
      <p className="--color-dark">{text}</p>
    </div>
  );
};
export default NumberText;
