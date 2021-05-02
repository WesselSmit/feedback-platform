<template>
  <section class="setup-long-text">
    <textarea rows="6" placeholder="Describe what your data visualisation is about" v-model.trim="explanation" class="setup-long-text__input"></textarea>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SetupLongText',
  computed: {
    explanation: {
      get() {
        return this.$store.getters['setup/explanation'];
      },
      set(value) {
        this.updateExplanation(value);
      },
    },
  },
  methods: {
    ...mapActions('setup', {
      updateExplanation: 'updateExplanation',
    }),
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup-long-text {
  &__input {
    width: 100%;
    padding: $space--xsm;
    border: 1px solid $black;
    border-radius: $border-radius;
  }
}
</style>
