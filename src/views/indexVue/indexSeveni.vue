<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "indexSeveni",
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
