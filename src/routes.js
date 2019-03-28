import AdminLayout from './Containers/AdminLayout';
import Dashboard from './Components/Dashboard';
import Logout from './Components/Auth/Logout';
import Settings from './Components/Settings';

import Roles from './Components/RoleAndPermissions/Roles';
import Users from './Components/Users/Users';
import Companies from './Components/Company/Companies';

import Statements from './Components/Statement/Statements';
import Projects from './Components/Project/Projects';
import Goals from './Components/Goal/Goals';
import Offtimes from './Components/OffTime/Offtimes';
import Leaves from './Components/Leaves/Leaves';
import NewsList from './Components/News/NewsList';
import CreditPoint from './Components/CreditPoint/CreditPoint';

import EmployeeProjects from './Components/Employee/Project/Projects';
import EmployeeGoals from './Components/Employee/Goal/Goals';
import EmployeeOfftimes from './Components/Employee/OffTime/Offtimes';
import EmployeeLeaves from './Components/Employee/Leaves/Leaves';
import EmployeeDashboard from './Components/Employee/Dashboard';
import EmployeeProfile from './Components/Employee/Profile';

export default [
  { path: "/", exact: true,name:"Home", Component: AdminLayout },
  { path: "/dashboard",name:"Dashboard", Component: Dashboard },
  { path: "/logout", name: "Logout", Component: Logout },
  { path: "/settings", name: "Settings", Component: Settings },
  { path: "/roles", name: "Roles", Component: Roles },
  { path: "/employees", name: "Employees", Component: Users },
  { path: "/companies", name: "Companies", Component: Companies },
  { path: "/statments", name: "Statements", Component: Statements },
  { path: "/projects", name: "Projects", Component: Projects },
  { path: "/goals", name: "Goals", Component: Goals },
  { path: "/offtimes", name: "Offtimes", Component: Offtimes },
  { path: "/creditpoints", name: "Credit Point", Component: CreditPoint },
  { path: "/leaves", name: "Leaves", Component: Leaves },
  { path: "/news", name: "News", Component: NewsList },
  { path: "/employee/dashboard",name:"EmployeeDashboard", Component: EmployeeDashboard },
  { path: "/employee/projects", name: "Employee Projects", Component: EmployeeProjects },
  { path: "/employee/goals", name: "Employee Goals", Component: EmployeeGoals },
  { path: "/employee/offtime", name: "Offtime", Component: EmployeeOfftimes },
  { path: "/employee/leaves", name: "Leaves", Component: EmployeeLeaves },
  { path: "/user/profile", name: "Leaves", Component: EmployeeProfile },
];
