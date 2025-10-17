// ...existing imports...
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Login() {
  let [emailId, setEmailId] = useState("");
  let [password, setPassword] = useState("");
  let [typeOfUser, setTypeOfUser] = useState("");
  let [error, setError] = useState("");
  const URL = "http://localhost:3000/logins";
  let navigate = useNavigate();

  let signIn = async (event) => {
    event.preventDefault();
    let loginDetails = await axios.get(URL);
    let result = loginDetails.data.find(
      (login) =>
        login.emailId === emailId &&
        login.password === password &&
        login.typeOfUser === typeOfUser
    );
    if (result === undefined) {
      setError("Invalid Email ID/Password");
    } else {
      setError("");
      if (typeOfUser === "hr") {
        navigate("/hrDashboard");
      } else if (typeOfUser === "employee") {
        // Fetch employee info to get id
        const empRes = await axios.get("http://localhost:3000/employees");
        const emp = empRes.data.find(emp => emp.email === emailId);
        if (emp) {
          navigate("/employeeDashboard", { state: { id: emp.id } });
        } else {
          setError("Employee information not found.");
        }
      }
    }
    setEmailId("");
    setPassword("");
    setTypeOfUser("");
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2)",
      }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login Page</h3>
          <form onSubmit={signIn}>
            {error && (
              <div className="alert alert-danger py-2 mb-3 text-center" role="alert">
                {error}
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Email ID:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Id"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label me-2">Type of User:</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="typeOfUser"
                  value="hr"
                  className="form-check-input"
                  onChange={(e) => setTypeOfUser(e.target.value)}
                  checked={typeOfUser === "hr"}
                  required
                />
                <label className="form-check-label">Hr</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="typeOfUser"
                  value="employee"
                  className="form-check-input"
                  onChange={(e) => setTypeOfUser(e.target.value)}
                  checked={typeOfUser === "employee"}
                  required
                />
                <label className="form-check-label">Employee</label>
              </div>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <button type="submit" className="btn btn-primary w-50">
                Sign In
              </button>
              <button type="reset" className="btn btn-secondary w-50">
                Reset
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;