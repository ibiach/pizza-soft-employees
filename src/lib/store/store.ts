import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { employeesSlice } from '@modules/employees/features';

const rootReducer = combineReducers({
  [employeesSlice.name]: employeesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
