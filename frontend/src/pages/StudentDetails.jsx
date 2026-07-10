import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getStudentById } from "../services/studentService";
import styles from "./StudentDetails.module.css";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getStudentById(id);
        setStudent(response.data.data);
      } catch (err) {
        setError("Failed to load student details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <button
          onClick={() => navigate("/students")}
          className={styles.backBtn}
        >
          Back to Student List
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{student.name}</h2>
        <div className={styles.detailRow}>
          <span className={styles.label}>Email</span>
          <span>{student.email}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Course</span>
          <span>{student.course}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Age</span>
          <span>{student.age}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>City</span>
          <span>{student.city}</span>
        </div>
        <div className={styles.detailRow}>
          <span className={styles.label}>Added On</span>
          <span>{new Date(student.createdAt).toLocaleDateString()}</span>
        </div>

        <div className={styles.actions}>
          <Link to={`/students/${student._id}/edit`} className={styles.editBtn}>
            Edit
          </Link>
          <Link to="/students" className={styles.backLink}>
            Back to List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
