import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { EmployeesPage } from './pages/employees';
import { EmployeeEditPage } from './pages/employees/edit';

const router = createBrowserRouter([
  { path: '/', index: true, element: <EmployeesPage /> },
  { path: '/employee', element: <EmployeesPage /> },
  {
    path: 'employee/:id',
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
