import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { EmployeeEditForm } from '@modules/employees/entries/employee-edit-form';
import { employeesSelectorById } from '@modules/employees/features/selectors';

import styles from './index.module.scss';

import type { TypeEmployee } from '@modules/employees/features';

const EmployeeEditPage = () => {
  const { id } = useParams() as { id: string };

  const employee = useSelector(employeesSelectorById(id));

  if (employee) {
    sessionStorage.setItem('current_employee', JSON.stringify(employee));
  }

  const currentEmployee: TypeEmployee | null =
    employee ?? JSON.parse(sessionStorage.getItem('current_employee') as string);

  if (!currentEmployee) {
    return;
  }

  return (
    <div className={styles.root}>
      <EmployeeEditForm id={id} employee={currentEmployee} />
    </div>
  );
};

export { EmployeeEditPage };
