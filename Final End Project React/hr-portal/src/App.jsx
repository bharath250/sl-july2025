import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Login'
import SignUp from './SignUp';
import AccountCreation from './AccountCreation';
import HrDashboard from './HrDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import AddEmployee from './AddEmployee';
import DisplayEmployees from './DisplayEmployees';
import ViewEmployee from './ViewEmployee';
import ApplyLeave from './ApplyLeave';
import ViewLeaves from './ViewLeaves';
import ManageLeaves from './ManageLeaves';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/accountCreation' element={<AccountCreation/>}/>
        
        <Route path='/hrDashboard' element={<HrDashboard/>}>
             <Route path='addEmployee' element={<AddEmployee/>}/>
             <Route path='displayEmployees' element={<DisplayEmployees/>}>
                  <Route path='manageLeaves' element={<ManageLeaves/>}/>
             </Route>
        </Route>        
        
        <Route path='/employeeDashboard' element={<EmployeeDashboard/>}>
          <Route path='viewEmployee' element={<ViewEmployee/>}/>
          <Route path='applyLeave' element={<ApplyLeave/>}/>
          <Route path='viewLeaves' element={<ViewLeaves/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;