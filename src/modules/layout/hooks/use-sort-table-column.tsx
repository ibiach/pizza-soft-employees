import React from 'react';
import { SortDirectionEnum, SortHelper } from '@helpers/sort';

const useSortTableColumn = <T,>(data: T[]) => {
  const [order, setOrder] = React.useState<SortDirectionEnum>(SortDirectionEnum.asc);
  const [orderBy, setOrderBy] = React.useState('');

  const onRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === SortDirectionEnum.asc;
    setOrder(isAsc ? SortDirectionEnum.desc : SortDirectionEnum.asc);
    setOrderBy(property);
  };

  const result = React.useMemo(() => {
    return SortHelper.sortBy(orderBy, order, data);
  }, [order, orderBy, data]);

  return { result, order, orderBy, onRequestSort };
};

export { useSortTableColumn };
