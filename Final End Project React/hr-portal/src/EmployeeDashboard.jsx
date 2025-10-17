import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EmployeeDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/employees/${id}`)
        .then(res => setEmployee(res.data))
        .catch(() => setEmployee(null));
    }
  }, [id, employee]);

  let goToViewEmployee = () => {
    if (employee) {
      navigate("viewEmployee", { state: { employee } });
    }
  };

    let goToApplyForLeave= () => {
    if (employee) {
      navigate("applyLeave", { state: { employee } });
    }
  };

  let goToViewLeaves = () => {
    if (employee) {
      navigate("viewLeaves", { state: { employee } });
    }
  };

  // Logout handler
  const logout = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Logout button at top right */}
      <button
        onClick={logout}
        className="btn btn-secondary position-fixed"
        style={{ top: 20, right: 20, zIndex: 1050 }}
      >
        Logout
      </button>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center mb-4">Employee Dashboard</h3>
          </div>
        </div>
        {employee ? (
          <h4 className="text-center">Welcome, {employee.name}!</h4>
        ) : (
          <h4 className="text-center">Welcome!</h4>
        )}

        <div className="mb-3 text-center">
          <input
            type="button"
            value="View Details"
            onClick={goToViewEmployee}
            className="btn btn-primary me-2"
          />
          <input
            type="button"
            value="Apply for Leave"
            onClick={goToApplyForLeave}
            className="btn btn-primary me-2"
          />
          <input
            type="button"
            value="View Leaves Status"
            onClick={goToViewLeaves}
            className="btn btn-primary me-2"
          />
        </div>
        <hr />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;