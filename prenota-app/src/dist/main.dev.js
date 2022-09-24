"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router/router"));

var _vueSession = _interopRequireDefault(require("vue-session"));

var _axios = _interopRequireDefault(require("axios"));

var _vuejsLoadingScreen = _interopRequireDefault(require("vuejs-loading-screen"));

var _vueMq = _interopRequireDefault(require("vue-mq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import della componente router
// import della componente che gestisce la sessione
//import della componente che ci permette di integrare il php e di conseguenza scambiare dati con il database
_vue["default"].prototype.$axios = _axios["default"]; //dichiarazione dell’uso della componente axios

_vue["default"].config.productionTip = false;

_vue["default"].use(_vueSession["default"]); //istruzione che ci abilita la sessione


_vue["default"].use(_vuejsLoadingScreen["default"]);

_vue["default"].use(_vueMq["default"], {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity
  }
});

new _vue["default"]({
  router: _router["default"],
  // utilizzo di router
  VueSession: _vueSession["default"],
  // utilizzo della sessione
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');