<template>
  <section class="documentation">
    <div class="documentation__inner">
      <h1>{{ title }}</h1>

      <h2 class="documentation__subheading">Explanation</h2>
      <p>{{ explanation }}</p>

      <h2 class="documentation__subheading">Feedback direction</h2>
      <ul v-for="(direction, index) in feedbackDirections" :key="index">
        <li>{{ direction }}</li>
      </ul>

      <h2 class="documentation__subheading">Feedback scope</h2>
      <p>{{ feedbackScope }}</p>
    </div>

    <Visualisation :title="title" :visualisation="visualisation" />
  </section>
</template>

<script>
import Visualisation from '@/pocs/components/Visualisation';

export default {
  name: 'Documentation',
  components: {
    Visualisation,
  },
  props: ['documentation'],
  computed: {
    title() {
      return this.documentation.title;
    },
    explanation() {
      return this.documentation.explanation;
    },
    feedbackDirections() {
      return this.documentation.feedbackDirections;
    },
    feedbackScope() {
      return this.documentation.feedbackScope;
    },
    visualisation() {
      return this.documentation.visualisation;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.documentation {
  min-height: 100vh;

  &__inner {
    margin: $size--lg auto 0;
    max-width: $documentation-width;
  }

  &__subheading {
    &:not(:first-of-type) {
      margin-top: $size--lg;
    }
  }
}
</style>
