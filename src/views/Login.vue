<template>
  <section>

    <h1 v-if="error.message">{{ error.message }}</h1>

    <div :class="{ 'login-form': showLoginForm }">
      <form v-if="showLoginForm" @submit.prevent>
        <fieldset>
          <h1>Login</h1>

          <label for="loginEmail">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="loginEmail">

          <label for="loginPassword">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="******" id="loginPassword">

          <button @click="login()">Log In</button>
          <button @click="toggleFormView()">Create an account</button>
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
          <button @click="toggleFormView()">Go to login</button>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showLoginForm: true,
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
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    toggleFormView() {
      this.showLoginForm = !this.showLoginForm;
    },
    signup() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn
      this.$store.dispatch('signUp', {
        email: this.signUpForm.email,
        password: this.signUpForm.password,
        name: this.signUpForm.name,
      });
    },
    login() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
  },
};
</script>

<style lang="scss">

</style>
