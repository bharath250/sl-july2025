import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DisplayEmployees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => {
        alert('Error fetching employees');
        console.error(error);
      });
  }, []);

  const handleManageLeaves = (employee) => {
    navigate("manageLeaves", { state: { employee } });
  };

  return (
    <div className="container mt-4">
      <h3>Employees</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Manage Leaves</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No employees found.</td>
            </tr>
          ) : (
            employees.map(emp => (
              <tr key={emp.id || emp.email}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleManageLeaves(emp)}
                  >
                    Manage Leaves
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
          <Outlet />
      </div>
    </div>
  );
}

export default DisplayEmployees;