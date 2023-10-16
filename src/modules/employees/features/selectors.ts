import { createSelector } from '@reduxjs/toolkit';
import { employeesSlice } from './slice';

import type { RootState } from '@/lib/store/store';

const state = (state: RootState) => state[employeesSlice.name];

const employeesSelector = createSelector(state, (state) => state);

const employeesSelectorById = (id: string) =>
  createSelector(state, (state) => {
    const [employee] = state.employees.filter((employee) => employee.id == id);

    return employee;
  });

export { employeesSelector, employeesSelectorById };
