import Vue from 'vue'
import App from './App.vue'
import router from './router/router'     // import della componente router
import VueSession from 'vue-session'  // import della componente che gestisce la sessione
import axios from 'axios' //import della componente che ci permette di integrare il php e di conseguenza scambiare dati con il database
import loading from 'vuejs-loading-screen'
import VueMq from 'vue-mq'

Vue.prototype.$axios=axios  //dichiarazione dell’uso della componente axios

Vue.config.productionTip = false
Vue.use(VueSession)  //istruzione che ci abilita la sessione
Vue.use(loading,{
  bg: '#B3EEE3CB',
})
Vue.use(VueMq, {
  breakpoints: {
    sm: 450,
    md: 1250,
    lg: Infinity,
  }
})


new Vue({
  router,  // utilizzo di router
  VueSession, // utilizzo della sessione
  render: h => h(App),
}).$mount('#app')
