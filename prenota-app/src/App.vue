<template>  
  <div id="app">
    <div class="all" v-if="(this.$route.path!=='/') && (this.$route.path!=='/registrazione')"> 
      <Header/>
      <div class="content">
        <div class="sidebar">
          <div class="options">
            <div class="link"><router-link to="/bacheca">Bacheca</router-link></div>
            <div class="link"><router-link to="/prenotazione">Prenota</router-link></div>
          </div>
        </div>
        <div class="content2">
          <router-view/>
        </div>
      </div>
    </div>
    <div v-else class="contentLogin">   <!--else del controllo del path-->
          <div class="log">
            <router-view/>            <!--vista del componente da visualizzare, ovvero il login -->
          </div>
    </div>
  </div>
</template>

<script>

import { store } from './store/index'   // import dello store

import * as signalR from "@aspnet/signalr"
import axios from 'axios'
import Header from './views/Components/Header.vue'
axios.defaults.crossDomain= true;

export default {
  name: 'App',
  store,
  data(){
    return{
      connection:""
    }
  },
  components:{
    Header
  },
  created: function(){
  this.connection = new signalR.HubConnectionBuilder()
                  .withUrl("https://prenotazionefacile.azurewebsites.net/api")
                  .build();

  },
  methods: {
    logout(){
       this.$session.destroy();
      this.$router.push("/")
    },
    Prenota(prenotazione){
      this.$store.dispatch('Prenota',prenotazione.use);
    }
  },
    mounted () {    
      axios.get('https://prenotazionefacile.azurewebsites.net/api/Connessione?').then(response =>{
      this.$store.dispatch('setUsers',response.data.users);
      this.$store.dispatch('setPrenotazioni',response.data.prenotazioni);
      this.$store.dispatch('setLuoghi',response.data.luoghi);
      this.$store.dispatch('setDependence',response.data.dependence)
      
      });
      this.connection.start().then(() => {
      console.log("SignalR connection established");
      });
      this.connection.on("updated",this.Prenota);
      this.connection.onclose(()  => {
      console.log('SignalR connection disconnected');
});

  },
}


</script>


<style lang="scss">
#app{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .all{
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 100px calc(100vh - 100px);
    
    background-image: url("pics/back2.jpg");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; 
    

    .content{
      width: 100%;
      height: 100%;
      background-color: rgba(245, 245, 220, 0.65);
      display: grid;
      grid-template-columns: 200px calc(100vw - 200px);
      .sidebar{
        
        display: flex;
        height: calc(100vh - 100px);
        background-color: rgba(0, 255, 255, 0.52);
        vertical-align: middle;
        .options{
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-rows: 50px 50px ;
          align-content: center;
          .link{
            width: 100%;
            height: 50px;
            justify-content: center;
            display: flex;
          }
        }
      }
      .content2{
        height: calc(100vh - 100px);
        display: flex;
        align-items: center;
        justify-content: center;
        
      }
    }
  }
  .contentLogin{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    
    background-image: url("pics/back1.jpg");
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; 
  }
}
</style>