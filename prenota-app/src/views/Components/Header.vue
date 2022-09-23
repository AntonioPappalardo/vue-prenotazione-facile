<template>
  <div class="header">
    <div class="title">
      Prenotazione-Facile
    </div>
    <MenuMobile v-if="showMenu" id="overlay-menu" v-on:close="showMenu=false"/>
    <AlertUser  v-if="showUser" id="overlay" v-on:close="showUser=false"/>
      <div class="user">
        <i class="far fa-user fa-2x" @click="showUser=true"></i>
        <!--
            @click mostrare l'alert con le opzioni possibili...
            
        -->
      </div>
      <div v-if="$mq === 'sm'" >
        <i class="fas fa-bars" @click="showMenu=true"></i>
      </div>
  </div>
</template>

<script>
import AlertUser from '../alerts/alertUser.vue'
import MenuMobile from '../Components/MenuMobile.vue'

export default {
name:"header",
data() {
    return {
        showUser: false,
        showMenu :false
    }
},
components:{
  AlertUser,
  MenuMobile
}
}
</script>

<style lang="scss" scoped>

.header{
      height: 100px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 40px;
      background-color: rgba(255, 0, 0, 0.746);

      align-items: center;
      justify-items: center;


      .title{
        font-size: 40px;
        font-weight: bold;
        justify-content: center;
        display: flex;
        width:100%;
      }


      @media only screen and (max-width: 425px){
      .header{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      h2{
        font-size: 10px;
        font-weight: bold;
      }
      .title{
        font-size: 10px;
        justify-content: flex-start;
      }

      }
    
    }
#overlay {
  position: fixed;
  width: 100%;
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

#overlay-menu {
  position: fixed;
  width: 100%;
  height: 100%; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255,255,255,0.75);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>