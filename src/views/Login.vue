<template>
  <section>

    <h1 v-if="this.error">{{ this.error.message }}</h1>

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

            <label for="signUpGroup">I'm part of group</label>
            <select v-model="signUpForm.group" id="signUpGroup">
              <option v-for="group in groupNames" :key="group" :value="group">{{ group }}</option>
            </select>

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
import { mapGetters, mapActions } from 'vuex';
import { groupsRef } from '@/firebase';

// TODO: verplaats de code in mounted naar de groupStore
// TODO: voeg gebruiker toe in firestore group (in een array met uid's + namen van alle users die onderdeel zijn)
// TODO: make login + signUp separate components
// TODO: login moet overal logIn worden
// TODO: maybe move some of the action logic to methods (because they are only used in this component) (like it is done in PasswordReset.vue)

export default {
  components: {
    PasswordReset,
  },
  data() {
    return {
      groupNames: [],
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
    ...mapGetters('group', { groups: 'groups' }),
    ...mapGetters('user', {
      user: 'user', // TODO: test of user wel gebruikt word of dat hij weg kan
      error: 'error',
    }),
  },
  methods: {
    ...mapActions('group', {
      getGroups: 'getGroups',
    }),
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
  async mounted() {
    const snapshot = await groupsRef.get();
    const groupNames = snapshot.docs.map((doc) => doc.id);
    this.groupNames = groupNames;
  },
};
</script>

<style lang="scss">

</style>
