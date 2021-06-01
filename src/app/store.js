import { configureStore  } from '@reduxjs/toolkit';
import migrationReducer from '../features/migration/migrationSlice';

const store = configureStore({
  reducer: {
    migration: migrationReducer
  },
});

export default store;
