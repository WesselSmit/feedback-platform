<template>
  <section class="login-container">
    <form v-if="!showPasswordReset && showLoginForm" @submit.prevent class="login">
      <fieldset class="login__inner">
        <h1 class="login__title">Login</h1>

        <label for="loginEmail">Email</label>
        <input class="login__input" v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="loginEmail" autocomplete="off" autofocus>

        <label for="loginPassword">Password</label>
        <input class="login__input" v-model.trim="loginForm.password" type="password" placeholder="******" id="loginPassword">

        <p class="login__reset" @click="togglePasswordReset()">Forgot password</p>

        <div class="login__buttons">
          <button type="submit" class="login__button login__button--outline" @click="handleLogin()">Log In</button>
          <button class="login__button" @click="toggleForm()">Sign Up</button>
        </div>
      </fieldset>
    </form>

    <SignUp v-if="!showPasswordReset && !showLoginForm" @handleToggleForm="toggleForm()" />
    <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()" />
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
      this.login(this.loginForm);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.login {
  padding: $space--sm-md;
  width: $popup-width--small;
  background: $white;
  border: $border--ui;
  border-radius: $border-radius;

  &-container {
    display: grid;
    place-items: center;
    height: 100vh;
    width: 100vw;
  }

  &__inner {
    display: flex;
    flex-direction: column;
  }

  &__title {
    margin-bottom: $space--md;
  }

  &__input {
    margin-bottom: $space--xsm;

    &:not(:last-of-type) {
      margin-bottom: $space--md;
    }
  }

  &__reset {
    margin: 0 0 0 auto;
    color: $black;
    font-size: $font-size--sm-md;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      color: $purple;
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
