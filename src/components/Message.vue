<template>
  <div class="message" :class="{ 'message--error': error, 'message--succes': succes }">
    {{ message.text }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Message',
  computed: {
    ...mapGetters('message', {
      message: 'message',
    }),
    error() {
      return this.message.mode === 'error';
    },
    succes() {
      return this.message.mode === 'succes';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.message {
  position: fixed;
  bottom: $space--sm-md;
  left: $space--sm-md;
  z-index: 100;
  padding: $space--sm;
  background-color: $gray--light-extra;
  border: 1px solid transparent;
  border-radius: $border-radius;
  color: $black;
  font-size: $font-size--md;
  cursor: default;

  &--error {
    background-color: $red--light;
    color: $red;
  }

  &--succes {
    background-color: $green--light;
    color: $green;
  }
}
</style>
