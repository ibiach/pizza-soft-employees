import React from 'react';
import { TableBody as MuiTableBody, TableCell, TableRow } from '@mui/material';

type TableBodyProps = {
  amountPage: number;
  children: React.ReactNode;
  colSpan: number;
};

const TableBody = (props: TableBodyProps) => {
  const { amountPage, colSpan, children } = props;
  return (
    <MuiTableBody>
      {children}
      {amountPage > 0 && (
        <TableRow style={{ height: 53 * amountPage }}>
          <TableCell colSpan={colSpan} />
        </TableRow>
      )}
    </MuiTableBody>
  );
};

export { TableBody };
