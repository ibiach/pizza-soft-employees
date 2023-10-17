import { Box, TableHead as MuiTableHead, TableCell, TableRow, TableSortLabel } from '@mui/material';
import { SortDirectionEnum } from '@helpers/sort';
import { visuallyHidden } from '@mui/utils';

import type { TypeHeadCells } from '@modules/employees/organism/employees-tabs/employees-tab';

type TableHeadProps = {
  headCells: readonly TypeHeadCells[];
  order: SortDirectionEnum;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
};

const TableHead = (props: TableHeadProps) => {
  const { headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {/* should change the logic with property */}
            {headCell.id === 'name' || headCell.id === 'birthday' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export { TableHead };
