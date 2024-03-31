<template>
    <div id="burger-container">
  
                <div class="burger-template" v-for="burger in burgers" :key="burger.id">
                    <div class="lines"> <p> <span>ID: </span>{{ burger.id }}</p></div>
                    <div class="lines"> <p> <span>Name: </span>{{ burger.name }}</p> </div>
                    <div class="lines"><p> <span>Bread: </span>{{ burger.bread }} </p> </div>
                    <div class="lines"> <p> <span>Meat: </span>{{ burger.meat }} </p></div>
  
                    <div class="lines">
                        <ul class="extras">
                            <li v-for="(extra, index) in burger.extras" :key="index"> {{ extra }} </li>
                        </ul>
                    </div>
                    
                    <div class="status-line">
  
                        <button class="undo-btn" title="Back to Kitchen"><span class="material-symbols-outlined">undo</span></button>
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
    burger_id: null,
    status: []
    }
  },
  
  methods: {
        async getOrders() {
            //Get the orders through a request to the database (db.json file)
            const req = await fetch('http://localhost:3000/delivered-burgers');
            //transform the HTTP request data in json format:
            const data = await req.json();
            //tihs.burgers which was NULL now receives the data from the db.json, via the DATA const.
            this.burgers = data;
  
            this.getStatus();
        },
        
        //Same logic and steps as for the getOrders method above, but now to get the Burgers Status list.
        async getStatus(){
        
            const req = await fetch('http://localhost:3000/status');
  
            const data = await req.json();
  
            this.status = data;    
        },
        
        //method triggered by DELETE btn (@click)
        async deleteBurger(id) {
        
            //HTTP request to the server. The URL is dynamic as it includes the id of the burger to be deleted. method: "DELETE" to indicate that I wanna delete the burger.
            const req = await fetch(`http://localhost:3000/delivered-burgers/${id}`,{
                method: "DELETE"
            });
  
            const res = await req.json();
            //calling the getOrders() method to update the list of burgers on the page.
            this.getOrders();
        },
  
        //method triggered by <select> tag on HTML (burger status changing) (@change)
        async statusUpdate(event, id) {
  
            //identifies the burger status selected by the user
            const option = event.target.value;
            //create a JSON string with the burger status stored on the option var above.
            const dataJson = JSON.stringify({status: option});
            //method: "PATCH" to update the burger status on db.
            //headers inform the database about the format we are sending (JSON)
            //body is the content we're sending to be updated on db file.
            const req = await fetch(`http://localhost:3000/delivered-burgers/${id}`,{
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
  
            const res = await req.json();
  
            this.burgers.find(burger => burger.id === id).status = option;
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
        width: auto;
        margin: 1em 2em 6em 1em;
        
    }
  
    .burger-template{
        border: 1px solid #666;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 250px;
        padding: 1em;
    }
  
    .lines {
        padding: .3em;
        background-color: #f0f0f0;
        border: 1px solid #dfdddd;
        border-radius: 5px;
        width: auto;
        margin: 5px;
        
    }
  
    .extras{
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        
    }
  
    .extras li{
      list-style-type: none;
      font-size: 14px;
        
    }
  
    
    span {
        font-weight: bold;
    }
  
    select {
        padding: 10px;
        margin: 5px;
        width: auto;
        border: 1px solid #dfdddd;
        border-radius: 5px;
  
    }
  
    .status-line{
        display: flex;
        align-items: center;
    }
  
    .status-color{
        width: 1.5em;
        height: 1.5em;
        border-radius: 50%;
        margin: 5px;
    }
  
    .ordered {
        background-color: #f0f0f0;
        border: 1px solid #dfdddd;
    }
  
    .in-production {
        background-color: rgb(254, 123, 0);
        border: 1px solid rgb(225, 110, 3);
    }
  
    .done {
        background-color: rgb(44, 219, 64);
        border: 1px solid rgb(39, 193, 57);
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
        background-color: rgb(221, 210, 3);
        color: white;
        border: 1px solid rgb(187, 179, 59)
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