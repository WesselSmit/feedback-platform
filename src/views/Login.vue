<template>
  <section>

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

          <button @click="handleLogin()">Log In</button>
          <button @click="toggleForm()">Create an account</button>
        </fieldset>
      </form>

      <form v-else @submit.prevent>
        <fieldset>
          <h1>Sign up</h1>

            <label for="signUpName">Name</label>
            <input v-model.trim="signUpForm.name" type="text" placeholder="John Doe" id="signUpName" />

            <label for="signUpGroup">I'm part of group</label>
            <select v-model="signUpForm.group" id="signUpGroup">
              <option v-for="group in groupNames" :key="group" :value="group">{{ group }}</option>
            </select>

            <label for="signUpEmail">Email</label>
            <input v-model.trim="signUpForm.email" type="text" placeholder="you@email.com" id="signUpEmail" />

            <label for="signUpPassword">Password</label>
            <input v-model.trim="signUpForm.password" type="password" placeholder="min length is 6" id="signUpPassword" />

          <button @click="handleSignup()" class="button">Sign Up</button>
          <button @click="toggleForm()">Go to login</button>
        </fieldset>
      </form>
    </div>

  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PasswordReset from '@/components/PasswordReset.vue';

// TODO: make login + signUp separate components
// TODO: login moet overal logIn worden
// TODO: maybe move some of the action logic to methods (because they are only used in this component) (like it is done in PasswordReset.vue)

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
        group: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters('group', {
      groupNames: 'groupNames',
      groupError: 'error',
    }),
  },
  methods: {
    ...mapActions('group', {
      fetchGroups: 'fetchGroups',
    }),
    ...mapActions('user', {
      signUp: 'signUp',
      login: 'login',
    }),
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset;
    },
    handleSignup() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn + handle errors (error messages) in UI
      this.signUp(this.signUpForm);
    },
    handleLogin() {
      // TODO voordat je de store code laat uitvoeren, check eerst of alle gegevens ingevuld zijn + handle errors (error messages) in UI
      this.login(this.loginForm);
    },
  },
  created() {
    this.fetchGroups();
  },
};
</script>

<style lang="scss">

</style>
