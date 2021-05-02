<template>
  <section class="setup-long-text">
    <textarea rows="6" placeholder="TODO" v-model.trim="explanation" class="setup-long-text__input"></textarea>
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

}
</style>
