import React from 'react';
import { getComparator, stableSort } from '../heplers';
import { TypeOrder } from '../heplers/table-sort';

const useSortTableColumn = <T extends object>(data: T[], page: number, rowsPerPage: number) => {
  const [order, setOrder] = React.useState<TypeOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const result = React.useMemo(() => {
    return stableSort<T>(data, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, data]);

  return { result, order, orderBy, onRequestSort };
};

export { useSortTableColumn };
