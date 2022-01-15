<template>
 <div class="login-page">
  <div class="container min-100vh d-flex justify-content-center align-items-center">
   <div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
    <div class="card p-5 border-0 rounded-2 text-light">
     <div class="text-center mb-5">
      <h5>TO-DO-APP SYSTEM</h5>
     </div>
     <div class="mb-3">
      <label class="form-label">Email</label>
      <input v-model="data.email" type="email" class="form-control" autofocus />
     </div>
     <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="data.password" type="password" class="form-control" />
     </div>
     <div class="text-center mt-3">
      <button class="btn btn-primary px-5" @click="login">Login</button>
      <p class="mt-3">
       Not a member? <span><router-link to="/register" class="text-decoration-none text-light">Click here to register.</router-link></span>
      </p>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>
<script>
 import { mapActions } from 'vuex';
 export default {
  data() {
   return {
    data: {
     email: '',
     password: '',
    },
   };
  },
  methods: {
   ...mapActions('auth', ['login']),
   async login() {
    var validEmail = /^\S+@\S+\.\S+$/;
    if (this.data.email == '' && this.data.password == '') return this.$toast.info('Please fill out fields');
    if (this.data.email == '') return this.$toast.info('Email is required');
    if (this.data.password == '') return this.$toast.info('Password is required');
    if (this.data.email.match(validEmail)) {
     const res = await this.$store.dispatch('auth/login', this.data);
     if (res.status == 200) {
      this.$router.push('/admin');
     }
    } else {
     return this.$toast.info('Please use a valid email');
    }
   },
  },
 };
</script>
