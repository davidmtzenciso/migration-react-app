import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { fetch_metadata, post_query} from './api';
import { initState } from './initState';


export const send_query = createAsyncThunk("migration/post_query", async (payload, { dispatch, getState }) => {
  const state = getState();
  const queryData = {
    from: state.migration.request.from,
    to: state.migration.request.to,
    schema: state.migration.request.schema,
    tableName: state.migration.request.tableName,
    conditions: state.migration.request.readConditions,
  };
  console.log("payload for post_query: " + JSON.stringify(queryData));
  const response = await post_query(JSON.stringify(queryData))
  return response;
});


export const get_metadata = createAsyncThunk("migration/get_metadata", async (payload, { dispatch }) => {
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
          state.request.readingConditions = [];
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
      const newCondition = {
        [action.payload.column] : action.payload.value
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
      console.log("reading conditions: " + state.request.readConditions);
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
    },
    [send_query.pending]: (state, action) => {

    },
    [send_query.fulfilled]: (state, action) => {
      console.log("query result: " + JSON.stringify(action.payload))
      const tableName = action.payload.tableName;
      state.queryResults[tableName] = action.payload;
      state.request.conditions = [];
    },
    [send_query.rejected]: (state, action) => {
      console.log("post_query error: " + action.error.message);
    },
  }
});


export const { select_pod_n_table, evaluate_duplicated_pod } = migrationSlice.actions;
export default migrationSlice.reducer;
