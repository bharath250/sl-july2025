import { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    typeOfUser: 'employee'
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/employees', employee);
      // Post emailId and typeOfUser to /logins
      await axios.post('http://localhost:3000/logins', {
        emailId: employee.email,
        typeOfUser: employee.typeOfUser
      });
      alert('Employee added successfully!');
      setEmployee({
        name: '',
        email: '',
        position: '',
        department: '',
        typeOfUser: 'employee'
      });
    } catch (error) {
      alert('Error adding employee');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Employee</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position:</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department:</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;