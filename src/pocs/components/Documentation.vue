<template>
  <section class="documentation">
    <Menu />

    <div class="documentation__inner">
      <h1>{{ title }}</h1>

      <h2 class="documentation__subheading">Explanation</h2>
      <p>{{ explanation }}</p>

      <h2 class="documentation__subheading">Do give feedback</h2>
      <ul class="documentation__question-list">
        <li v-for="(question, index) in questions" :key="index" class="documentation__question">
        <span class="documentation__icon-container">
          <QuestionIcon class="documentation__icon documentation__icon--question" />
        </span>
        {{ question }}</li>
      </ul>

      <h2 class="documentation__subheading">Don't give feedback</h2>
      <p class="documentation__limits">
        <span class="documentation__icon-container">
          <LimitIcon class="documentation__icon documentation__icon--limit" />
        </span>
        {{ limits }}
      </p>
    </div>

    <Visualisation :title="title" :visualisation="visualisation" />
  </section>
</template>

<script>
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionIcon';
import Menu from './Menu';
import Visualisation from './Visualisation';

export default {
  name: 'Documentation',
  components: {
    Menu,
    Visualisation,
    LimitIcon,
    QuestionIcon,
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
    padding: 0 $space--sm-md;
    max-width: calc(#{$documentation-width} - (2 * #{$space--sm-md}));
  }

  &__subheading {
    &:not(:first-of-type) {
      margin-top: $space--lg;
    }
  }

  &__limits {
    display: flex;
  }

  &__question {
    display: flex;
    padding-left: 0;

    &-list {
      margin-left: 0;
      list-style: none;
    }
  }

  &__icon {
      &--limit {
        fill: $red;
      }

      &--question {
        fill: $green;
      }

      &-container {
        display: flex;
        align-items: center;
        width: 15px;
        margin: 0 $space--sm;
      }
    }
}
</style>
