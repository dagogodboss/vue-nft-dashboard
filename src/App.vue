<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  created() {
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem("authenticated") == 'false') {
      this.$router.push("/login");
    }
    if(window.localStorage.getItem("autheticated") == undefined){
      this.$router.push("/login");
    }
    if ((currentPath === "/" || currentPath === "/app") && window.localStorage.getItem("authenticated") != 'false') {
      this.$router.push("/app/dashboard");
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
