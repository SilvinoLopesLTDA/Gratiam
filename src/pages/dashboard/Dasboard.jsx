import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser"


const Dasboard = () => {
  useRedirectLoggedOutUser("/login")

  return (
    <div>
        <h2> Dashboard </h2>
    </div>
  )
}

export default Dasboard