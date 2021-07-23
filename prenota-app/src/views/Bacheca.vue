<template>
        <div class="view-prenotazioni">
        <div  class="prenotazione rounded-pill border border-primary" v-for="(pren,index) in prenotazioni" :key="index">
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
export default {
    name:'bacheca',
    data() {
        return {
            username:'',
            datacur:''
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
        }
    },
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
        .prenotazione{
            display: grid;
            grid-template-columns: 100px calc(100% - 200px) 100px;
            justify-items: center;
            align-items: center;
            padding: 10px;
            border: 1px ridge rgb(66, 66, 66);
            background-color: rgba(255, 255, 255, 0.623);
        }
    }

</style>
