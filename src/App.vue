<template>
    <Navbar :logo="logo_src" :alt="app_name" />
  <div id="container-app">
    <router-view/>
  </div>
</template>

<script> 
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default{
  components: {
    Navbar,
    Footer
  },
  data(){
    return{
      logo_src: '/img/logo.png',
      app_name: 'Make your Burger'
    }
  }

}

</script>
<style>
* {
  font-family: helvetica;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#container-app{
  min-height: calc(100vh - 224px);
  width: 100%;

}

.main-container{
  margin: 3em 0;
  min-height: 250px;
  width: 100%;
}

h1{
  text-align: center;
  font-size: 42px;
  margin-bottom: 30px;
  color: #222;
}

/*MOBILE VERSION*/
@media (max-width: 700px) {

h1{
  font-size: 26px;
}
}
</style>
