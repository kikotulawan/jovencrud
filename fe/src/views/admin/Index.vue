<template>
 <div>
  <div class="admin-panel">
   <div class="container main-content">
    <Navbar />
    <router-view name="adminMovies" />
   </div>
  </div>
 </div>
</template>
<script>
 import Navbar from './components/Navbar.vue';
 export default {
  components: { Navbar },
  created() {
   this.checkUserInfo();
  },
  methods: {
   async checkUserInfo() {
    await this.$store.dispatch('auth/checkUser');
   },
  },
 };
</script>
