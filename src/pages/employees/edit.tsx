import { EmployeeEditForm } from '@/modules/employees/organism';

import styles from './index.module.scss';
import React from 'react';
import { useAppDispatch } from '@/lib/store/hooks';
import { fetchEmployees } from '@/modules/employees/features';
import { useSelector } from 'react-redux';
import { employeesSelectorById } from '@/modules/employees/features/selectors';
import { useParams } from 'react-router-dom';

const EmployeeEditPage = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const employee = useSelector(employeesSelectorById(id));

  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (!employee) {
    return;
  }

  return (
    <div className={styles.root}>
      <EmployeeEditForm id={id} employee={employee} />
    </div>
  );
};

export { EmployeeEditPage };
