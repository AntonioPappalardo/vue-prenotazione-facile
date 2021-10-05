<template>
<div class="menu" >
          <div class="options">
            <div class="link" @click="ok()"><router-link to="/bacheca">Bacheca</router-link></div>
            <div class="link" @click="ok()"><router-link to="/prenotazione">Prenota</router-link></div>
          </div>
        </div>
</template>
<script>
export default {
    name:'AlertData',
    methods: {
        ok(){
            this.$emit('close');
        },
    },
}
</script>
<style lang="scss">
    .menu{
        
        display: flex;
        height: 100%;
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
</style>
