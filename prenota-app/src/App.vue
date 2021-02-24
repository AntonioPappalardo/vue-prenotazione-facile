<template>  
  <div id="app">
    <div class="all" v-if="(this.$route.path!=='/') && (this.$route.path!=='/registrazione')"> 
      <div class="header"></div>
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

import axios from 'axios'
axios.defaults.crossDomain= true;

export default {
  name: 'App',
  store,
  data(){
    return{
    }
  },
    mounted () {
      axios.get('https://prenotazionefacile.azurewebsites.net/api/Connsessione?').then(response =>{
      this.$store.dispatch('setUsers',response.data.users);
      this.$store.dispatch('setPrenotazioni',response.data.prenotazioni);
      this.$store.dispatch('setLuoghi',response.data.luoghi);
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
    
    .header{
      width: 100%;
      background-color: coral;
    }
    .content{
      width: 100%;
      height: 100%;
      background-color: beige;
      display: grid;
      grid-template-columns: 200px calc(100vw - 200px);
      .sidebar{
        
        display: flex;
        height: 100%;
        background-color: aqua;
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
    height: calc(100% - 100px);
  }
}
</style>