<template>
  <section v-if="title" class="confirm-instructions">
      <h1>{{ title }}</h1>
      <p v-if="body">{{ body }}</p>
  </section>
</template>

<script>
export default {
  name: 'ConfirmInstructions',
  props: ['content'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
  },
  created() {
    this.$store.dispatch('sidebar/updateShowVisualisation', false);
  },
};
</script>

<style lang="scss">

</style>
