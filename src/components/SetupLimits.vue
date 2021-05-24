<template>
  <section class="setup-limits">
    <input type="text" placeholder="e.g. The text still needs to be translated to English" v-model.trim="limits" class="setup-limits__input">
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SetupLimits',
  computed: {
    limits: {
      get() {
        return this.$store.getters['setup/limits'];
      },
      set(value) {
        this.updateLimits(value);
      },
    },
  },
  methods: {
    ...mapActions('setup', {
      updateLimits: 'updateLimits',
    }),
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup-limits {
  &__input {
    width: 100%;
    padding: $space--xsm;
    border: 1px solid $black;
    border-radius: $border-radius;
  }
}
</style>
