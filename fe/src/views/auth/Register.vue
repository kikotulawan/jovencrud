<template>
 <div class="register-page">
  <div class="container py-5 min-100vh d-flex justify-content-center align-items-center">
   <div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5">
    <div class="card p-5 border-0 rounded-2 text-light">
     <div class="text-center mb-5">
      <h5>TO-DO-APP SYSTEM</h5>
     </div>
     <div class="mb-3">
      <label class="form-label">First Name</label>
      <input v-model="data.fname" type="text" class="form-control" />
     </div>
     <div class="mb-3">
      <label class="form-label">Last Name</label>
      <input v-model="data.lname" type="text" class="form-control" />
     </div>
     <div class="mb-3">
      <label class="form-label">Email address</label>
      <input v-model="data.email" type="email" class="form-control" />
     </div>
     <div class="mb-3">
      <label class="form-label">Password</label>
      <input v-model="data.password" type="password" class="form-control" />
     </div>
     <div class="text-center mt-3">
      <button class="btn btn-primary px-5" @click="register">Create Account</button>
      <p class="mt-3">
       Already a member? <span><router-link to="/" class="text-decoration-none text-white">Click here to sign-in.</router-link></span>
      </p>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>
<script>
 export default {
  data() {
   return {
    data: {
     fname: '',
     lname: '',
     email: '',
     password: '',
    },
   };
  },
  methods: {
   async register() {
    if (this.data.fname == '' && this.data.lname == '' && this.data.email == '' && this.data.password == '') return this.$toast.info('Please fill in all fields first');
    if (this.data.fname == '') return this.$toast.info('First name is required');
    if (this.data.lname == '') return this.$toast.info('Last name is required');
    if (this.data.email == '') return this.$toast.info('Email is required');
    if (this.data.password == '') return this.$toast.info('Password is required');

    const res = await this.$store.dispatch('auth/saveUser', this.data);
    if (res.status == 200) {
     this.$toast.success('Registered Successfully');
     this.$router.push('/');
    } else {
     this.$toast.error('Please try again later');
    }
   },
  },
 };
</script>
