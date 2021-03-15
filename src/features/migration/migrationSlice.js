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
    tables:[{
      name: "",
      columns:[{
        name: "",
        values: []
      }]
    }],
    request: {
      source: "",
      destination: "",
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
      }],
    }
  },
  reducers: {
    set_metadata: (state, action) => {
      console.log("set metadata action------");
      state.metadata = action.payload;
    },
    tables: state => {
      return state;
    },
    select_schema_table: (state, action) => {
      console.log("set " + action.payload.key + "--------");
      switch(action.payload.key) {
        case "xprod":
        case "cost":
          state.request.schema = action.payload.key;
          state.request.tableName = action.payload.data;
          break;
        case "source":
          state.request.source = action.payload.data;
          break;
        case "destination":
          state.request.destination = action.payload.data;
          break;
        default:

      }
      return state;
    }
  }
});

export const { set_metadata } = migrationSlice.actions;
export default migrationSlice.reducer;
