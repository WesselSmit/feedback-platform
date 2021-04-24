<template>
  <form @submit.prevent class="sign-up">
    <fieldset class="sign-up__inner">
      <h1 class="sign-up__title">Sign up</h1>

      <label for="signUpName">Name</label>
      <input class="sign-up__input" v-model.trim="signUpForm.name" type="text" placeholder="John Doe" id="signUpName" autocomplete="off" autofocus>

      <label for="signUpGroup">I'm part of group</label>
      <select v-model="signUpForm.group" id="signUpGroup" class="sign-up__select">
        <option value="" disabled selected hidden>Select your group</option>
        <option v-for="group in groupNames" :key="group" :value="group">Group {{ group }}</option>
      </select>

      <label for="signUpEmail">Email</label>
      <input class="sign-up__input" v-model.trim="signUpForm.email" type="text" placeholder="jonh.doe@gmail.com" id="signUpEmail" autocomplete="off">

      <label for="signUpPassword">Password</label>
      <input class="sign-up__input" v-model.trim="signUpForm.password" type="password" placeholder="******" id="signUpPassword">

      <div class="sign-up__buttons">
        <button @click="handleSignup()" class="sign-up__button sign-up__button--outline">Sign Up</button>
        <button @click="toggleForm()" class="sign-up__button">Log in</button>
      </div>
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
@import '@/styles';

.sign-up {
  padding: $space--sm-md;
  width: $popup-width--small;
  background: $white;
  border: $border--ui;
  border-radius: $border-radius;

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: $space--md;
  }

  &__input {
    margin-bottom: $space--sm-md;
    transition: border-color 500ms $ease--fast;

    &:last-of-type {
      margin-bottom: 0;
    }

    &:hover,
    &:focus {
      border-color: $purple;
    }
  }

  &__select {
    position: relative;
    margin-bottom: $space--sm-md;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: all 500ms $ease--fast;

    &:hover,
    &:focus {
      color: $purple;
      border-color: $purple;
    }
  }

  &__buttons {
    display: flex;
    flex-direction: row-reverse; // reverse buttons instead of changing HTML layout to support 'submit' enter key
    justify-content: space-between;
  }

  &__button {
    display: block;
    margin: $space--lg 0 0 0;
    height: $button-height;
    width: $button-width;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: $border--button;
    }
  }
}
</style>
