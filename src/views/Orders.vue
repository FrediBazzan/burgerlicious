<template>
  <div id="main-container">
    <div class="Orders-container">
      <h2>Kitchen Orders:</h2>
      <Dashboard />
    </div>

    <div class="Delivered-container">
      <h2>Delivered Orders:</h2>
      <DeliveredOrders />
    </div>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'
import DeliveredOrders from '../components/DashboardDelivered.vue'

export default {
  name: 'Orders',
  components: {
    Dashboard,
    DeliveredOrders
  }
}
</script>

<style scoped>

h2{
  margin-bottom: 1em;
  text-align: center;
}

#main-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.Orders-container{
  padding: 2em 2em 6em 2em;
  width: 100%;
}

.Delivered-container{
  background-color: #eee;
  padding: 2em 2em 6em 2em;
  width: 100%;

}

</style>
