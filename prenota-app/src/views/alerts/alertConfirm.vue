<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">Conferma Prenotazione</h5>
            <div class="modal-body">Confermi La prenotazione?<br>
            <div v-if="data.service">
            <div v-if="data.occupati<50" class="alert alert-success" role="alert">
                Al momento Non incontri fila
            </div>
            <div v-else-if="data.occupati<75 && data.occupati>=50" class="alert alert-warning" role="alert">
                Puoi incontrare Fila
            </div>
            <div v-else class="alert alert-danger" role="alert">
                Ci sarà Fila
            </div>
            </div>
                Luogo:{{this.$store.getters.getLuogoById(data.luogo).nome}}<br>
                Data:{{data.data}}<br>
                Orario:{{data.orario}}<br>
                intervallo:{{data.intervallo}}
             </div>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">Conferma</button>
                <button class="btn btn-danger rounded-pill" @click="annulla()">Annulla</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AlertData',
    props:{
        data: Object
    },
    methods: {
        ok(){
            this.$emit('conferma');
        },
        annulla(){
            this.$emit('close')
        }
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
