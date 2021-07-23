<template>
    <div>
        <div class="alert">
            <div class="alert-danger" v-if="errore" >
                Codice non corretto
            </div>
            <h5 class="modal-header">Conferma Email</h5>
            <p class="modal-body">Inserisci il Codice di verifica ricevuto via e-mail</p>
            <p class="modal-body">
                <input type="text" maxlength="4" pattern="\[0-9][0-9][0-9][0-9]" required v-model="incode"/>
            </p>
            <div class="modal-footer">
                <button class="btn btn-primary rounded-pill" @click="ok()">OK</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AlertValidateEmail',
    props:{
        code: String
    },
    data() {
        return {
            incode:"",
            errore:false
        }
    },
    watch:{
        incode:function(){
            this.errore=false
        }
    },
    methods: {
        ok(){
            if(this.code==this.incode){
                this.$emit('close')
            }
            else{
                this.errore=true
            }
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