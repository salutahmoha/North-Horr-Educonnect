import { Link } from "react-router-dom";
import React from "react";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import logo from "../../assets/NHClogo-1.png";

function Navbar() {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333",
      color: "var(--color-white)",
      height: "3rem",
      padding: "0 1rem",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
    },
    logo: {
      fontSize: "1rem",
      fontWeight: "bold",
      margin: 0,
      paddingTop: "0.5rem",
    },
    logoImage: {
      height: "2.5rem",
      width: "auto",
    },
    navlist: {
      display: "flex",
      gap: "2rem",
      listStyle: "none",
    },
    link: {
      color: "white",
      fontSize: "1.2rem",
      textDecoration: "none",
    },

    button: {
      padding: "0.5rem 1rem",
      backgroundColor: "var(--color-btn)",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      color: "#282c34",
      fontWeight: "bold",
    },
  };
  return (
    <div className="navbar" style={styles.navbar}>
      <div className="logo" style={styles.logo}>
        <img src={logo} alt="" className="logoImage" style={styles.logoImage} />
      </div>
      <div className="navlist" style={styles.navlist}>
        <Link to="/" style={styles.link}>
          <li>Home</li>
        </Link>
        <Link to="/About" style={styles.link}>
          <li>About</li>
        </Link>
      </div>
      <div className="nav-btn">
        <button className="btn-navbar" style={styles.button}>
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Navbar;
