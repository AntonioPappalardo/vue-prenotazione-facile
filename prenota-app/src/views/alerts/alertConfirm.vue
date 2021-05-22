<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">Conferma Prenotazione</h5>
            <p class="modal-body">Confermi La prenotazione?</p>
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
