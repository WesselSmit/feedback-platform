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
          <button @click="toggleForm()">Create an account</button>
        </fieldset>
      </form>

      <Register v-else @handleToggleForm="toggleForm()" />
    </div>

    <PasswordReset v-else @close="togglePasswordReset()" />
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import Register from '@/components/Register';
import PasswordReset from '@/components/PasswordReset';

// TODO: login moet overal logIn worden
// TODO: maybe move some of the action logic to methods (because they are only used in this component) (like it is done in PasswordReset.vue)

export default {
  components: {
    Register,
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
