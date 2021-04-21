<template>
  <section>

    <div v-if="!showPasswordReset">
      <form v-if="showLoginForm" @submit.prevent>
        <fieldset>
          <h1>Login</h1>

          <label for="loginEmail">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="loginEmail">

          <label for="loginPassword">Password</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="******" id="loginPassword">

          <a @click="togglePasswordReset()">Forgot password</a>

          <button @click="handleLogin()">Log In</button>
          <button @click="toggleForm()">Sign Up</button>
        </fieldset>
      </form>

      <SignUp v-else @handleToggleForm="toggleForm()" />
    </div>

    <PasswordReset v-else @close="togglePasswordReset()" />
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import SignUp from '@/components/SignUp';
import PasswordReset from '@/components/PasswordReset';

export default {
  components: {
    SignUp,
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
    };
  },
  methods: {
    ...mapActions('user', {
      login: 'login',
    }),
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    handleLogin() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn + handle errors (error messages) in UI
      this.login(this.loginForm);
    },
  },
};
</script>

<style lang="scss">

</style>
