<template>
  <section class="documentation">
    <Menu />

    <div class="documentation__inner" :class="{ 'documentation__inner--centered': !showVisualisation }">
      <h1>{{ title }}</h1>

      <h3 class="documentation__subheading">{{ explanationHeading }}</h3>
      <p>{{ explanation }}</p>

      <h3 class="documentation__subheading">{{ questionsHeading }}</h3>
      <ul class="documentation__question-list">
        <li v-for="(question, index) in questions" :key="index" class="documentation__question">
        <span class="documentation__icon-container">
          <QuestionIcon class="documentation__icon documentation__icon--question" />
        </span>
        {{ question }}</li>
      </ul>

      <h3 class="documentation__subheading">{{ limitsHeading }}</h3>
      <p class="documentation__limits">
        <span class="documentation__icon-container">
          <LimitIcon class="documentation__icon documentation__icon--limit" />
        </span>
        {{ limits }}
      </p>
    </div>

    <Visualisation v-if="showVisualisation" :title="title" :visualisation="visualisation" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('sidebar', {
      showVisualisation: 'showVisualisation',
    }),
    title() {
      return this.content.title;
    },
    explanationHeading() {
      return this.content.explanationHeading;
    },
    explanation() {
      return this.content.explanation;
    },
    questionsHeading() {
      return this.content.questionsHeading;
    },
    questions() {
      return this.content.questions;
    },
    limitsHeading() {
      return this.content.limitsHeading;
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

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: calc(#{$space--xl / 2});
      height: calc(100% - #{$space--xl});
    }
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
