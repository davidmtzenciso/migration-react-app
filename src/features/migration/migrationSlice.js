import { createSlice } from '@reduxjs/toolkit';

export const migrationSlice = createSlice({
  name: 'migration',
  initialState: {
    metadata: {
      pods: [],
      schemas: [{
        name: null,
        tables: []
      }],
      sqlOpNames: null
    },
    dataFrom:[{
      pod: "",
      schema: "",
      tableName: "",
      columns:[{
        name: "",
        values: []
      }]
    }],
    dataTo:[{
      pod: "",
      schema: "",
      tableName: "",
      columns:[{
        name: "",
        values: []
      }]
    }],
    noError: {
      type: "no_problem",
      message: "",
      isFixed: true,
    },
    request: {
      error: {
        type: "no_problem",
        message: "",
        isFixed: true,
      },
      from: "dev5",
      to: "prodqa",
      sqlStmts:[{
        schema: "",
        tableName: "",
        sqlOp: [{
          opName: "",
          findArgs: [{
            columnName: "",
            value: ""
          }],
          newData:[{
            columnName: "",
            value: ""
          }]
        }]
      }]
    }
  },
  reducers: {
    set_metadata: (state, action) => {
      console.log("set_metadata------");
      state.metadata = action.payload;
    },
    tables: state => {
      return state;
    },
    select_pod_n_table: (state, action) => {
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
          state.request.to = action.payload.value;
          break;
          default:
          console.log("error in select_pod_n_table reducer, no case for option: " + action.payload.key);
      }
    },
    evaluate_duplicated_pod: (state, action) => {
      console.log("evaluate_duplicated_pod --------");
        if(state.request.from === state.request.to) {
            state.request.error = {
              key: action.payload.value,
              message: "'From' and 'To' cannot be the same pod",
              isFixed: false
            };
        }
        else {
          state.request.error = state.noError;
        }
        
    },
  }});

export const { set_metadata, select_pod_n_table, evaluate_duplicated_pod } = migrationSlice.actions;
export default migrationSlice.reducer;
