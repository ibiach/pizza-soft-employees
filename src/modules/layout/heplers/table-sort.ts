import moment from 'moment';

type TypePrimitives = string | number | boolean;

export type TypeOrder = 'asc' | 'desc';

const normalizeDate = (date: string) => {
  const preparedDate = date.replace('-', '');

  return moment(preparedDate, 'DDMMYYYY').fromNow();
};

const isDate = (value: string) => {
  const regexpDate = new RegExp('(\\d{2}).(\\d{2}).(\\d{4})');

  return regexpDate.test(value);
};

const stableSort = <T>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
  const valueA = isDate(a[orderBy] as string) ? normalizeDate(a[orderBy] as string) : a[orderBy];
  const valueB = isDate(b[orderBy] as string) ? normalizeDate(b[orderBy] as string) : b[orderBy];

  if (valueB < valueA) {
    return -1;
  }

  if (valueB > valueA) {
    return 1;
  }

  return 0;
};

const getComparator = <Key extends keyof string>(
  order: TypeOrder,
  orderBy: Key
): ((a: { [key in Key]: TypePrimitives }, b: { [key in Key]: TypePrimitives }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export { stableSort, getComparator };
