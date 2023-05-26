import "./Loader.scss";
import ReactDOM from "react-dom";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <Rings
          height="80"
          width="80"
          color="#ef233c"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <Rings
        height="80"
        width="80"
        color="#ef233c"
        radius="6"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  );
};

export default Loader;
