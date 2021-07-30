<template>
    <div>
            <h5 class="modal-header">Prenotazione </h5>
            <div class="modal-body">
                
                <br>
            
            </div>
        
    </div>
</template>
<script>
export default {
    name:'AlertPrenotazione',
    props:{
        data: Object
    },
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
