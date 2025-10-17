import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ApplyLeave() {
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const location = useLocation();
  const { employee } = location.state || {};
  const id = employee?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch latest employee data to avoid overwriting leaves
      const res = await axios.get(`http://localhost:3000/employees/${id}`);
      const currentLeaves = Array.isArray(res.data.leaves) ? res.data.leaves : [];
      const updatedLeaves = [...currentLeaves, { reason, status }];

      await axios.put(`http://localhost:3000/employees/${id}`, {
        ...res.data,
        leaves: updatedLeaves
      });

      alert("Leave applied!\nReason: " + reason + "\nStatus: " + status);
      setReason("");
    } catch (error) {
      alert("Error applying leave");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Apply For Leave</h3>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label" htmlFor="reason">Reason for Leave:</label>
          <textarea
            id="reason"
            className="form-control"
            rows={5}
            value={reason}
            onChange={e => setReason(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Apply Leave</button>
      </form>
    </div>
  );
}

export default ApplyLeave;