import "./Profile.scss";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../services/authService";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();

      setProfile(data);
      setIsLoading(false);
      dispatch(SET_USER(data));
      dispatch(SET_NAME(data.name));
    }
    getUserData();
  }, [dispatch]);

  const formattedBio = profile?.bio.replace(/\n/g, "<br />");

  return (
    <div className="profile">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p> Aldo deu Errado, Por favor recarregue a pagina</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="Foto do Perfil" />
            </span>
            <span className="profile-data">
              <p style={{ fontSize: "1.8em" }}>
                <b>Nome:</b> {profile?.name}
              </p>
              <p style={{ fontSize: "1.8em" }}>
                <b>Email:</b>{" "}
                <span className="--color-primary">{profile?.email}</span>
              </p>
              <p style={{ fontSize: "1.8em" }}>
                <b>Telefone:</b> {profile?.phone}
              </p>
              <p style={{ fontSize: "1.8em" }}>
                <b>Descrição:</b>
                <br />
                <br />
                {profile?.bio ? (
                  <p dangerouslySetInnerHTML={{ __html: formattedBio }}></p>
                ) : (
                  <p>Nenhuma descrição informada!</p>
                )}
              </p>
              <div className="btn-edit">
                <Link to="/edit-profile">
                  <button
                    className="--btn --btn-primary"
                    style={{ marginTop: "1em" }}
                  >
                    {" "}
                    Editar Perfil
                  </button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
