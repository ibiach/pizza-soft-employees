import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from './pages/employees';
import { EmployeeEditPage } from './pages/employees/edit';
import { EMPLOYEES_TAB, EMPLOYEE_EDIT, ERROR_PAGE } from '@config/constants/routes';
import { ErrorPage } from '@pages/error';

const router = createBrowserRouter([
  { path: EMPLOYEES_TAB, index: true, element: <EmployeesPage /> },
  { path: EMPLOYEE_EDIT, element: <EmployeesPage /> },
  { path: `${EMPLOYEE_EDIT}/:id`, element: <EmployeeEditPage /> },
  { path: ERROR_PAGE, element: <ErrorPage /> },
  { path: '*', element: <ErrorPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
