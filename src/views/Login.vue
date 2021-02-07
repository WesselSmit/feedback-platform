<template>
  <section>

    <!-- <h1 v-if="error.message">{{ error.message }}</h1> -->

    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>

    <div v-if="!showPasswordReset" :class="{ 'login-form': showLoginForm }">
      <form v-if="showLoginForm" @submit.prevent>
        <fieldset>
          <h1>Login</h1>

          <label for="loginEmail">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="loginEmail">

          <label for="loginPassword">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="******" id="loginPassword">

          <a @click="togglePasswordReset()">Forgot password</a>

          <button @click="login()">Log In</button>
          <button @click="toggleForm()">Create an account</button>
        </fieldset>
      </form>

      <form v-else @submit.prevent>
        <fieldset>
          <h1>Sign up</h1>

            <label for="signUpName">Name</label>
            <input v-model.trim="signUpForm.name" type="text" placeholder="John Doe" id="signUpName" />

            <label for="signUpEmail">Email</label>
            <input v-model.trim="signUpForm.email" type="text" placeholder="you@email.com" id="signUpEmail" />

            <label for="signUpPassword">Password</label>
            <input v-model.trim="signUpForm.password" type="password" placeholder="min length is 6" id="signUpPassword" />

          <button @click="signup()" class="button">Sign Up</button>
          <button @click="toggleForm()">Go to login</button>
        </fieldset>
      </form>
    </div>

  </section>
</template>

<script>
import PasswordReset from '@/components/PasswordReset.vue';
// TODO: make login + signUp separate components
// TODO: split store code in modules (https://vuex.vuejs.org/guide/modules.html#module-local-state)
// TODO: use a Vuex library that persists across page loads
export default {
  components: {
    PasswordReset,
  },
  data() {
    return {
      showLoginForm: true,
      showPasswordReset: false,
      loginForm: {
        email: '',
        password: '',
      },
      signUpForm: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  // computed: {
  //   error() {
  //     return this.$store.getters.error;
  //   },
  // },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    signup() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn + handle errors in UI
      this.$store.dispatch('user/signUp', this.signUpForm);
    },
    login() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn + handle errors in UI
      this.$store.dispatch('user/login', this.loginForm);
    },
  },
};
</script>

<style lang="scss">

</style>
