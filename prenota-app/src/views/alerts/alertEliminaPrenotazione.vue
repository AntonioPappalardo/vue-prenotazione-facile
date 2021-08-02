<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">Elimina Prenotazione</h5>
            <div class="modal-body">Confermi L'eliminazione della Prenotazione?</div>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">Elimina</button>
                <button class="btn btn-danger rounded-pill" @click="annulla()">Annulla</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AlertEliminaPrenotazione',
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
