import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, TableCell, TableContainer, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';
import { STATUSES } from '@lib/services/http.service';
import { Table } from '@modules/layout/organism/table';
import { Toolbar } from '@modules/layout/organism/table/toolbar';
import { useSortTableColumn } from '@modules/layout/hooks';
import { employeesSelector, fetchEmployees } from '@modules/employees/features';
import { FilterDrawer } from '@modules/employees/moleculas/employee-filter-drawer';
import { EmployeeModalAdd } from '@modules/employees/organism';
import { EMPLOYEE_EDIT, ERROR_PAGE } from '@config/constants/routes';
import { CircularProgress } from '@mui/material';

import type { TypeEmployee } from '@modules/employees/features';

import styles from './index.module.scss';

export type TypeHeadCells = {
  id: keyof TypeEmployee;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
};

export type TypeOrderBy = keyof Pick<TypeEmployee, 'name' | 'birthday'>;

const title = 'Сотрудники';

const headCells: readonly TypeHeadCells[] = [
  {
    id: 'name',
    label: 'ФИО',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'phone',
    label: 'Телефон',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'birthday',
    label: 'Дата рождения',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'role',
    label: 'Должность',
    numeric: false,
    disablePadding: false,
  },
  {
    id: 'isArchive',
    label: 'Архив',
    numeric: false,
    disablePadding: false,
  },
];

const EmployeesTab = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { employees, filtredEmployees, status, error } = useAppSelector(employeesSelector);

  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDrawerFilter, setOpenDrawerFilter] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const preparedEmployeesData = filtredEmployees.length === 0 ? employees : filtredEmployees;

  const employeesLength = preparedEmployeesData.length;

  const amountPage = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const { order, orderBy, result, onRequestSort } = useSortTableColumn<TypeEmployee>(
    preparedEmployeesData,
    page,
    rowsPerPage
  );

  if (status === STATUSES.ERROR) {
    navigate(ERROR_PAGE, { state: error });
  }

  if (status === STATUSES.LOADING) {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <CircularProgress />
        </div>
      </div>
    );
  }

  const onOpenModalAddEmployee = () => {
    setOpenModal(true);
  };

  const onCloseModalAddEmployee = () => {
    setOpenModal(false);
  };

  const onOpenDrawerFilterEmployee = () => {
    setOpenDrawerFilter(true);
  };

  const onCloseDrawerFilterEmployee = () => {
    setOpenDrawerFilter(false);

    setPage(0);
  };

  const editEmployee = (id: number | string) => navigate(`${EMPLOYEE_EDIT}/${id}`);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <TableContainer className={styles.table} component={Paper}>
          <Toolbar title={title} onAdd={onOpenModalAddEmployee} onFilter={onOpenDrawerFilterEmployee} />

          <Table
            headCells={headCells}
            amountPage={amountPage}
            page={page}
            count={employeesLength}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          >
            {result.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ cursor: 'pointer' }}
                tabIndex={-1}
                hover
                onClick={() => editEmployee(employee.id)}
              >
                <TableCell align="left">{employee.name}</TableCell>
                <TableCell align="left">{employee.phone}</TableCell>
                <TableCell align="left">{employee.birthday}</TableCell>
                <TableCell align="left">{employee.role}</TableCell>
                <TableCell align="left">{employee.isArchive ? 'Да' : 'Нет'}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>

        <FilterDrawer open={openDrawerFilter} onClose={onCloseDrawerFilterEmployee} />

        <EmployeeModalAdd open={openModal} onClose={onCloseModalAddEmployee} />
      </div>
    </div>
  );
};

export { EmployeesTab };
