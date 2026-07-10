import { useState } from "react";
import styles from "./StudentForm.module.css";

const initialFormState = {
  name: "",
  email: "",
  course: "",
  age: "",
  city: "",
};

function StudentForm({ onSubmit, initialData, submitLabel = "Save Student" }) {
  const [formData, setFormData] = useState(initialData || initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.course.trim()) {
      newErrors.course = "Course is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({ ...formData, age: Number(formData.age) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <span className={styles.errorText}>{errors.email}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="course">Course</label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
        />
        {errors.course && (
          <span className={styles.errorText}>{errors.course}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <span className={styles.errorText}>{errors.age}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default StudentForm;
