<template>
  <section class="feedback-tips">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>
      <ul v-if="tips">
        <li v-for="tip in tips" :key="tip">{{ tip }}</li>
      </ul>
  </section>
</template>

<script>
export default {
  name: 'FeedbackTips',
  props: ['content'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    tips() {
      return this.content.tips;
    },
  },
};
</script>

<style lang="scss">

</style>
