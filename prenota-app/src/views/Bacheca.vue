<template>
        <div class="view-prenotazioni">
            <AlertPrenotazione :data="this.prenID" v-if="showAlert" v-on:close="showAlert=false" id="overlay"/>
        <div  class="prenotazione" v-for="(pren,index) in prenotazioni" :key="index" @click="postSelezionato(pren.id)" >
            <div>{{pren.data}}</div>
            <div class="orariopren">
                <div>Inizio: {{pren.orario}}</div>
                <div>Durata: {{pren.intervallo}} minuti</div>
            </div>
            <div>{{getLuogo(pren.luogo)}}</div>
        </div>        
        </div>
</template>
<script>
import AlertPrenotazione from './alerts/alertPrenotazione.vue'
export default {
    name:'bacheca',
    data() {
        return {
            username:'',
            datacur:'',
            showAlert:false,
            prenID:0,
        }
    },
    beforeCreate(){
        if(!this.$session.exists()){this.$router.push("/")}
    },
    computed:{
        prenotazioni(){
            return this.$store.getters.getPrenotazioniByUser(this.datacur,this.username);
    
        }
    },
    mounted() {
    var todayData = new Date();
    var month='';
    var day='';
    var user= this.$session.get('user');
    this.username=user.username;
    if((todayData.getMonth()+1)<10) month= '0'+ (todayData.getMonth()+1)
    else month=(todayData.getMonth()+1)
    if((todayData.getDate())<10) day= '0'+ (todayData.getDate())
    else day=(todayData.getDate())
    this.datacur=''+todayData.getFullYear()+'-'+month+'-'+day;
    },
    methods: {
        getLuogo(id){
            return this.$store.getters.getLuogoById(id).nome;
        },
        postSelezionato(id){
            this.prenID=id;
            this.showAlert=true;
        }
    },
    components:{
        AlertPrenotazione
    }
}
</script>
<style lang="scss" scoped>
    .view-prenotazioni{
        width: 100%;
        height: calc(100vh - 250px);
        display: grid;
        overflow-y: scroll;

        grid-row-gap: 10px;
        grid-auto-rows: min-content;
        padding: 5px;
        margin-top:50px ;
        justify-items: center;
        .prenotazione{
            width: 90%;
            display: grid;
            grid-template-columns: 100px calc(100% - 200px) 100px;
            justify-items: center;
            align-items: center;
            padding: 10px;
            border-radius: 20px;
            background-color: rgb(215, 192, 174);
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
    }

</style>
