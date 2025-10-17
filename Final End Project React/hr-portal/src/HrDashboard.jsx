import { Outlet, useNavigate } from 'react-router-dom';

function HrDashboard() {
  let navigate = useNavigate();
  let logout = () => {
    navigate("/");
  };
  let goToAddEmployee = () => {
    navigate("addEmployee");
  };
  let goToDisplayEmployees = () => {
    navigate("displayEmployees");
  };
  return (
    <div>
      {/* Fixed Logout button at top right of the viewport */}
      <button
        onClick={logout}
        className="btn btn-secondary position-fixed"
        style={{ top: 20, right: 20, zIndex: 1050 }}
      >
        Logout
      </button>
      <div className="container pt-4">
        {/* Move Hr Home Page heading to the very top with margin-bottom */}
        <div className="row">
          <div className="col-12">
            <h3 className="mt-3 mb-4 text-center">HR Dashboard</h3>
          </div>
        </div>
        <div className="mb-3 text-center">
          <input type="button" value="Add Employee" onClick={goToAddEmployee} className="btn btn-primary me-2" />
          <input type="button" value="View All Employees" onClick={goToDisplayEmployees} className="btn btn-primary me-2" />
        </div>
        <hr />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;