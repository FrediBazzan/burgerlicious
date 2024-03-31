<template>
  <nav>
    <router-link to="/" id="logo-url">
        <img :src="logo" :alt="alt" id="logo">
        <p>Burgerlicious</p>
    </router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/orders">Orders</router-link>
    <router-link to="/delivered-orders">Delivered Orders</router-link>
  </nav>
</template>

<script>
export default{
    name: 'Navbar',
    props: ['logo', 'alt']
}
</script>

<style scoped>
nav{
  background-color: #222;
  height: 80px;
  width: 100%;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#logo-url{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-left: 0;
}

#logo-url p{
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
}

#logo{
  max-width: 40px;
}

nav a{
  color: #FCBA03;
  text-decoration: none;
  margin-left: 16px;
  transition: .5s;
}

nav a:hover{
  color: #FFF;
}



</style>