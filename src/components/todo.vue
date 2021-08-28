<template>
<Convert></Convert>
  <head>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
  </head>
  <div class="container">
    <div class="header">
      <h3>CRUD page to check the work!</h3>
    </div>
      <form class="inputs" @submit.prevent="createPost">
        <div class="inputsBlog">
          <select v-model="formData.product_type_id" @change="changeValue">
            <option disabled value="">{{this.selected}}</option>
            <option v-for="pType in pTypes" :key="pType.id" :value="pType.id" >{{pType.name_uz}}</option>
          </select>
          <input type="text" placeholder="Enter product name" id="name_uz" v-model="formData.name_uz"/>
          <button class="editBTN" v-on:click="updateProduct(this.id)" type="button" >Edit</button>
        </div>
        <div class="inputsBlog">
          <input type="number" placeholder="Enter product cost" id="cost" v-model="formData.cost"/>
          <input type="text" placeholder="Enter product address" id="address" v-model="formData.address" />
          <button type="onsubmit">Submit</button>
        </div>
      </form>
    <div class="table-todo">
      <table className="lead-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Cost</th>
            <th>Type ID</th>
            <th>Address</th>
            <th>Date</th>
            <th>Up - Dell</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="product.id">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ product.name_uz }}</td>
            <td>{{ product.cost }}$</td>
            <td>{{ product.product_type_id }}</td>
            <td>{{ product.address }}</td>
            <td>{{ product.created_date }}</td>
            <!-- <td><Convert timestamp={product.created_date}></Convert></td> buni Konvertatsiya qila olmadim! -->
            <td>
              <i class="fas fa-edit" v-on:click="getInputData(product.id, product.product_type_id, product.name_uz, product.cost, product.address, product.created_date)"></i>
              <i class="fas fa-trash-alt" v-on:click="deleteProduct(product.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Convert from "./toTime.js";

export default {
  name: "todo",
  props: {
    msg: String,
  },
  data() {
    const date = Date();
    const unix_time = Date.parse(date);
    const createDate = unix_time / 1000;

    return {
      products: [],
      pTypes: [],
      id: "",
      selected: "Select your product type",
      formData: {
        product_type_id: "",
        name_uz: "",
        cost: "",
        address: "",
        created_date: createDate,
      },
    };
  },
  comments: {
    'Convert': Convert
  },
  methods: {
    async getAllData() {
      await axios.get("http://94.158.54.194:9092/api/product")
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    changeValue(e) {
      this.formData.product_type_id = e.target.value;
      // console.log(e.target.value, "Ahmoq!");
    },

    async getTypeData() {
      await axios.get("http://94.158.54.194:9092/api/product/get-product-types")
        .then((res) => {
          this.pTypes = res.data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    async createPost() {
      await axios.post("http://94.158.54.194:9092/api/product", this.formData)
        .then(() => {
          this.getAllData();
        })
        .catch(err => {
          console.error(err.message);
        });
    },
    async deleteProduct(id) {
      await axios.delete("http://94.158.54.194:9092/api/product/"+id)
        .then(() => {
          this.getAllData();
        })
        .catch((err) => {
          console.error(err.message);
        })
    },
    async updateProduct(id) {
      let newOBJ = {...this.formData, ...{id:id}}
      await axios.put("http://94.158.54.194:9092/api/product", newOBJ)
        .then(() => {
          this.getAllData();
          this.getInputData("", "", "", "", "");
        })
        .catch(err => {
          console.error(err);
        })
    },

    async getInputData(id, p, n, c, a) {
      this.formData.product_type_id = p;
      this.formData.name_uz = n;
      this.formData.cost = c;
      this.formData.address = a;
      this.id = id;
    }
  },
  mounted() {
    this.getAllData();
    this.getTypeData();
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #004156;
}

.header {
  width: 85%;
  height: 6vh;
  margin-top: 1%;
  padding-left: 1%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -moz-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
}
.inputs {
  width: 85%;
  height: 15vh;
  margin-top: 1%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -moz-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
}

.inputsBlog {
  display: flex;
  justify-content: space-around;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input, select {
  width: 30%;
  height: 4.5vh;
  font-size: 16px;
  outline: none;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #17f1d7;
}

button {
  width: 30%;
  height: 4.5vh;
  outline: none;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #48cfaf;
}
.editBTN {
  color: #000;
  background-color: #ffc107;
  border-color: #ffc107;
}

i {
  font-size: 20px;
  margin-left: 3%;
  cursor: pointer;
}
.fa-edit {
  color: #ffc107;
}
.fa-trash-alt {
  color: #ff756b
}


.table-todo {
  width: 85%;
  height: auto;
  margin-top: 1%;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -webkit-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
  -moz-box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.63);
}

* {
  font-family: sans-serif; /* Change your font family */
}
.lead-table {
  min-width: 100%;
  font-size: 0.8em;
  overflow: hidden;
  border-collapse: collapse;
  border-radius: 5px 5px 0 0;
}
.lead-table thead tr {
  height: 5.6vh;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  color: #fff;
  background-color: #48cfaf;
}
.lead-table th,
.lead-table td {
  padding: 8px 10px;
}
.lead-table tbody tr {
  height: 5vh;
  border-bottom: 1px solid #dddddd;
}
.lead-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
.lead-table tbody tr:last-of-type {
  border-bottom: 2px solid #48cfaf;
}
.lead-table tbody tr:hover {
  color: #009879;
}
</style>