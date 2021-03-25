<template>
  <section class="documentation">
    <div class="documentation__inner">
      <h1>{{ title }}</h1>
      <p>{{ explanation }}</p>
      <!-- <ul v-for="(direction, index) in feedbackDirections" :key="index">
        <li>{{ direction }}</li>
      </ul>
      <h3>{{ feedbackScope }}</h3> -->
      <Visualisation :title="title" :visualisation="visualisation" />
    </div>
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
    width: 100%;
    margin: $margin--lg auto;
    max-width: 80%;
    background-color: orange;
  }
}
</style>
