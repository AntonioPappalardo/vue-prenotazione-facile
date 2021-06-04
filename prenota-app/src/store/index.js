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
        },
        getLuoghi:(state)=>{
            return state.Luoghi;
        },
        getLuoghiByType:(state)=> (type)=>{
            return state.Luoghi.filter(luogo =>(luogo.type===type))
            
        },
        getPrenotazioni:(state)=>{
            return state.Prenotazioni
        },
        getPrenotazioniByUser:(state)=>(datacur,username)=>{
            return state.Prenotazioni.filter(prenotazione=> (prenotazione.username===username && prenotazione.data>=datacur))
        },
        getPrenotazioneByPenotazione:(state)=>(id,data,orario,intervallo)=>{
            
            var posti=state.Luoghi.find(luogo=> (luogo.id==id)).posti;
            var p=(state.Prenotazioni.filter(prenotazione =>(prenotazione.luogo=== id && prenotazione.data=== data)));
            var pos=0;
            for(let i=0;i<p.length; i++){
                let oinit=(parseInt(p[i].orario.substring(0,2),10)*60)+parseInt(p[i].orario.substring(3,5),10);
                let oend=oinit+p[i].intervallo;
                let scelta_iniziale=(parseInt(orario.substring(0,2),10)*60)+parseInt(orario.substring(3,5),10);
                let scelta_Intervallo=scelta_iniziale+parseInt(intervallo,10);
                if(scelta_iniziale>oinit && scelta_iniziale<oend) pos++;
                else if(scelta_Intervallo>oinit&& scelta_Intervallo<oend)pos++;
            }
            return posti>pos;
        },
        getCountPrenotazioni:(state)=>{
            return state.Prenotazioni.length + 1
        },
        getLuogoById:(state)=>(id)=>{
            return state.Luoghi.find(luogo=> luogo.id===id);
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
        },
        RegUser:(state,user) =>{
            state.Users.push(user)
        },
        Prenota:(state,prenotazione)=>{
            state.Prenotazioni.push(prenotazione);
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
        },
        RegUser( {commit}, user){
            commit('RegUser',user);
        },
        Prenota({commit},prenotazione){
            commit('Prenota',prenotazione);
        }  
    }
  
})