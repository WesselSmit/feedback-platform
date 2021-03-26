<template>
  <section class="confirm-instructions">
      <h1 v-if="title">{{ title }}</h1>
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
};
</script>

<style lang="scss">
</style>
