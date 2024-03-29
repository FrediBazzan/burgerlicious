<template>
    <div class="message-container">
        <p> {{ msg }} </p>
    </div>
</template>



<script>
export default {
    name: 'Message',
    props: {
        msg: 'string'
    }
}
</script>



<style scoped>

.message-container {
    color: #5cbb88;
    background-color: #a6e8c5;
    border: 2px solid #5cbb88;
    border-radius: 5px;
    padding: 10px;
    max-width: 400px;
    margin: 30px auto;
}


</style>