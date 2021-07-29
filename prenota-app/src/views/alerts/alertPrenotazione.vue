<template>
    <div>
        
    </div>
</template>
<script>
export default {
    name:'AlertUnavaible',
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
