<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">ERRORE PRENOTAZIONE</h5>
            <p class="modal-body">Spiacenti non è possibile effettuare la prenotazione</p>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">OK</button>
            </div>
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
    .alert{
        width: auto;
        height: auto;
        background-color:white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
</style>
