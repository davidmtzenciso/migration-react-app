export const initState = {
  loaded: false,
  metadata: {
    pods: [],
    schemas: []
  },
  queryResults: {
      "client_confgr": {
        schema: "xproduct",
        tableName: "client_confgr",
        columns: [],
        sql:[],
        data: { "dev5": [], "bcbsasb3":[] }
      }
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
    to: "bcbsasb3",
    schema: "xproduct",
    tableName: "client_confgr",
    readConditions: [],
    modifications:[{
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
