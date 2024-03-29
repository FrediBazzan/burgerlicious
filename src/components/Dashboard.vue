<template>
    <div id="burger-table">
        <div>

            <div id="burger-table-heading">
                <div class="order-id">#:</div>
                <div class="customer">Customer's Name</div>
                <div class="bread">Bread type</div>
                <div class="meat">Meat type</div>
                <div class="extras">Extras</div>
                <div class="actions">Actions</div>
            </div>


            <div id="burger-table-rows">
                <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                    <div class="order-number">{{ burger.id }}</div>
                    <div> {{ burger.name }} </div>
                    <div> {{ burger.bread }} </div>
                    <div> {{ burger.meat }} </div>
                    <div>
                        <ul>
                            <li v-for="(extra, index) in burger.extras" :key="index"> {{ extra }} </li>
                        </ul>
                    </div>
                    <div>
                        <select name="status" class="status" :class="{'ordered': burger.status === 'Ordered', 'in-production': burger.status === 'In Production', 'done': burger.status === 'Done'}" @change="statusUpdate($event, burger.id)">
                            <option v-for="s in status" :key="s.id" :value="s.type" :selected="burger.status == s.type"> {{ s.type }} </option>
                        </select>

                        <button class="delete-btn" @click="deleteBurger(burger.id)">Delete</button>
                    </div>

                </div>
            </div>

        </div>
    </div>

</template>






<script>
export default {
  name: 'Dashboard',

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
            const req = await fetch('http://localhost:3000/burgers');
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
            const req = await fetch(`http://localhost:3000/burgers/${id}`,{
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
            const req = await fetch(`http://localhost:3000/burgers/${id}`,{
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

    #burger-table{
        max-width: 1200px;
        margin: 0 auto;
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row{
        display: flex;
        flex-wrap: wrap;
        gap: 1px;
    }

    #burger-table-heading{
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    #burger-table-heading div,
    .burger-table-row div{
        width: 18%;

    }

    .burger-table-row{
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ccc;
    }

    #burger-table-heading .order-id,
    .burger-table-row .order-number{
        width: 5%;
    }

    select {
        padding: 12px 6px;
        margin-right: 12px;
    }

    .ordered {
    background-color: white;
    }

    .in-production {
        background-color: rgb(244, 145, 17);
    }

    .done {
        background-color: rgb(44, 219, 64);
    }


    .delete-btn{
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .delete-btn:hover{
        background-color: transparent;
        color: #222;
    }

</style>