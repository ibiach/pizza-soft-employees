import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from './pages/employees';
import { EmployeeEditPage } from './pages/employees/edit';
import { EMPLOYEES_TAB, EMPLOYEE_EDIT } from '@config/constants/routes';

const router = createBrowserRouter([
  { path: EMPLOYEES_TAB, index: true, element: <EmployeesPage /> },
  { path: EMPLOYEE_EDIT, element: <EmployeesPage /> },
  {
    path: `${EMPLOYEE_EDIT}/:id`,
    element: <EmployeeEditPage />,
  },
  // make an Error page
  {
    path: '*',
    element: <EmployeesPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
