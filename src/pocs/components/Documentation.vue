<template>
  <section class="documentation">
    <Menu />

    <div class="documentation__inner">
      <h1>{{ title }}</h1>

      <h2 class="documentation__subheading">Explanation</h2>
      <p>{{ explanation }}</p>

      <h2 class="documentation__subheading">Feedback questions</h2>
      <ul>
        <li v-for="(question, index) in questions" :key="index">{{ question }}</li>
      </ul>

      <h2 class="documentation__subheading">Feedback limits</h2>
      <p>{{ limits }}</p>
    </div>

    <Visualisation :title="title" :visualisation="visualisation" />
  </section>
</template>

<script>
import Menu from './Menu';
import Visualisation from './Visualisation';

export default {
  name: 'Documentation',
  components: {
    Menu,
    Visualisation,
  },
  props: ['content'],
  computed: {
    title() {
      return this.content.title;
    },
    explanation() {
      return this.content.explanation;
    },
    questions() {
      return this.content.questions;
    },
    limits() {
      return this.content.limits;
    },
    visualisation() {
      return this.content.visualisation;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.documentation {
  min-height: 100vh;

  &__inner {
    margin: 0 auto;
    max-width: $documentation-width;
  }

  &__subheading {
    &:not(:first-of-type) {
      margin-top: $size--lg;
    }
  }
}
</style>
