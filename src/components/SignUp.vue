<template>
  <form @submit.prevent>
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
      <button @click="toggleForm()">Log in</button>
    </fieldset>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignUp',
  data() {
    return {
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
    }),
  },
  methods: {
    ...mapActions('group', {
      fetchGroups: 'fetchGroups',
    }),
    ...mapActions('user', {
      signUp: 'signUp',
    }),
    handleSignup() {
      this.signUp(this.signUpForm);
    },
    toggleForm() {
      this.$emit('handleToggleForm');
    },
  },
  created() {
    this.fetchGroups();
  },
};
</script>

<style lang="scss">

</style>
