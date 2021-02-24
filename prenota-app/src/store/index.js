import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store
Vue.use(Vuex) // utilizzo di vuex 

export const store =  new Vuex.Store({ //creazione dello store
    state: { 
        Users:[],
        Prenotazioni:[],
        Luoghi:[]
     },

    getters:{ 
        getUserByLogin:(state)=>(username,password)=>{
            return state.Users.find(user => (user.username===username && user.password===password))
        },
        getUserByUser:(state)=>(username)=>{
            return state.Users.find(user => (user.username===username))
        }
    },
  
    mutations: {
        setUsers:(state,users) =>{
            state.Users=users
        },
        setPrenotazioni:(state,pos) =>{
            state.Prenotazioni=pos
        },
        setLuoghi:(state,luoghi) =>{
            state.Luoghi=luoghi
        }
     },
    
    actions: {
        setUsers( {commit}, users){
            commit('setUsers',users);
        },
        setLuoghi( {commit}, luoghi){
            commit('setLuoghi',luoghi);
        },
        setPrenotazioni( {commit}, pos){
            commit('setPrenotazioni',pos);
        }  
    }
  
})