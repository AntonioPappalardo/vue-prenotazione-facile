import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import registrazione from '../views/Registrazione.vue'
import bacheca from '../views/Bacheca.vue'
import prenotazioni from '../views/Prenotazioni.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login
  },
  {
      path: '/registrazione',
      name:'Registrazione',
      component: registrazione
  },
  {
    path: '/bacheca',
    name: 'Bacheca',
    component: bacheca
  },
  {
      path: '/prenotazione',
      name:'Prenotazione',
      component:prenotazioni
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router