import { useNavigate } from "react-router-dom";

function LogoutButton(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");

    // Update the auth state
    props.setAuth(false);

    location.reload();
  };

  return (
    <span className="logout-span" onClick={handleLogout}>
      Logout
    </span>
  );
}

export default LogoutButton;
