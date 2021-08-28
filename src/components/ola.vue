<template>
  <div>
    <form @submit.prevent="forPost">
      <input type="text" id="name_uz" v-model="formData.name_uz"/><br>
      <input type="number" id="cost" v-model="formData.cost"/><br>
      <input type="date" id="created_date" v-model="formData.created_date"/><br>
      <input type="text" id="address" v-model="formData.address"/><br>
      <input type="number" id="product_type_id" v-model="formData.product_type_id"/><br>
      <input type="submit" value="Qseee">
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    var myDate = "26-02-2012";
    myDate = myDate.split("-");
    var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
    var FullDate = (newDate.getTime());
    console.log(FullDate);

    return {
      formData: {
        name_uz: "",
        cost: "",
        address: "",
        product_type_id: "",
        created_date: "",
      },
    };
  },
  name: "App",
  methods: {
    forPost() {
      axios
        .post(`http://94.158.54.194:9092/api/product`, this.formData)
        .then((res) => {
          this.formData = res.data;
          // console.log(this.formData);
        })
        .catch((err) => {
          console.log(err.messages);
        });
    },
  },
};
</script>