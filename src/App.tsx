import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '@pages/error';

import { EMPLOYEE_EDIT, EMPLOYEES_TAB, ERROR_PAGE } from '@config/constants/routes';

import { EmployeesPage } from './pages/employees';
import { EmployeeEditPage } from './pages/employees/edit';

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
