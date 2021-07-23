<template>
    <div class="modulo">
        <div class="alert-danger" v-if="errore" >
                {{errormsg}}
            </div>
        <div class="dati">
            <div class="username-registrazione">
                Username: <input type="text" v-model="username" id="username" class="input"> <div>
                    <select v-model="type">
                        <option disabled value="">Seleziona</option>
                        <option value="1">@studenti.unisa.it</option>
                        <option value="2">@unisa.it</option>
                    </select>
                </div>
            </div>

            <div class="password-registrazione">
                Password:<input type="password" v-model="password" id="password" class="input">
            </div>
        </div>
        <div class="options-registazione">
            <input type="checkbox" v-model="option1" id="option1"> 
            <label for="option1"> Ricevere notifiche</label><br>
            <input type="checkbox" v-model="option2" id="option2"> 
            <label for="option2">Servizi intelligenti</label><br>
        </div>
        <div class="send">
            <button class="btn btn-outline-dark" @click="Registra()">
                registra
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'registrazione',
        data(){
        return{
            errore:false,
            errormsg:"",
            username:"",
            type:"",
            password:"",
            option1:"",
            option2:"",
        }
    },
    methods: {
        Registra(){
            var passre=new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
            if(this.username==""||this.$store.getters.getUserByUser(this.username)){
                this.errore=true;
                this.errormsg="username non valido"
            }
            else
            if(this.type==""){
                this.errore=true;
                this.errormsg="Selezionare il dominio"
            }
            else
            if(this.password.length<8){
                this.errore=true;
                this.errormsg="Errore Password: deve essere Lunga almeno 8 caratteri"
            }
            else
            if(!passre.test(this.password)){
                this.errore=true;
                this.errormsg="La Password deve contenere: una lettera minuscola una lettera maiuscola un numero"
            }
            else this.saveDB();

        },
        saveDB(){
            var code=Math.floor(Math.random() * 9000)+1000
            axios.get("https://prenotazionefacile.azurewebsites.net/api/Registrazione",{params:
            {
                "username":this.username,
                "password":this.password,
                "type":this.type,
                "notification":this.option1,
                "service":this.option2,
                "confirmed":false,
                "code":code
            }
            });
            
            var user={
                "username":this.username,
                "password":this.password,
                "type":this.type,
                "notification":this.option1,
                "service":this.option2,
                "confirmed":false,
                "code":code
            }
            var email=this.username;
            if(this.type==1)email= email+'@studenti.unisa.it'
            else email= email+'@unisa.it'
            axios.get("https://prenotazionefacile.azurewebsites.net/api/MailSender",{params:
            {
                "email":email,
                "subject":"Conferma Registrazione",
                "object":"Il codice di Verifica dell'email è:\n"+code
            }
            });
            this.$store.dispatch('RegUser',user)
            this.$router.push("/bacheca")
        }
    },
}
</script>

<style lang="scss">
.modulo{
    height: 300px;
    width: 500px;
    background-color: aquamarine;
    border-radius: 15px;
    padding: 20px;
    display: grid;
    grid-row-gap: 15px;
    .dati{
        .input{
            border-radius:10px;
        }
        display: grid;
        grid-row-gap: 15px;
        .username-registrazione{
         display: grid;
         grid-template-columns: 100px 180px 150px;
         column-gap: 10px;
         
         align-items: center
        }
        .password-registrazione{
         display: grid;
         grid-template-columns: 100px 180px 150px;
         column-gap: 10px;
         align-items: center

        }
    }
}
</style>