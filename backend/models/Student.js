const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be a positive number"],
      max: [100, "Age cannot exceed 100"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
