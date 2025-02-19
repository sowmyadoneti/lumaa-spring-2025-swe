import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
  };

  return (
    <nav style={styles.navbar}>
      <h2>Task Management</h2>
      <div>
        {!token ? (
          <>
            <Link to="/login" style={styles.link}>Log in</Link>
            <Link to="/" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/tasks" style={styles.link}>My Tasks</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  link: {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    fontSize: "16px",
    borderRadius: "5px",
  },
};

export default NavBar;
