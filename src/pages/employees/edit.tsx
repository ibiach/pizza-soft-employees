import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@lib/store/hooks';

import { EmployeeEditForm } from '@modules/employees/entries/employee-edit-form';
import { fetchEmployees } from '@modules/employees/features';
import { employeesSelectorById } from '@modules/employees/features/selectors';

import styles from './index.module.scss';

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
