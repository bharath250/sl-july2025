import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function ManageLeaves() {
  const location = useLocation();
  const { employee } = location.state || {};
  const id = employee?.id;
  const [leaves, setLeaves] = useState(employee?.leaves || []);

  // Refresh leaves whenever employee changes
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/employees/${id}`)
        .then(res => setLeaves(res.data.leaves || []))
        .catch(() => setLeaves([]));
    }
  }, [id, employee]);

  const updateLeaveStatus = async (index, newStatus) => {
    const updatedLeaves = leaves.map((leave, idx) =>
      idx === index ? { ...leave, status: newStatus } : leave
    );
    setLeaves(updatedLeaves);

    try {
      await axios.put(`http://localhost:3000/employees/${id}`, {
        ...employee,
        leaves: updatedLeaves
      });
    } catch (error) {
      alert("Error updating leave status");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Manage Leaves for {employee.name}</h3>
      {leaves.length === 0 ? (
        <div className="alert alert-warning mt-3">No leaves found for this employee.</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr key={idx}>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    disabled={leave.status === "Approved"}
                    onClick={() => updateLeaveStatus(idx, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    disabled={leave.status === "Denied"}
                    onClick={() => updateLeaveStatus(idx, "Denied")}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageLeaves;