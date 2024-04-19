<template>
    <div id="burger-container">
  
                <div class="burger-template" v-for="burger in burgers" :key="burger.id">
                    <div class="lines"> <p> <span>ID: </span>{{ burger.id }}</p></div>
                    <div class="lines"> <p> <span>Name: </span>{{ burger.name }}</p> </div>
                    
                    <div class="status-line">
  
                        <button class="undo-btn" title="Return to Kitchen" @click="returnToKitchen(burger)"><span class="material-symbols-outlined">undo</span></button>
                        <button class="delete-btn" title="Delete Order" @click="deleteBurger(burger.id)"><span class="material-symbols-outlined">delete</span></button>
  
                    </div>
  
                        
  
                </div>
    </div>
  
  </template>
  
  
  
  
  
  
  <script>
  export default {
  name: 'DashboardDelivered',
  
  data(){
    return{
    burgers: null,
    }
  },
  
  methods: {
        async getOrders() {

            const req = await fetch('http://localhost:3000/delivered-burgers');

            const data = await req.json();

            this.burgers = data;
  
        },
        
        //method triggered by DELETE btn (@click)
        async deleteBurger(id) {

            const confirmDelivery = window.confirm('Are you sure you want to delete this burger?');

            if (!confirmDelivery) {
                return;
            }
        
            const req = await fetch(`http://localhost:3000/delivered-burgers/${id}`,{
                method: "DELETE"
            });
  
            const res = await req.json();

            this.getOrders();
        },

        //method triggered by UNDO btn (@click)
        async returnToKitchen(burger) {

            const confirmDelivery = window.confirm('Are you sure you want to send this burger back to the kitchen?');

            if (!confirmDelivery) {
                return;
            }

            burger.status = 'Ordered';

            const req = await fetch('http://localhost:3000/burgers',{
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(burger),
            });

            this.deleteBurger(burger.id);
        
            this.getOrders();

            window.location.reload();
        }
    
    },
  
  mounted(){
    this.getOrders();
  }
  }
  </script>
  
  
  
  
  
  <style scoped>
  
    #burger-container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2em;
        width: 100%;
        
    }
  
    .burger-template{
        border: 1px solid #666;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 1em;
        background-color: #fff;
    }
  
    .lines {
        padding: .3em;
        background-color: #f0f0f0;
        border: 1px solid #dfdddd;
        border-radius: 5px;
        width: auto;
        margin: 5px;
        
    }
  
    
    span {
        font-weight: bold;
    }
  
    .delete-btn,
    .undo-btn{
        background-color: transparent;
        color: #555;
        border: 1px solid #dfdddd;
        border-radius: 5px;
        padding: 7px;
        margin: 10px;
        cursor: pointer;
        transition: .5s;
        width: auto;
    }
  
    .delete-btn:hover{
        background-color: tomato;
        color: white;
        border: 1px solid rgb(224, 81, 56);
    }
  
    .undo-btn:hover{
        background-color: #FCBA03;
        color: white;
        border: 1px solid #edae00;
    }
  
    .material-symbols-outlined{
      font-size: 20px;
    }
  
    /*MOBILE VERSION*/
  @media (max-width: 700px) {
  
    #burger-container{
        grid-template-columns: 1fr;
        gap: 1em;
        margin: 1em;
        
    }
  
    .burger-template{
        width: 100%;
    }
  }
  
  </style>