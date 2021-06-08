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
        case "xproduct":
        case "cost":
          state.request.schema = action.payload.key;
          state.request.tableName = action.payload.value;
          break;
        case "from":
          state.request.from = action.payload.value;
          break;
        case "to":
          state.request.to = action.payload.value;
          break;
        default:
          console.log("error in select_pod_n_table reducer, no case for option: " + action.payload.key);
      }
    },
    evaluate_pod_selection: (state, action) => {
      console.log("evaluate pod selection-------- " + JSON.stringify(action.payload));
        if(state.request.from === state.request.to) {
            console.log("pod is duplicated!");
            state.request.error = {
              componentName: action.payload.key,
              type: "duplicated_pod",
              message: "'From' and 'To' cannot be the same pod",
              isNotFixed: true
            };
        }
        else {
          console.log("no error in pod selection---------");
          state.request.error = state.noError;
        }
    },
    set_reading_conditions: (state, action) => {
      console.log("condition: " + JSON.stringify(action.payload));
      const newCondition = {
        column: action.payload.column,
        value: action.payload.value
      };
      if ( action.payload.instruction === "add") {
        const existing = state.request.readConditions.find(condition => condition.column === newCondition.column);
        if(existing) {
          existing.value = newCondition.value;
        } else {
          state.request.readConditions.push(newCondition);
        }
      } else if ( action.payload.instruction === "remove") {
        state.request.readConditions = state.request.readConditions.filter(condition => condition.column !== newCondition.column);
      } else {
        console.log("error, instruction not registered in set_reading_conditions reducer");
      }
      console.log("conditions: " + JSON.stringify(state.request.readConditions));
    }
  },
  extraReducers: {
    [get_metadata.pending]: (state, action) => {
      state.loaded = false;
    },
    [get_metadata.fulfilled]: (state, action) => {
      state.loaded = true;
      const metadata = action.payload;
      metadata.pods.push("_");
      metadata.schemas["xproduct"]._ = [];
      metadata.schemas["cost"]._ = [];
      state.metadata = metadata;
    },
    [get_metadata.rejected]: (state, action) => {
      state.loaded = false;
      console.log("metadata error: " + action.error.message);
      state.ApiError.message = action.error.message;
    }
  }
});


export const { select_pod_n_table, evaluate_duplicated_pod } = migrationSlice.actions;
export default migrationSlice.reducer;
