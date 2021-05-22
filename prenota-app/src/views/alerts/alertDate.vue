<template>
    <div>
        <div class="alert">
            <h5 class="modal-header">ERRORE DATA</h5>
            <p class="modal-body">Il Sabato e la Domenica l'università è chiusa</p>
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
