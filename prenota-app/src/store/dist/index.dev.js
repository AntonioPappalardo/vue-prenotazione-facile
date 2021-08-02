"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import della libreria principale dello store
_vue["default"].use(_vuex["default"]); // utilizzo di vuex 


var store = new _vuex["default"].Store({
  //creazione dello store
  state: {
    Users: [],
    Prenotazioni: [],
    Luoghi: [],
    Dependence: []
  },
  getters: {
    getUserByLogin: function getUserByLogin(state) {
      return function (username, password) {
        return state.Users.find(function (user) {
          return user.username === username && user.password === password;
        });
      };
    },
    getUserByUser: function getUserByUser(state) {
      return function (username) {
        return state.Users.find(function (user) {
          return user.username === username;
        });
      };
    },
    getLuoghi: function getLuoghi(state) {
      return state.Luoghi;
    },
    getLuoghiByType: function getLuoghiByType(state) {
      return function (type) {
        return state.Luoghi.filter(function (luogo) {
          return luogo.type === type;
        });
      };
    },
    getTypeById: function getTypeById(state) {
      return function (id) {
        return state.Luoghi.find(function (luogo) {
          return luogo.id === id;
        }).type;
      };
    },
    getPrenotazioni: function getPrenotazioni(state) {
      return state.Prenotazioni;
    },
    getPrenotazioniByUser: function getPrenotazioniByUser(state) {
      return function (datacur, username) {
        return state.Prenotazioni.filter(function (prenotazione) {
          return prenotazione.username === username && prenotazione.data >= datacur;
        });
      };
    },
    getPrenotazioneByPenotazione: function getPrenotazioneByPenotazione(state) {
      return function (id, data, orario, intervallo) {
        var posti = state.Luoghi.find(function (luogo) {
          return luogo.id == id;
        }).posti;
        var p = state.Prenotazioni.filter(function (prenotazione) {
          return prenotazione.luogo === id && prenotazione.data === data;
        });
        var pos = 0;

        for (var i = 0; i < p.length; i++) {
          var oinit = parseInt(p[i].orario.substring(0, 2), 10) * 60 + parseInt(p[i].orario.substring(3, 5), 10);
          var oend = oinit + p[i].intervallo;
          var scelta_iniziale = parseInt(orario.substring(0, 2), 10) * 60 + parseInt(orario.substring(3, 5), 10);
          var scelta_Intervallo = scelta_iniziale + parseInt(intervallo, 10);
          if (scelta_iniziale > oinit && scelta_iniziale < oend) pos++;else if (scelta_Intervallo > oinit && scelta_Intervallo < oend) pos++;
        }

        return posti > pos;
      };
    },
    getPrenotazioneByID: function getPrenotazioneByID(state) {
      return function (id) {
        return state.Prenotazioni.find(function (prenotazione) {
          return prenotazione.id == id;
        });
      };
    },
    getCountPrenotazioni: function getCountPrenotazioni(state) {
      return state.Prenotazioni.length + 1;
    },
    getLuogoById: function getLuogoById(state) {
      return function (id) {
        return state.Luoghi.find(function (luogo) {
          return luogo.id === id;
        });
      };
    },
    ExistDependence: function ExistDependence(state) {
      return function (data, user, hour, luogo) {
        var x = new Date(data).getDay();
        var dep = state.Dependence.find(function (dependence) {
          return dependence.username == user && dependence.day == x && dependence.luogo == luogo;
        });

        if (dep != null) {
          var initdep = parseInt(dep.orario.substring(0, 2), 10) * 60 + parseInt(dep.orario.substring(3, 5), 10) - 30;
          var enddep = parseInt(dep.orario.substring(0, 2), 10) * 60 + parseInt(dep.orario.substring(3, 5), 10) + 30;
          hour = parseInt(hour.substring(0, 2), 10) * 60 + parseInt(hour.substring(3, 5), 10);
          if (hour <= enddep && hour >= initdep) return true;else return false;
        } else return false;
      };
    },
    CreateDependence: function CreateDependence(state, getters) {
      return function (data, user, hour, luogo) {
        var b = new Date(data);
        b.setDate(b.getDate() - 7);
        var month = b.getMonth() + 1 < 10 ? "0" + (b.getMonth() + 1) : b.getMonth() + 1;
        var day = b.getDate() < 10 ? "0" + b.getDate() : b.getDate();
        var aweekpre = "" + b.getFullYear() + "-" + month + "-" + day;
        var c = new Date(data);
        c.setDate(c.getDate() - 14);
        month = c.getMonth() + 1 < 10 ? "0" + (c.getMonth() + 1) : c.getMonth() + 1;
        day = c.getDate() < 10 ? "0" + c.getDate() : c.getDate();
        var twoweekpre = "" + c.getFullYear() + "-" + month + "-" + day;
        var prenotazioni = state.Prenotazioni.filter(function (p) {
          return p.username == user && getters.getLuogoById(p.luogo).type == luogo;
        });
        var pre = prenotazioni.find(function (prenotazione) {
          return prenotazione.data == aweekpre;
        });

        if (pre != null) {
          console.log("PRIMA TROVATA");
          var initdep = parseInt(pre.orario.substring(0, 2), 10) * 60 + parseInt(pre.orario.substring(3, 5), 10) - 30;
          var enddep = parseInt(pre.orario.substring(0, 2), 10) * 60 + parseInt(pre.orario.substring(3, 5), 10) + 30;
          var orario = "" + hour + "";
          hour = parseInt(orario.substring(0, 2), 10) * 60 + parseInt(orario.substring(3, 5), 10);

          if (hour <= enddep && hour >= initdep) {
            pre = prenotazioni.find(function (prenotazione) {
              return prenotazione.data == twoweekpre;
            });

            if (pre != null) {
              initdep = parseInt(pre.orario.substring(0, 2), 10) * 60 + parseInt(pre.orario.substring(3, 5), 10) - 30;
              enddep = parseInt(pre.orario.substring(0, 2), 10) * 60 + parseInt(pre.orario.substring(3, 5), 10) + 30;
              hour = parseInt(orario.substring(0, 2), 10) * 60 + parseInt(orario.substring(3, 5), 10);
              if (hour <= enddep && hour >= initdep) return true;else return false;
            } else return false;
          } else return false;
        } else {
          console.log("PRIMA NON TROVATA");
          return false;
        }
      };
    },
    isAvaible: function isAvaible(state) {
      return function (prenotazione) {
        var pre = state.Prenotazioni.filter(function (prenotazioni) {
          return prenotazioni.username == prenotazione.username;
        });
        pre = pre.filter(function (prenotazioni) {
          return prenotazioni.data == prenotazione.data;
        });
        var avaible = true;
        pre.forEach(function (el) {
          var oinit = parseInt(el.orario.substring(0, 2), 10) * 60 + parseInt(el.orario.substring(3, 5), 10);
          var oend = oinit + el.intervallo;
          var scelta_iniziale = parseInt(prenotazione.orario.substring(0, 2), 10) * 60 + parseInt(prenotazione.orario.substring(3, 5), 10);
          var scelta_Intervallo = scelta_iniziale + parseInt(prenotazione.intervallo, 10);

          if (scelta_iniziale > oinit && scelta_iniziale < oend) {
            avaible = false;
          } else if (scelta_Intervallo > oinit && scelta_Intervallo < oend) {
            avaible = false;
          }
        });
        return avaible;
      };
    }
  },
  mutations: {
    setUsers: function setUsers(state, users) {
      state.Users = users;
    },
    setDependence: function setDependence(state, dependence) {
      state.Dependence = dependence;
    },
    setPrenotazioni: function setPrenotazioni(state, pos) {
      state.Prenotazioni = pos;
    },
    setLuoghi: function setLuoghi(state, luoghi) {
      state.Luoghi = luoghi;
    },
    RegUser: function RegUser(state, user) {
      state.Users.push(user);
    },
    Prenota: function Prenota(state, prenotazione) {
      state.Prenotazioni.push(prenotazione);
    },
    setEmailVerificated: function setEmailVerificated(state, user) {
      var ind = state.Users.findIndex(function (us) {
        return us.username === user.username;
      });
      state.Users[ind].confirmed = true;
    },
    Updateoption: function Updateoption(state, user) {
      var ind = state.Users.findIndex(function (us) {
        return us.username === user.user.username;
      });
      state.Users[ind].notification = user.notification;
      state.Users[ind].service = user.service;
    },
    EliminaPrenotazione: function EliminaPrenotazione(state, id) {
      state.Prenotazioni = state.Prenotazioni.filter(function (item) {
        return item.id !== id;
      });
    }
  },
  actions: {
    setUsers: function setUsers(_ref, users) {
      var commit = _ref.commit;
      commit('setUsers', users);
    },
    setEmailVerificated: function setEmailVerificated(_ref2, user) {
      var commit = _ref2.commit;
      commit('setEmailVerificated', user);
    },
    setDependence: function setDependence(_ref3, dependences) {
      var commit = _ref3.commit;
      commit('setDependence', dependences);
    },
    setLuoghi: function setLuoghi(_ref4, luoghi) {
      var commit = _ref4.commit;
      commit('setLuoghi', luoghi);
    },
    setPrenotazioni: function setPrenotazioni(_ref5, pos) {
      var commit = _ref5.commit;
      commit('setPrenotazioni', pos);
    },
    RegUser: function RegUser(_ref6, user) {
      var commit = _ref6.commit;
      commit('RegUser', user);
    },
    Prenota: function Prenota(_ref7, prenotazione) {
      var commit = _ref7.commit;
      commit('Prenota', prenotazione);
    },
    Updateoption: function Updateoption(_ref8, user) {
      var commit = _ref8.commit;
      commit('Updateoption', user);
    },
    EliminaPrenotazione: function EliminaPrenotazione(_ref9, id) {
      var commit = _ref9.commit;
      commit('EliminaPrenotazione', id);
    }
  }
});
exports.store = store;