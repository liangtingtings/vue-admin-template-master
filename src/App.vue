<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  // mounted() {
  //   this.$router.beforeEach((to, from, next) => {
  //     if (sessionStorage.getItem("loginState")) {
  //       next();
  //     } else {
  //       next("/login");
  //     }
  //   });
  // },
};
</script>
