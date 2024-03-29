<template>
  <HomeBanner />
  <div class="main-container">
    <h2>Make your Burger:</h2>
    <HomeForm />
  </div>
</template>

<script>
import HomeBanner from '../components/HomeBanner.vue'
import HomeForm from '../components/HomeForm.vue'


export default{
  name: 'Home',
  components: {
    HomeBanner,
    HomeForm
  }
}
</script>

<style scoped>

.main-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2{
  font-size: 28px;
}
</style>
