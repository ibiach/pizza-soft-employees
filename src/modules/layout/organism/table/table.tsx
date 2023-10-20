import React from 'react';
import { SortDirectionEnum } from '@helpers/sort';
import { Table as MuiTable, TableFooter, TablePagination, TableRow } from '@mui/material';

import { TableBody, TableHead } from '@modules/layout/moleculas/table';

import { TablePaginationActions } from './table-pagination-actions';

import type { TypeHeadCells } from '@modules/employees/organism/employees-tabs/employees-tab';

type TableProps = {
  headCells: readonly TypeHeadCells[];
  count: number;
  page: number;
  amountPage: number;
  rowsPerPage: number;
  order: SortDirectionEnum;
  orderBy: string;
  children: React.ReactNode;
  setPage: (page: number) => void;
  setRowsPerPage: (countElements: number) => void;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
};

const Table = (props: TableProps) => {
  const { headCells, amountPage, children, order, orderBy, setPage, setRowsPerPage, onRequestSort, ...otherProps } =
    props;

  const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  return (
    <MuiTable aria-label="custom pagination table">
      <TableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={onRequestSort} />
      <TableBody children={children} amountPage={amountPage} colSpan={headCells.length} />

      <TableFooter>
        <TableRow>
          <TablePagination
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
            {...otherProps}
          />
        </TableRow>
      </TableFooter>
    </MuiTable>
  );
};

export { Table };
