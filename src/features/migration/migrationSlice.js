import { createSlice } from '@reduxjs/toolkit';

export const migrationSlice = createSlice({
  name: 'migration',
  initialState: {
    metadata: {
      dbNames: [],
      tableNames: [],
      sqlOpNames: [],
    },
    tables:[{
      name: "",
      columns:[{
        name: "",
        values:[]
      }]
    }],
    request: {
      from: "",
      to: "",
      sqlStmts:[{
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
      return {
        metadata: action.payload,
        tables: state.tables,
        request: state.request
      }
    },
    tables: state => {
      return state;
    },
    request: state => {
      return state;
    }
  }
});

export const { set_metadata } = migrationSlice.actions;
export default migrationSlice.reducer;
