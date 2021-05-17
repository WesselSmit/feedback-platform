<template>
  <section v-if="title" class="read-instructions" :class="{ 'read-instructions--has-legend': showLegend && hasLimits }">
    <h1 v-if="title">{{ title }}</h1>

    <p v-if="body" class="read-instructions__body" :class="{ 'read-instructions__body--no-margin-bottom': !legend }">{{ body }}</p>

    <div v-if="showLegend">
      <ul v-if="legend" class="read-instructions__points">
        <li v-if="hasQuestions" v-for="(question, index) in questions" :key="question" class="read-instructions__points-label read-instructions__points-label--question">
          <span class="read-instructions__points-icon-container">
            <QuestionIcon class="read-instructions__points-icon read-instructions__points-icon--question" />
          </span>
          <span v-if="questions.length > 1" class="read-instructions__points-number">{{ index + 1 }}. </span>
          {{ question + punctuate(question) }}
        </li>
        <li v-if="showLimitsInLegend" class="read-instructions__points-label">
          <span class="read-instructions__points-icon-container">
            <LimitIcon class="read-instructions__points-icon read-instructions__points-icon--limit" />
          </span>
          {{ limits }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionMarkIcon';

export default {
  name: 'ReadInstructions',
  components: {
    LimitIcon,
    QuestionIcon,
  },
  props: ['content', 'legendData'],
  computed: {
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    legend() {
      return this.content.legend;
    },
    showLegend() {
      if (this.hasLimits) {
        return this.showLimitsInLegend;
      } if (this.hasQuestions) {
        return true;
      }
      return false;
    },
    limits() {
      return this.legendData.limits;
    },
    questions() {
      return this.legendData.questions;
    },
    hasQuestions() {
      return this.content?.legend?.some((item) => item.type === 'question');
    },
    hasLimits() {
      return this.content?.legend?.some((item) => item.type === 'limit');
    },
    showLimitsInLegend() {
      return this.hasLimits && this.limits.length > 0;
    },
  },
  methods: {
    punctuate(question) { // add a ? if the question doesn't end with one of the following characters: .,!?
      return question[question.length - 1].match(/^[.,!?]/) ? '' : '?';
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.read-instructions {
  border-bottom: $border--ui;

  &__body {
    transition: margin-bottom 500ms ease;

    &:last-child {
      margin-bottom: 0;
    }

    &--no-margin-bottom {
      margin-bottom: 0;
    }
  }

  &__points {
    list-style: none;
    margin-left: 0;

    &-label {
      display: flex;
      padding-left: $space--sm;

      &--question {
        padding-left: $space--xsm;
      }
    }

    &-icon {
      &--limit {
        fill: $red;
      }

      &--question {
        fill: $green;
        margin-left: $space--xsm;
      }

      &-container {
        display: flex;
        justify-content: flex-start;
        width: 15px;
        margin: 3px $space--sm 0 1px;
      }
    }

    &-number {
      margin-top: 4px;
      margin-right: $space--xsm;
      font-size: $font-size--sm;
      color: $gray--dark;
    }
  }
}
</style>
