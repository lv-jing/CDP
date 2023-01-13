const const_config = {

  SUCCESS_CODE: 200,

  Authentication_Failed: 401,

  EXPIRED: 300,

  ICON_SIZE: {fontSize: 20},

  POPUP_CONTAINER: () => document.getElementById('page-content'),
  POPUP_CONTAINER_PARENT: (node) => node.parent || document.getElementById('app'),
};

export default const_config;