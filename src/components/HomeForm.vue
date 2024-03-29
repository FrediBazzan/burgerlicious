<template>
    <div id="form-container">

        <Message :msg="msg" v-show="msg" />

        <div>
            <form id="burger-form" @submit="createBurger">
                
                <div class="input-container">
                    <label for="name">Your Name:</label>
                    <input type="text" id="name" name="name" v-model="name" placeholder="Type your name">
                </div>

                <div class="input-container">
                    <label for="bread">Bread:</label>
                    <select name="bread" id="bread" v-model="bread">
                        <option value="" selected>Choose your bread:</option>
                        <option v-for="bread in breads" :key="bread.id" :value="bread.type"> {{ bread.type }} </option>
                    </select>
                </div>

                <div class="input-container">
                    <label for="meat">Burger:</label>
                    <select name="meat" id="meat" v-model="meat">
                    <option value="" selected>Choose your burger:</option>
                    <option v-for="meat in meats" :key="meat.id" :value="meat.type"> {{ meat.type }} </option>
                    </select>
                </div>

                <div id="extras-container" class="input-container">
                    <label id="extras-title" for="extra">Extra ingredients:</label>
                    <div class="checkbox-container" v-for="extra in extrasdata" :key="extra.id">
                        <input type="checkbox" name="extras" v-model="extras" :value="extra.type">
                        <span> {{ extra.type }} </span>
                    </div>
                </div>

                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Send your Order">
                </div>

            </form>

        </div>
    </div>
</template>






<script>

import Message from './successMessage.vue'

export default {
    name: 'HomeForm',
    data() {
        return{
            breads: null,
            meats: null,
            extrasdata: null,
            name: null,
            bread: '',
            meat: '',
            extras: [],
            msg: null
        }
    },

    methods: {
        async getIngredients() { //método assíncrono para enviar os ingredientes do db.json para o formulário.
           const req = await fetch('http://localhost:3000/ingredients') //requisição para o arquivo db.json que contém a lista de ingredientes
           const data = await req.json(); //cria variavel data e vincula a ela os dados da var req, que são os ingredientes do db.json

           this.breads = data.breads; //cria a var breads e diz que ela é igual a lista breads da variavel data
           this.meats = data.meats; //cria a var meats e diz que ela é igual a lista meats da variavel data
           this.extrasdata = data.extras; //cria a var extras e diz que ela é igual a lista extras da variavel data
        },

        async createBurger(e){ //método assíncrono para receber os dados do form e add no banco de dados
            
            e.preventDefault(); //interrompe o caminho natural do clique no botão para, ao inves de seguir para um link, seguir este método criado.

            const data = {      //variável que recebe os dados preenchidos no form e os transforma em um objeto.
                name: this.name,
                meat: this.meat,
                bread: this.bread,
                extras: Array.from(this.extras),
                status: 'Ordered'
            }

            const dataJson = JSON.stringify(data);  //variavel que transforma os itens do objeto "data" em uma string JSON, para poder ser recebida pelo servidor.

            const req = await fetch('http://localhost:3000/burgers', {   //requisição para inserir o novo burger no array "burgers" do arquivo db.json
                method: 'POST', //define o metodo HTTP usado. POST normalmente é usado para enviar dados para o servidor.
                headers: { 'Content-Type': 'application/json'}, //informa ao servidor o tipo de dado que será recebido, neste caso, formato JSON.
                body: dataJson // envia os dados da variável dataJson, criada acima, como corpo do conteúdo
            }); 

            const res = await req.json();

            //mensagem de pedido feito com sucesso!
                this.msg = 'Order successful! Please wait to collect it!'
            //limpar mensagem da tela
                setTimeout(() => this.msg = '', 5000);
            //limpando os campos do form depois de submeter o pedido.
            this.name = '';
            this.meat = '';
            this.bread = '';
            this.extras = '';
        },
    },

    mounted(){
        this.getIngredients()
    },

    components: {
        Message
    }
}
</script>








<style scoped>

#form-container{
    margin: 2.5em 1em 5em 1em;
}
#burger-form{
    max-width: 500px;
    margin: 0 auto;
}

.input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label{
    font-weight: bold;
    margin-bottom: 15px;
    color: #222;
    padding: 5px 10px;
    border-left: 4px solid #FCBA03;
}

input, select {
    padding: 10px 10px;
    width: 100%;
}

#extras-container{
    flex-direction: row;
    flex-wrap: wrap;
}

#extras-title{
    width: 100%;
}

.checkbox-container{
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span{
    margin-left: 6px;
}

.submit-btn{
    background-color: #222;
    color: #FCBA03;
    font-weight: bold;
    border: 2px solid #222;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin: 0;
    cursor: pointer;
    transition: .5s;
}

.submit-btn:hover{
    background-color: transparent;
    color: #222;
}



/*MOBILE VERSION*/
@media (max-width: 700px) {

    #burger-form{
    width: 100%;
    margin: 0 auto;
}

.input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

input, select {
    width: 100%;
}

.checkbox-container span,
.checkbox-container input {
    width: auto;
}

.checkbox-container span{
    margin-left: 10px;
}

}


</style>