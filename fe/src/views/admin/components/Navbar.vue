<template>
 <div>
  <nav class="navbar navbar-expand-lg navbar-light pt-4">
   <div class="container-fluid">
    <a class="navbar-brand" href="#">TO-DO-LIST CRUD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
      <li class="nav-item">
       <router-link class="nav-link" to="#" v-b-modal.modal-logout>Logout</router-link>
      </li>
     </ul>
    </div>
   </div>
  </nav>
  <b-modal id="modal-logout" hide-header-close centered title="Confirm Logout">
   <p class="my-4">Are you sure you want to logout?</p>
   <template #modal-footer="{ cancel }">
    <b-button size="sm" variant="danger" @click="cancel()"> Cancel </b-button>
    <b-button size="sm" variant="primary" @click="logout"> Yes, logout </b-button>
   </template>
  </b-modal>
 </div>
</template>

<script>
 import { mapActions } from 'vuex';
 export default {
  data() {
   return {};
  },
  computed: {
   getRoute: function () {
    return this.$route.path;
   },
  },
  methods: {
   ...mapActions('auth', ['logoutAcc']),
   async logout() {
    const res = await this.logoutAcc();
    if (res.status == 200) {
     this.$router.push('/');
    }
   },
  },
 };
</script>
