<template>
    <footer id="footer">
        <p>Burgerlicious by Fredi &copy; 2024</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
#footer{
    height: 50px;
    background-color: #222;
    border-top: 4px solid #111;
    color: #FCBA03;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: fixed;
    bottom: 0;
}
</style>