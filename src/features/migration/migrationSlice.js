import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { fetch_metadata } from './api';
import { initState } from './initState';
export const get_metadata = createAsyncThunk("migration/get-metadata", async (payload, { dispatch }) => {
  const response = await fetch_metadata()
  return response;
});


export const migrationSlice = createSlice({
  name: 'migration',
  initialState: initState,
  reducers: {
    select_pod_or_table: (state, action) => {
      console.log("select_pod_or_table: " + action.payload.key + ":" + action.payload.value);
      switch(action.payload.key) {
        case "xprod":
        case "cost":
          state.request.schema = action.payload.key;
          state.request.tableName = action.payload.value;
          break;
        case "from":
          state.request.from = action.payload.value;
          break;
        case "to":
        console.log("enter case 'to'");
          state.request.to = action.payload.value;
          break;
        default:
          console.log("error in select_pod_n_table reducer, no case for option: " + action.payload.key);
      }
    },
    evaluate_duplicated_pod: (state, action) => {
      console.log("evaluate duplicated_pod-------- " + action.payload.componentName);
        if(state.request.from === state.request.to) {
            console.log("it is duplicated!");
            state.request.error = {
              componentName: action.payload.componentName,
              type: "duplicated_pod",
              message: "'From' and 'To' cannot be the same pod",
              isNotFixed: true
            };
        }
        else {
          console.log("no error---------");
          state.request.error = state.noError;
        }
    }
  },
  extraReducers: {
    [get_metadata.fulfilled]: (state, action) => {
      state.metadata = action.payload
    },
    [get_metadata.rejected]: (state, action) => {
      console.log("metadata error: " + action.error.message);
      state.ApiError.message = action.error.message
    }
  }
});


export const { select_pod_n_table, evaluate_duplicated_pod } = migrationSlice.actions;
export default migrationSlice.reducer;
