<template>
    <div class="all-prenotazioni">
        <AlertData  v-if="showAlertData" id="overlay" v-on:close="showAlertData=false"/>
        <AlertIncomplete v-if="showAlertIncomplete" id="overlay" v-on:close="showAlertIncomplete=false"/>
        <AlertConfirm :data="this.prenotazione" v-if="showAlertConfirm" id="overlay" v-on:close="showAlertConfirm=false;annulla()" v-on:conferma="showAlertConfirm=false; conferma()"/>
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
                <option selected value="1">Mensa</option>
            </select>
           </div>
            <div>
                <h5>ORARIO:</h5><vue-timepicker
                            format="HH:mm"
                            :minute-interval="15"
                            :hour-range="[9,10,11,12,13,14,15,16,17]"
                            fixed-dropdown-button
                            v-model="orario">
                            </vue-timepicker>
            </div>
            <div>
                <h5>INTERVALLO:</h5> 
                        <input type="number"  v-bind:min="optionmin" v-bind:max="optionmax" step="15" v-model="intervallo" onkeydown="return false">
            </div>
        </div>

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
import VueTimepicker from 'vue2-timepicker'
import axios from 'axios';
axios.defaults.crossDomain= true;
function getAxiosConfig() {
      const config = {
        headers: {}
      };
      return config;
    }
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
            username:'',
            luogo:'0',
            showAlertIncomplete:false,
            showAlertConfirm:false,
            showAlertError:false,
            formData:vueData,
            intervallo:15,
            today:todayData,
            type:0,
            orario:"09:00",
            luoghi:[],
            isStudent:true,
            nprenotazione:0,
            prenotazione:'',
            optionmin:30,
            optionmax:180
        }
    },
    mounted() {
        var todayData = new Date();
        var datacur=this.transformData(todayData);
        this.today.mydate=datacur;
        console.log(this.today.mydate)
        var user=(this.$session.get('user'));
        if (user.type==1) this.isStudent=true;
        else this.isStudent=false;
        this.formData.mydate=null;
        this.username=user.username;
    },
    beforeCreate(){
        if(!this.$session.exists()){this.$router.push("/")}
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
            this.nprenotazione=this.$store.getters.getCountPrenotazioni;
            axios.get("https://prenotazionefacile.azurewebsites.net/api/Prenotazione",{params:
            {
                "id": this.nprenotazione,
                "luogo":this.luogo,
                "data":this.formData.mydate,
                "intervallo":this.intervallo,
                "username":this.username,
                "orario":this.orario
            }
            });
            var email;
            if (this.isStudent) email=""+this.username+"@studenti.unisa.it"
            else email=""+this.username+"@unisa.it" 
            axios.get("https://prenotazionefacile.azurewebsites.net/api/MailSender",{params:
            {
                "email":email,
                "subject":"Prenotazione",
                "object":"La prenotazione è avvenuta correttamente\n"+ 
                         "I dati sono: \n"+
                         "Codice Prenotazione: "+this.nprenotazione+"\n"+
                         "Luogo: "+this.$store.getters.getLuogoById(this.luogo).nome+"\n"+
                         "Data: "+this.formData.mydate+"\n"+
                         "Orario: "+this.orario+"\n"+
                         "Durata: "+this.intervallo
                
            }
            });
            this.prenotazione={
                "service":(this.$session.get('user')).service,
                "occupati":(this.nprenotazione*100)/this.$store.getters.getLuogoById(this.luogo).posti,
                "id": this.nprenotazione,
                "luogo":this.luogo,
                "data":this.formData.mydate,
                "intervallo":this.intervallo,
                "username":this.username,
                "orario":this.orario
            }
            axios.post('https://prenotazionefacile.azurewebsites.net/api/PrenotaSignal',
            {"use":this.prenotazione},getAxiosConfig());
            this.$store.dispatch('Prenota',this.prenotazione)
            
            var typeluogo=this.$store.getters.getTypeById(this.luogo);
            if(this.$store.getters.ExistDependence(this.formData.mydate,this.username,this.orario,typeluogo)){
                    //UPDATE DEPENDECE
                    //BISOGNA CREARE FUNCTION AZURE PER L'UPDATE
                     axios.get('https://prenotazionefacile.azurewebsites.net/api/UpdateDependence',{
                        params:{
                            "user":this.username,
                            "day":day,
                            "luogo":typeluogo,
                            "orario":this.orario
                        }
                    })
            }
            else{
                var dataselected= new Date(this.formData.mydate);
                var day=dataselected.getDay();
                if(this.$store.getters.CreateDependence(this.formData.mydate,this.username,this.orario,typeluogo))
                {
                    axios.get('https://prenotazionefacile.azurewebsites.net/api/CreateDependence',{
                        params:{
                            "user":this.username,
                            "day":day,
                            "luogo":typeluogo,
                            "orario":this.orario
                        }
                    })
                    
                }
            }
            
            this.$router.push("/bacheca")
        },
        updateLuoghi(){
            this.luoghi.splice(0,this.luoghi.length)
            var a=this.$store.getters.getLuoghiByType(this.type);
            for(var i=0;i<a.length;i++){
            this.luoghi.push(a[i])
            if(this.type==1){
                this.optionmin=15;
                this.intervallo=15
                this.optionmax=60
            }
            else{
                this.optionmin=30;
                this.optionmax=180;
                this.intervallo=30
            }
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
            this.luogo=id;
            if(this.formData.mydate!==null && this.orario !== null && this.intervallo!== 0){
                if(this.$store.getters.getPrenotazioneByPenotazione(id,this.formData.mydate,this.orario,this.intervallo)){
                    console.log((this.$session.get('user')).service)
                    this.prenotazione={
                        "service":(this.$session.get('user')).service,
                        "occupati":(this.nprenotazione*100)/this.$store.getters.getLuogoById(this.luogo).posti,
                        "id": this.nprenotazione,
                        "luogo":this.luogo,
                        "data":this.formData.mydate,
                        "intervallo":this.intervallo,
                        "username":this.username,
                        "orario":this.orario
                    }
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
        transformData(d){
            var month= d.getMonth()+1<10 ? "0"+(d.getMonth()+1) : d.getMonth()+1
            var day= d.getDate()<10 ? "0"+d.getDate(): d.getDate()
            console.log()
            return(""+d.getFullYear()+"-"+month+"-"+day)
        }
    },
    components:{
        AlertData,
        AlertIncomplete,
        AlertError,
        AlertConfirm,
        VueTimepicker
    } 
}
</script>
<style lang="scss" scoped>
@import '~vue2-timepicker/dist/VueTimepicker.css';
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