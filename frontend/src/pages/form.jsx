import { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export default function RegisterStudent() {
  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    phone: "",
    email: "",
    course: "",
    payment: "",
  });

  const courses = [
    "Web Development - RS. 3000.00 ",
    "Data Science - RS. 6000.00 ",
    "UI/UX Design - RS. 3000.00 ",
    "Cybersecurity -RS. 13000.00 ",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_BASE}/api/students/register`,
        formData
      );
      console.log("Registered:", res.data);

      setFormData({
        name: "",
        nic: "",
        phone: "",
        email: "",
        course: "",
        payment: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Register Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        {["name", "nic", "phone", "email"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        ))}

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">-- Select a Course --</option>
          {courses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
