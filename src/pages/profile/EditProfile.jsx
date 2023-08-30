import { useState } from "react";
import "./EditProfile.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "../../services/authService";
import ChangePassword from "../../components/changePassword/ChangePassword";
import Modal from "../../components/modal/Modal";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const initialState = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    bio: user?.bio,
    photo: user?.photo,
  };
  const [profile, setProfile] = useState(initialState);
  const [profileImage, setProfileImage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //Handle Image upload
      let imageURL;
      if (
        profileImage &&
        (profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg" ||
          profileImage.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImage);
        image.append("cloud_name", "dpyrlntco");
        image.append("upload_preset", "nqsh9wjr");

        // First save image to cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpyrlntco/image/upload",
          {
            method: "post",
            body: image,
          }
        );
        const imgData = await response.json();
        imageURL = imgData.url.toString();
      }

      // Save Profile
      const formData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        photo: profileImage ? imageURL : profile.photo,
      };
      const data = await updateUser(formData);
      console.log(data);
      toast.success("Usuario Atualizado");
      navigate("/profile");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="profileEdit --my2">
      {isLoading && <Loader />}
      <Card cardClass={"card --flex-dir-column"}>
        <div className="form_top">
          <span className="profileEdit-photo">
            <img src={user?.photo} alt="Foto do Perfil" />
          </span>
          <form className="--form-control --m" onSubmit={saveProfile}>
            <span className="profileEdit-data">
              <div className="input_info_top">
                <p>
                  <label> Foto: </label>
                  <input
                    type="file"
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleImageChange}
                  />
                </p>
                <p>
                  <label> Nome: </label>
                  <input
                    type="text"
                    name="name"
                    value={profile?.name}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label> Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={profile?.email}
                    disabled
                  />
                  <br />
                  <code>O Email não pode ser Alterado </code>
                </p>
                <button
                  className="--btn --btn-primary btn-modal"
                  type="button"
                  onClick={() => setIsModalVisible(true)}
                >
                  Alterar Senha
                </button>
                {isModalVisible ? (
                  <Modal onClose={() => setIsModalVisible(false)}>
                    <ChangePassword />
                  </Modal>
                ) : null}
              </div>
            </span>
          </form>
        </div>

        <div className="form_bottom">
          <form className="--form-control --m" onSubmit={saveProfile}>
            <span className="profileEdit-data">
              <div className="input_info_bottom">
                <p>
                  <label> Telefone: </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile?.phone}
                    onChange={handleInputChange}
                  />
                </p>
                <p>
                  <label> Descrição: </label>
                  <textarea
                    name="bio"
                    value={profile?.bio}
                    onChange={handleInputChange}
                    cols="30"
                    rows={10}
                  ></textarea>
                </p>
                <div>
                  <button className="--btn --btn-primary"> Salvar </button>
                </div>
              </div>
            </span>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditProfile;
