<template>
    <div class="all-prenotazioni">
        <AlertData  v-if="showAlertData" id="overlay" v-on:close="showAlertData=false"/>
        <AlertIncomplete v-if="showAlertIncomplete" id="overlay" v-on:close="showAlertIncomplete=false"/>
        <AlertConfirm v-if="showAlertConfirm" id="overlay" v-on:close="showAlertConfirm=false;annulla()" v-on:conferma="showAlertConfirm=false; conferma()"/>
        <AlertError v-if="showAlertError" id="overlay" v-on:close="showAlertError=false"/>
        <div class="form">
           <div>
           <h5>GIORNO:</h5> <input type="date" v-model="formData.mydate" v-bind:min="today.mydate" />
           </div>
           <div>
            <h5>LUOGO:</h5>
            <select v-model="type" v-if="isStudent">
                        <option disabled value="0">Seleziona</option>
                        <option value="1">Mensa</option>
                        <option value="2">Aula Studio</option>
                        <option value="3">Laboratorio</option>
                        <option value="4">Aula</option>
                    </select>
            <select v-model="type" v-else>
                <option disabled value="1">Mensa</option>
            </select>
           </div>
            <div>
            <h5>ORARIO:</h5><input type="time" v-model="orario" min="09:00" max="17:00" list="timeList">
            </div>
            <div>
            <h5>INTERVALLO:</h5> <input type="num" v-model="intervallo">
            </div>
        </div>

        <datalist id="timeList">
            <option v-for="(option,index) in options"  :key="index" v-bind:value="option"/>
        </datalist>

        <div class="luoghi-list">
        <div  class="luogo rounded-pill border border-primary" v-for="(place,index) in luoghi" :key="index" @click="LuogoScelto(place.id)">
            {{place.nome}}
        </div>
        </div>

    </div>
</template>

<script>
var vueData = {};

vueData.mydate = "";

var todayData={};
todayData.mydate="17/11/2020";
import AlertData from './alerts/alertDate'
import AlertIncomplete from './alerts/alertIncomplete'
import AlertConfirm from './alerts/alertConfirm'
import AlertError from './alerts/alertError'
export default {
    name:'prenotazioni',
    data() {
        return {
            showAlertData:false,
            showAlertIncomplete:false,
            showAlertConfirm:false,
            showAlertError:false,
            formData:vueData,
            intervallo:0,
            today:todayData,
            type:0,
            orario:null,
            luoghi:[],
            isStudent:true,
            options:[
                "13:00",
                "13:10",
                "13:20",
                "13:30"
            ]
        }
    },
    mounted() {
    var todayData = new Date();
    var month='';
    var day='';
    if((todayData.getMonth()+1)<10) month= '0'+ (todayData.getMonth()+1)
    else month=(todayData.getMonth()+1)
    if((todayData.getDate())<10) day= '0'+ (todayData.getDate())
    else day=(todayData.getDate())
    var datacur=''+todayData.getFullYear()+'-'+month+'-'+day;
    this.today.mydate=datacur;
    var user=(this.$session.get('user'))
    if (user.type==1) this.isStudent=true
    else this.isStudent=false
    this.formData.mydate=null

    },
    computed:{

    },
    watch:{
        type:function(){
            this.updateLuoghi();
        },
        'formData.mydate':function(){
            this.updateDate()
        }
    },
    methods: {
        annulla(){
            this.formData.mydate=null;
            this.type=0;
            this.orario=null;
            this.intervallo=0;
        },
        conferma(){
            console.log("PRENOTA");
            this.$router.push("/bacheca")
        },
        updateLuoghi(){
            this.luoghi.splice(0,this.luoghi.length)
            var a=this.$store.getters.getLuoghiByType(this.type);
            for(var i=0;i<a.length;i++){
            this.luoghi.push(a[i])
            }
        },
        updateDate(){
        var x= new Date(this.formData.mydate).getDay();
            if(x === 0 || x === 6) 
            {
                this.showAlertData=true;
                this.formData.mydate=null
            }
        },
        LuogoScelto(id){
            if(this.formData.mydate!==null && this.orario !== null && this.intervallo!== 0){
                if(this.$store.getters.getPrenotazioneByPenotazione(id,this.formData.mydate,this.orario,this.intervallo)){
                    this.showAlertConfirm=true;
                }
                else{
                    this.showAlertError=true;
                }
            }
            else{
                this.showAlertIncomplete=true;
            }
        },
    },
    components:{
        AlertData,
        AlertIncomplete,
        AlertError,
        AlertConfirm,
    } 
}
</script>
<style lang="scss" scoped>
.all-prenotazioni{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 30% 70%;
    justify-items: center;
    .form{
        display:flex;
        width: 70%;
        flex-direction: column;
        justify-content: space-between;
        align-content: center;
        padding: 40px;
        div{
            display: grid;
            grid-template-columns: 50% 50%;
            justify-items: end;
            width: 100%;
        }
        
    }
    .luoghi-list{
        width: 100%;
        
        overflow-y: scroll;
        display: grid;
        grid-row-gap: 10px;
        grid-auto-rows: min-content;
        padding: 5px;
        align-content: center;
        .luogo{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            border: 1px ridge rgb(66, 66, 66);
            background-color: rgba(255, 255, 255, 0.623);
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
</style>