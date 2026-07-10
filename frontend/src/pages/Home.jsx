import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <h1>Welcome to the Student Management System</h1>
      <p>
        Manage student records with ease — add, view, edit, and delete students.
      </p>
      <div className={styles.actions}>
        <Link to="/students" className={styles.primaryBtn}>
          View All Students
        </Link>
        <Link to="/students/add" className={styles.secondaryBtn}>
          Add New Student
        </Link>
      </div>
    </div>
  );
}

export default Home;
