import moment from 'moment';

export enum SortDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}

class SortHelper {
  static sortBy(field: string, direction: SortDirectionEnum, array: any[]) {
    const equal = direction === SortDirectionEnum.asc ? 1 : -1;
    const unequal = direction === SortDirectionEnum.asc ? -1 : 1;

    const sorted = [...array].sort((curr, next) => {
      const currentWeight = SortHelper.isDate(curr[field]) ? SortHelper.normalizeDate(curr[field]) : curr[field] ?? 0;
      const nextWeight = SortHelper.isDate(next[field]) ? SortHelper.normalizeDate(next[field]) : next[field] ?? 0;

      return currentWeight > nextWeight ? equal : unequal;
    });

    return sorted;
  }

  private static isDate(value: string) {
    const regexpDate = new RegExp('(\\d{2}).(\\d{2}).(\\d{4})');

    return regexpDate.test(value);
  }

  private static normalizeDate(date: string) {
    const preparedDate = date.replace('/', '');

    return moment(preparedDate, 'DDMMYYYY').fromNow();
  }
}

export { SortHelper };
