<template>
    <div id="main-banner">
        <h2>Delicious flavour</h2>
        <span>Amazing variety</span>
    </div>
</template>

<script>
export default {
    name: 'HomeBanner'

}
</script>

<style scoped>
#main-banner{
    background-image: url('/public/img/burger.jpg');
    background-position: 0;
    background-size:cover;
    height: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

h2{
    color: white;
    text-align: center;
    font-size: 60px;
    padding: 5px 40px;
}

span{
    color: #FCBA03;
    text-align: center;
    font-size: 80px;
    font-weight: bold;
    padding: 5px 40px;
}

/*MEDIA QUERY 1080px*/
@media (max-width: 67.5em) {

    h2{
        font-size: 40px;
    }

    span{
        font-size: 48px;
    }
}


/*MEDIA QUERY 700px*/
@media (max-width: 43.75em) {

    h2{
        font-size: 28px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    span{
        font-size: 36px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    #main-banner{
        background-position: right;
        height: 180px;
    }
}

    /*MEDIA QUERY 550px*/
@media (max-width: 34.37em) {

    h2{
        font-size: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    span{
        font-size: 24px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
}

</style>