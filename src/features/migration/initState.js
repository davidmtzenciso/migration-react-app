export const initState = {
  metadata: {
    pods: [],
    schemas: []
  },
  dataFrom:{
    pod: "dev5",
    schema: "xproduct",
    tableName: "client_confgr",
    columns:[{
      name: "",
      values: []
    }]
  },
  dataTo:{
    pod: "prodqa",
    schema: "xproduct",
    tableName: "client_confgr",
    columns:[{
      name: "",
      values: []
    }]
  },
  noError: {
    componentName: "none",
    type: "no_problem",
    message: "",
    isNotFixed: false,
  },
  request: {
    error: {
      componentName: "none",
      type: "no_problem",
      message: "",
      isNotFixed: false,
    },
    from: "dev5",
    to: "prodqa",
    schema: "",
    tableName: "",
    ops:[{
      name: "",
      findArgs: [{
        columnName: "",
        value: ""
      }],
      newData:[{
        columnName: "",
        value: ""
      }]
    }],
  },
  ApiError: {
    message: ""
  }
}
