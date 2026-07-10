import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Student Management System</div>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students/add"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Add Student
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
