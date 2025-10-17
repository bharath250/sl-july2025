import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function ViewLeaves() {
  const location = useLocation();
  const { employee } = location.state || {};
  const id = employee?.id;
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/employees/${id}`)
        .then(res => setLeaves(res.data.leaves || []))
        .catch(() => setLeaves([]));
    }
  }, [id]);

  if (!employee || !Array.isArray(leaves) || leaves.length === 0) {
    return (
      <div className="container mt-4">
        <h3>View Leaves</h3>
        <div className="alert alert-warning mt-3">No leaves found for this employee.</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>View Leaves</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr key={index}>
              <td>{leave.reason}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewLeaves;