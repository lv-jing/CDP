const menu = [
  {
    key: 'home',
    path: '/home',
    description: 'home page'
  },
  {
    key: 'one-insight',
    path: '/one-insight/list',
    description: 'customer insight'
  },
  {
    key: 'many-insight',
    path: '/many-insight/list',
    description: 'many-insight',
  },
  {
    key: 'label',
    path: '/label/list',
    description: 'label'
  },
  {
    key: 'system',
    description: 'system',
    children: [
      {
        key: "dictionary",
        path: "/system/dictionary",
        description: "dictionary"
      },
      {
        key: "mainData",
        path: "/system/mainData",
        description: "Main Data"
      },
      {
        key: "group",
        description: "group Data",
        children: [
          {
            key: "user",
            path: "/system/user",
            description: "user",
            children: [],
          },
          {
            key: "department",
            path: "/system/department",
            description: "department",
            children: [],
          },
          {
            key: "role",
            path: "/system/role",
            description: "role",
            children: [],
          }
        ],
      }
    ]
  },

];

export default menu;
