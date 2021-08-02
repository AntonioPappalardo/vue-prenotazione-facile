import Vue from 'vue'
import Vuex  from 'vuex'  //import della libreria principale dello store
Vue.use(Vuex) // utilizzo di vuex 

export const store =  new Vuex.Store({ //creazione dello store
    state: { 
        Users:[],
        Prenotazioni:[],
        Luoghi:[],
        Dependence:[]
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
        getTypeById:(state)=>(id)=>{
            return (state.Luoghi.find(luogo=> (luogo.id===id))).type
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
        getPrenotazioneByID:(state)=>(id)=>{
            return state.Prenotazioni.find(prenotazione=>(prenotazione.id==id))
        },
        getCountPrenotazioni:(state)=>{
            return state.Prenotazioni.length + 1
        },
        getLuogoById:(state)=>(id)=>{
            return state.Luoghi.find(luogo=> luogo.id===id);
        },
        ExistDependence:(state)=>(data,user,hour,luogo)=>{
            let x= new Date(data).getDay();
            var dep=state.Dependence.find(dependence=> (dependence.username== user && dependence.day==x && dependence.luogo==luogo))
            if(dep!=null)
            {
                var initdep=((parseInt(dep.orario.substring(0,2),10))*60)+(parseInt(dep.orario.substring(3,5),10))-30;
                var enddep=((parseInt(dep.orario.substring(0,2),10))*60)+(parseInt(dep.orario.substring(3,5),10))+30;
                hour=((parseInt(hour.substring(0,2),10))*60)+(parseInt(hour.substring(3,5),10))
                if((hour <= enddep)&&(hour>=initdep)) return true;
                else return false
            }
            else return false
        },
        CreateDependence:(state,getters)=>(data,user,hour,luogo)=>{
            var b= new Date(data)
            b.setDate(b.getDate()-7)
            var month= b.getMonth()+1<10 ? "0"+(b.getMonth()+1) : b.getMonth()+1
            var day= b.getDate()<10 ? "0"+b.getDate(): b.getDate()
            var aweekpre=""+b.getFullYear()+"-"+month+"-"+day
            var c= new Date(data)
            c.setDate(c.getDate()-14)
            
            month= c.getMonth()+1<10 ? "0"+(c.getMonth()+1) : c.getMonth()+1
            day= c.getDate()<10 ? "0"+c.getDate(): c.getDate()
            var twoweekpre=""+c.getFullYear()+"-"+month+"-"+day
            var prenotazioni=state.Prenotazioni.filter(p=> (p.username==user) && (getters.getLuogoById(p.luogo).type==luogo));
            var pre= prenotazioni.find(prenotazione=> (prenotazione.data==aweekpre))
            if(pre!=null){
                console.log("PRIMA TROVATA")
                var initdep=((parseInt(pre.orario.substring(0,2),10))*60)+(parseInt(pre.orario.substring(3,5),10))-30;
                var enddep=((parseInt(pre.orario.substring(0,2),10))*60)+(parseInt(pre.orario.substring(3,5),10))+30;
                var orario=""+hour+""
                hour=((parseInt(orario.substring(0,2),10))*60)+(parseInt(orario.substring(3,5),10))
                if((hour <= enddep)&&(hour>=initdep)){
                    
                    pre= prenotazioni.find(prenotazione=> (prenotazione.data==twoweekpre))
                    if(pre!=null){
                        initdep=((parseInt(pre.orario.substring(0,2),10))*60)+(parseInt(pre.orario.substring(3,5),10))-30;
                        enddep=((parseInt(pre.orario.substring(0,2),10))*60)+(parseInt(pre.orario.substring(3,5),10))+30;
                        hour=((parseInt(orario.substring(0,2),10))*60)+(parseInt(orario.substring(3,5),10))
                        if((hour <= enddep)&&(hour>=initdep)) return true
                        else return false
                    }
                    else return false
                }
                else return false
            }
            else {
                console.log("PRIMA NON TROVATA")
                return false}            
        },
        isAvaible:(state)=>(prenotazione)=>{
            var pre=state.Prenotazioni.filter(prenotazioni=>(prenotazioni.username==prenotazione.username));
            pre=pre.filter(prenotazioni=>(prenotazioni.data==prenotazione.data))
            var avaible=true;
            pre.forEach( function (el){
                let oinit=(parseInt(el.orario.substring(0,2),10)*60)+parseInt(el.orario.substring(3,5),10);
                let oend=oinit+el.intervallo;
                let scelta_iniziale=(parseInt(prenotazione.orario.substring(0,2),10)*60)+parseInt(prenotazione.orario.substring(3,5),10);
                let scelta_Intervallo=scelta_iniziale+parseInt(prenotazione.intervallo,10);
                if(scelta_iniziale>oinit && scelta_iniziale<oend) {avaible=false;}
                else if(scelta_Intervallo>oinit&& scelta_Intervallo<oend) {avaible=false;}
            })
            return avaible
        }


    },
  
    mutations: {
        setUsers:(state,users) =>{
            state.Users=users
        },
        setDependence:(state,dependence) =>{
            state.Dependence=dependence
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
        },
        setEmailVerificated:(state,user)=>{
            var ind=state.Users.findIndex(us=>(us.username===user.username))
            state.Users[ind].confirmed=true;


        },
        Updateoption:(state,user)=>{
            var ind=state.Users.findIndex(us=>(us.username===user.user.username))
            state.Users[ind].notification=user.notification;
            state.Users[ind].service=user.service;
            

        },
        EliminaPrenotazione:(state,id)=>{
            state.Prenotazioni = state.Prenotazioni.filter(function(item) {
                return item.id !== id
            })
        }
     },
    
    actions: {
        setUsers( {commit}, users){
            commit('setUsers',users);
        },
        setEmailVerificated({commit},user){
            commit('setEmailVerificated',user)
        },
        setDependence( {commit}, dependences){
            commit('setDependence',dependences);
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
        },
        Updateoption({commit},user){
            commit('Updateoption',user)
        },
        EliminaPrenotazione({commit},id){
            commit('EliminaPrenotazione',id)
        }  
    }
  
})