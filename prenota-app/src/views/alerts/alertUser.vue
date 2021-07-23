<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">{{this.user.username}}  
              <i class="fas fa-sign-out-alt"></i>

            </h5>
            <div class="modal-body">
            <input type="checkbox" v-model="option1" id="option1"> 
            <label for="option1"> Ricevere notifiche</label><br>
            <input type="checkbox" v-model="option2" id="option2"> 
            <label for="option2">Servizi intelligenti</label><br>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">Conferma</button>
                <button class="btn btn-danger rounded-pill" @click="annulla()">Annulla</button>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'AlertUser',
    data() {
        return {
            option1:false,
            option2:true,
            user:""
        }
    },
    methods: {
        ok(){
            var service=false;
            var notification=false
            if (this.option2){
                service=true
            }
            else this.option2=false;
            if (this.option1){
                notification=true
            }
            else this.option1=false;
            var obj={
                "user":this.user,
                "notification":notification,
                "service":service}
            this.$store.dispatch("Updateoption",obj);
            axios.get('https://prenotazionefacile.azurewebsites.net/api/UpdateUserOption',
                {
                    params:{
                        "user":this.user.username,
                        "notification":notification,
                        "service":service
                    }
                }
            );
            this.$emit('close');
        },
        annulla(){
            this.$emit('close');
        },
        logout(){
            this.$session.destroy();
            this.$router.push("/")
        }
    },
     mounted() {
        this.user=this.$store.getters.getUserByUser((this.$session.get('user')).username);
        this.option1=this.user.notification;
        this.option2=this.user.service
    },
}
</script>
<style lang="scss">
    .alert{
        width: auto;
        height: auto;
        background-color:white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
</style>