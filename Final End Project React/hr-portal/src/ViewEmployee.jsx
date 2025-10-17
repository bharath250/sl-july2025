import { useLocation } from 'react-router-dom';

function ViewEmployee() {
  const location = useLocation();
  const { employee } = location.state || {};

  if (!employee) {
    return (
      <div className="container mt-4">
        <h3>Employee Details</h3>
        <div className="alert alert-warning mt-3">No employee data found.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>Employee Details</h3>
      <table className="table table-bordered mt-3 w-auto text-start">
        <tbody>
          <tr>
            <th className="text-start">Name</th>
            <td className="text-start">{employee.name}</td>
          </tr>
          <tr>
            <th className="text-start">Email</th>
            <td className="text-start">{employee.email}</td>
          </tr>
          <tr>
            <th className="text-start">Position</th>
            <td className="text-start">{employee.position}</td>
          </tr>
          <tr>
            <th className="text-start">Department</th>
            <td className="text-start">{employee.department}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;