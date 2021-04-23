<template>
  <div class="password-reset">
    <div class="password-reset__content">
      <div @click="$emit('close')" class="password-reset__close">X</div>
      <h3 class="password-reset__title">Reset Password</h3>

      <div>
        <p>Enter your email to reset your password</p>

        <form @submit.prevent>
          <input v-model.trim="email" type="email" placeholder="you@email.com" autocomplete="off" autofocus>
        </form>
        <button @click="resetUserPassword()" class="button">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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

</style>
