import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Skeleton, TableCell, TableContainer, TableRow } from '@mui/material';

import { EMPLOYEE_EDIT, ERROR_PAGE } from '@config/constants/routes';
import { STATUSES } from '@lib/services/http.service';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';

import { employeesSelector, fetchEmployees } from '@modules/employees/features';
import { FilterDrawer } from '@modules/employees/moleculas/employee-filter-drawer';
import { EmployeeModalAdd } from '@modules/employees/organism';
import { useSortTableColumn } from '@modules/layout/hooks';
import { Table, Toolbar } from '@modules/layout/organism/table';

import styles from './index.module.scss';

import type { TypeEmployee } from '@modules/employees/features';

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

  const navigate = useNavigate();

  const { employees, filtredEmployees, status, error, totalCount } = useAppSelector(employeesSelector);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDrawerFilter, setOpenDrawerFilter] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchEmployees({ limit: rowsPerPage, page: page + 1 }));
  }, [dispatch, page, rowsPerPage]);

  const preparedEmployeesData = filtredEmployees.length === 0 ? employees : filtredEmployees;

  const amountPage = employees.length ? Math.abs(employees.length - rowsPerPage) : 0;

  const { order, orderBy, result, onRequestSort } = useSortTableColumn<TypeEmployee>(preparedEmployeesData);

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

  const editEmployee = (id: number | string) => () => navigate(`${EMPLOYEE_EDIT}/${id}`);

  if (status === STATUSES.ERROR) {
    navigate(ERROR_PAGE, { state: error });
  }

  if (!employees.length && status === STATUSES.LOADING) {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <TableContainer className={styles.table} component={Paper}>
            <Toolbar title={title} onAdd={onOpenModalAddEmployee} onFilter={onOpenDrawerFilterEmployee} />

            <Table
              headCells={headCells}
              amountPage={amountPage}
              page={page}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
            >
              {[1, 2, 3, 4, 5].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rounded" width={188} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={168} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={178} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={108} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={68} height={20} />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <TableContainer className={styles.table} component={Paper}>
          <Toolbar title={title} onAdd={onOpenModalAddEmployee} onFilter={onOpenDrawerFilterEmployee} />

          <Table
            headCells={headCells}
            amountPage={amountPage}
            page={page}
            count={totalCount}
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
                onClick={editEmployee(employee.id)}
              >
                <TableCell align="left" width={188} height={10}>
                  {employee.name}
                </TableCell>
                <TableCell align="left" width={168} height={20}>
                  {employee.phone}
                </TableCell>
                <TableCell align="left" width={178} height={20}>
                  {employee.birthday}
                </TableCell>
                <TableCell align="left" width={108} height={20}>
                  {employee.role}
                </TableCell>
                <TableCell align="left" width={68} height={20}>
                  {employee.isArchive ? 'Да' : 'Нет'}
                </TableCell>
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
