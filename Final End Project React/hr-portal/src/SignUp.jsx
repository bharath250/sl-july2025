import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.get("http://localhost:3000/logins");
      const exists = response.data.some(login => login.emailId === email);
      if (exists) {
        // Fetch employee info from /employees
        const empRes = await axios.get("http://localhost:3000/employees");
        const emp = empRes.data.find(emp => emp.email === email);
        if (emp) {
          setSuccess("Email is valid for account creation!");
          // Navigate to AccountCreation page with employee info as state
          navigate("/accountCreation", { state: emp });
        } else {
          setError("Employee information not found for this email.");
        }
      } else {
        setError("Email doesn't exist in the system. Please enter a valid email.");
      }
    } catch (err) {
      setError("Error validating email. Please try again.");
    }
    setEmail("");
  };

  return (
    <div className="container mt-5">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Validate Email for Account Creation</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </form>
    </div>
  );
}

export default SignUp;