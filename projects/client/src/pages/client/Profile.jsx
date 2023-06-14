import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.user);

  // protected route
  if (!user?.id) {
    return <h1>Forbidden</h1>;
  }

  return (
    <div>
      <h1>Profile {user?.email} </h1>
    </div>
  );
}

export default Profile;
