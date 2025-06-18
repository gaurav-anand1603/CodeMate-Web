import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div>
        <div>
          <EditProfile user={user} />
        </div>
      </div>
    )
  );
};

export default Profile;
