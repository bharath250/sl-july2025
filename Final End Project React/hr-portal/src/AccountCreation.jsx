import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AccountCreation() {
  const location = useLocation();
  const navigate = useNavigate();
  const emp = location.state;

  const [form, setForm] = useState({
    name: emp?.name || "",
    email: emp?.email || "",
    password: emp?.password || "",
    position: emp?.position || "",
    department: emp?.department || ""
  });

  if (!emp) {
    return <div className="container mt-5">No employee data found.</div>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update password in /logins
      const loginsRes = await axios.get('http://localhost:3000/logins');
      const loginUser = loginsRes.data.find(l => l.emailId === form.email);
      if (loginUser) {
        await axios.put(`http://localhost:3000/logins/${loginUser.id}`, {
          ...loginUser,
          password: form.password
        });
      }

      // Update employee info in /employees
      const empRes = await axios.get('http://localhost:3000/employees');
      const empUser = empRes.data.find(emp => emp.email === form.email);
      if (empUser) {
        await axios.put(`http://localhost:3000/employees/${empUser.id}`, {
          ...empUser,
          name: form.name,
          position: form.position,
          department: form.department
        });
        // Navigate to employeeDashboard with employee id
        navigate("/employeeDashboard", { state: { id: empUser.id } });
      } else {
        alert("Employee information not found for navigation.");
      }
    } catch (error) {
      alert("Error updating account information.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Account Creation</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label">Name:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label">EmailId:</label>
          <div className="col-sm-9">
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label">Password:</label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label">Position:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="position"
              value={form.position}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3 align-items-center">
          <label className="col-sm-3 col-form-label">Department:</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="offset-sm-3 col-sm-9">
            <button type="submit" className="btn btn-primary">Create Account</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountCreation;