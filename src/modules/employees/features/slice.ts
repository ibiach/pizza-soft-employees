import { PayloadAction, createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { employeesService } from '@modules/employees/services';
import { STATUSES } from '@/lib/services/http.service';
import { normalizeString } from '@/helpers';

export type TypeEmployee = {
  id: string;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
};

type TypeInitialState = {
  employees: TypeEmployee[];
  filtredEmployees: TypeEmployee[];
  status: STATUSES;
  error: string;
};

const initialState: TypeInitialState = { employees: [], filtredEmployees: [], status: STATUSES.IDLE, error: '' };

export const fetchEmployees = createAsyncThunk('employee/fetch', async (payload?: object) => {
  try {
    const response = await employeesService.getEmployees(payload);

    return response;
  } catch (error) {
    isRejectedWithValue(error);

    throw new Error(error as string);
  }
});

export const addEmployee = createAsyncThunk('employee/add', async (payload: TypeEmployee) => {
  try {
    const response = await employeesService.addEmployee(payload);

    return response;
  } catch (error) {
    isRejectedWithValue(error);

    throw new Error(error as string);
  }
});

export const updateEmployee = createAsyncThunk(
  'employee/update',
  async (payload: { id: string; data: Partial<TypeEmployee> }) => {
    const { id, data } = payload;

    try {
      await employeesService.updateEmployee(id, data);
    } catch (error) {
      isRejectedWithValue(error);

      throw new Error(error as string);
    }
  }
);

export const deleteEmployee = createAsyncThunk('employee/delete', async (payload: string) => {
  try {
    await employeesService.deleteEmployee(payload);
  } catch (error) {
    isRejectedWithValue(error);

    throw new Error(error as string);
  }
});

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    filterEmployees(state, action: PayloadAction<Pick<TypeEmployee, 'role' | 'isArchive'>>) {
      state.filtredEmployees = state.employees.filter((employee) => {
        const originalRole = normalizeString(employee.role, 'simple');
        const compareRole = normalizeString(action.payload.role, 'simple');

        const isRoleMatch = originalRole.includes(compareRole);
        const isArchiveMatch =
          action.payload.isArchive === undefined ? true : action.payload.isArchive === employee.isArchive;

        return isRoleMatch && compareRole.length > 0 && isArchiveMatch;
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<TypeEmployee[]>) => {
        state.status = STATUSES.SUCCESS;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message ?? '';
        state.employees = [];
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<TypeEmployee>) => {
        state.status = STATUSES.SUCCESS;
        state.employees.push(action.payload as TypeEmployee);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message ?? '';
        state.employees = [...initialState.employees];
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = STATUSES.SUCCESS;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message ?? '';
        state.employees = [...initialState.employees];
      });
  },
});

export const { filterEmployees } = employeesSlice.actions;
