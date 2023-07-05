import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getClients } from "../../redux/features/client/clientSlice";
import ClientList from "../../components/client/clientList/ClientList";

const Clients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("shouldReloadDashboard")) {
      window.location.reload();
      sessionStorage.removeItem("shouldReloadDashboard");
    }
  }, []);
  useRedirectLoggedOutUser("/login");

  const isLoggedin = useSelector(selectIsLoggedIn);
  const { client, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getClients());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message]);

  return (
    <div>
      <ClientList client={client} isLoading={isLoading} />
    </div>
  );
};

export default Clients;
