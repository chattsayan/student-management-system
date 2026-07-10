import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllStudents, deleteStudent } from "../services/studentService";
import Spinner from "../components/Spinner";
import styles from "./StudentList.module.css";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllStudents();
      setStudents(response.data.data);
    } catch (err) {
      setError("Failed to load students. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );
    if (!confirmed) return;

    try {
      await deleteStudent(id);
      setStudents((prevStudents) => prevStudents.filter((s) => s._id !== id));
      setDeleteMessage(`${name} was deleted successfully.`);
      setTimeout(() => setDeleteMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete student. Please try again.");
      console.error(err);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key && prevConfig.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  const displayedStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const filtered = term
      ? students.filter(
          (s) =>
            s.name.toLowerCase().includes(term) ||
            s.email.toLowerCase().includes(term) ||
            s.course.toLowerCase().includes(term),
        )
      : students;

    const sorted = [...filtered].sort((a, b) => {
      const { key, direction } = sortConfig;
      const valueA = a[key];
      const valueB = b[key];

      let comparison = 0;
      if (typeof valueA === "string") {
        comparison = valueA.localeCompare(valueB);
      } else {
        comparison = valueA - valueB;
      }

      return direction === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [students, searchTerm, sortConfig]);

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ▲" : " ▼";
  };

  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Student List</h2>
        <Link to="/students/add" className={styles.addBtn}>
          + Add Student
        </Link>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      {deleteMessage && <p className={styles.success}>{deleteMessage}</p>}

      <input
        type="text"
        placeholder="Search by name, email, or course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {displayedStudents.length === 0 && !error ? (
        <p className={styles.empty}>
          {searchTerm
            ? "No students match your search."
            : "No students found. Add your first student!"}
        </p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("name")}
                className={styles.sortable}
              >
                Name{renderSortIndicator("name")}
              </th>
              <th
                onClick={() => handleSort("email")}
                className={styles.sortable}
              >
                Email{renderSortIndicator("email")}
              </th>
              <th
                onClick={() => handleSort("course")}
                className={styles.sortable}
              >
                Course{renderSortIndicator("course")}
              </th>
              <th onClick={() => handleSort("age")} className={styles.sortable}>
                Age{renderSortIndicator("age")}
              </th>
              <th
                onClick={() => handleSort("city")}
                className={styles.sortable}
              >
                City{renderSortIndicator("city")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>{student.age}</td>
                <td>{student.city}</td>
                <td className={styles.actions}>
                  <Link
                    to={`/students/${student._id}`}
                    className={styles.viewBtn}
                  >
                    View
                  </Link>
                  <Link
                    to={`/students/${student._id}/edit`}
                    className={styles.editBtn}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(student._id, student.name)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentList;
