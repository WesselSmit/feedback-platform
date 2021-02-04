<template>
  <section>
    <form @submit.prevent>
      <fieldset>
        <h1>Login</h1>

        <label for="loginEmail">Email</label>
        <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="loginEmail">

        <label for="loginPassword">Password</label>
        <input v-model.trim="loginForm.password" type="password" placeholder="******" id="loginPassword">

        <button @click="login()">Log In</button>
      </fieldset>
    </form>

    <form @submit.prevent>
      <fieldset>
        <h1>Sign up</h1>
        <div>
          <label for="signUpName">Name</label>
          <input v-model.trim="signUpForm.name" type="text" placeholder="John Doe" id="signUpName" />
        </div>
        <div>
          <label for="signUpEmail">Email</label>
          <input v-model.trim="signUpForm.email" type="text" placeholder="you@email.com" id="signUpEmail" />
        </div>
        <div>
          <label for="signUpPassword">Password</label>
          <input v-model.trim="signUpForm.password" type="password" placeholder="min length is 6" id="signUpPassword" />
        </div>
        <button @click="signup()" class="button">Sign Up</button>
      </fieldset>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    signup() {
      this.$store.dispatch('signUp', {
        email: this.signUpForm.email,
        password: this.signUpForm.password,
        name: this.signUpForm.name,
      });
    },
    login() {
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
