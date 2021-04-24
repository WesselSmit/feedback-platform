<template>
  <section v-if="title" class="confirm-instructions">
      <h1>{{ title }}</h1>
      <p v-if="body">{{ body }}</p>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmInstructions',
  props: ['content', 'hideVisualisation'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateHideVisualisation: 'updateHideVisualisation',
    }),
  },
  created() {
    if (this.hideVisualisation) {
      this.updateHideVisualisation(true);
    }
  },
};
</script>

<style lang="scss">

</style>
