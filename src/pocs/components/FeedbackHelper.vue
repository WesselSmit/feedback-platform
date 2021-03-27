<template>
  <section class="feedback-helper">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>

      <ul v-if="zeroTips" v-show="!isActive">
        <li v-for="tip in zeroTips" :key="tip">{{ tip }}</li>
      </ul>

      <ul v-if="interactiveTips" v-show="isActive">
        <li v-for="(tip, index) in interactiveTips" :key="tip" @click="handleClick(index)">
          {{ tip.heading }}
          <span v-show="activeTipIndex === index">{{ tip.detail }}</span>
        </li>
      </ul>
  </section>
</template>

<script>
export default {
  name: 'feedbackHelper',
  props: ['content'],
  data() {
    return {
      isActive: false,
      activeTipIndex: null,
    };
  },
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    zeroTips() {
      return this.content.tips.zero;
    },
    interactiveTips() {
      return this.content.tips.interactive;
    },
  },
  methods: {
    handleClick(index) {
      this.activeTipIndex = index;
      console.log(this.activeTipIndex);
    },
  },
};
</script>

<style lang="scss">

</style>
