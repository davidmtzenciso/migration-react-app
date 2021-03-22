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
    request: {
      pod: "dev5",
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
    },
  reducers: {
    set_metadata: (state, action) => {
      console.log("set metadata action------");
      state.metadata = action.payload;
    },
    tables: state => {
      return state;
    },
    select_pod_n_table: (state, action) => {
      console.log("set " + action.payload.key + "--------");
      switch(action.payload.key) {
        case "xprod":
        case "cost":
          state.request.schema = action.payload.key;
          state.request.tableName = action.payload.data;
          break;
        case "from":
          state.request.source = action.payload.data;
          break;
        case "destination":
          state.request.to = action.payload.data;
          break;
        default:

      }
      return state;
    }
  }
});

export const { set_metadata, select_pod_n_table } = migrationSlice.actions;
export default migrationSlice.reducer;
