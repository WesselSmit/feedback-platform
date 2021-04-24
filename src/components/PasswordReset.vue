<template>
  <div class="password-reset">
    <div class="password-reset__inner">
      <h1 class="password-reset__title">Reset Password</h1>

      <div>
        <p class="password-reset__body">Enter your email to reset your password.</p>

        <form @submit.prevent>
          <label for="resetEmail">Email</label>
          <input class="password-reset__input" v-model.trim="email" type="email" placeholder="you@email.com" id="resetEmail" autocomplete="off" autofocus>
        </form>

        <div class="password-reset__buttons">
          <button @click="resetUserPassword()" class="password-reset__button password-reset__button--outline">Reset</button>
          <button @click="$emit('close')" class="password-reset__button password-reset__close">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: '',
    };
  },
  methods: {
    ...mapActions('user', {
      resetPassword: 'resetPassword',
    }),
    async resetUserPassword() {
      await this.resetPassword(this.email);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.password-reset {
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
    margin-bottom: $space--sm;
  }

  &__body {
    margin-bottom: $space--md;
  }

  &__input {
    transition: border-color 500ms $ease--fast;

    &:hover,
    &:focus {
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
