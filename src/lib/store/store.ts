import { employeesSlice } from '@modules/employees/features';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [employeesSlice.name]: employeesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
