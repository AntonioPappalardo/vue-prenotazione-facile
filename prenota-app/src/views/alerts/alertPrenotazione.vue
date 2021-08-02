<template>
    <div>
        <AlertEliminaPrenotazione id="overlay" v-if="showElimina" v-on:close="showElimina=false; ok()" v-on:conferma="showElimina=false;elimina()"/>
        <div class="alert">
            <h5 class="modal-header">Prenotazione </h5>
            <div class="modal-body">
                Luogo:{{luogo}}<br>
                Data:{{prenotazione.data}}<br>
                Orario:{{prenotazione.orario}}<br>
                intervallo:{{prenotazione.intervallo}}
                <br>
            
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">OK</button>
                <button class="btn btn-danger rounded-pill" @click="showElimina=true">Elimina</button>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';

import AlertEliminaPrenotazione from './alertEliminaPrenotazione.vue'
export default {
    name:'AlertPrenotazione',
    props:{
        data: String
    },
    data() {
        return {
            prenotazione:'',
            luogo:'',
            showElimina:false
        }
    },
    methods: {
        ok(){
            this.$emit('close');
        },
        elimina(){
            axios.get("https://prenotazionefacile.azurewebsites.net/api/EliminaPrenotazione",{params:
            {
                "prenotazione":this.prenotazione.id,
            }
            });
            this.$store.dispatch("EliminaPrenotazione",this.prenotazione.id)
            this.$emit('close');

        }
    },
    mounted() {
        this.prenotazione=this.$store.getters.getPrenotazioneByID(this.data)
        this.luogo= this.$store.getters.getLuogoById(this.prenotazione.luogo).nome;
    },
    components:{
        AlertEliminaPrenotazione
    }
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
