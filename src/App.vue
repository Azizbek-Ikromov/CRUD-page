<template>
  <todo></todo>
</template>

<script>
import todo from "./components/todo.vue";

export default {
  data() {
    return {
    };
  },
  name: "App",
  components: {
    todo,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
