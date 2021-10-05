<template>
  <div class="header">
    <AlertUser  v-if="showUser" id="overlay" v-on:close="showUser=false"/>
    <MenuMobile v-if="showMenu" id="overlay-menu" v-on:close="showMenu=false"/>
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
      flex-direction: row-reverse;
      justify-content: space-between;
      
      padding: 40px;
      background-color: rgba(238, 112, 66, 0.52);

      align-items: center;
      justify-items: center;

      @media only screen and (max-width: 425px){
        h2{
        font-size: 10px;
        font-weight: bold;
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