<template>
  <section v-if="title" class="read-instructions" :class="{ 'read-instructions--has-legend': showLegend && hasLimits, 'read-instructions--collapsed': isCollapsed }">
    <div class="read-instructions__header" @click="handleClick()">
      <h1 class="read-instructions__header-title">{{ title }}</h1>
      <ToggleIcon v-if="showLegend && hasLimits" class="read-instructions__header-toggle" />
    </div>

    <p v-if="body" class="read-instructions__body" :class="{ 'read-instructions__body--no-margin-bottom': !legend }">{{ body }}</p>

    <div v-if="showLegend" class="read-instructions__reminders">
      <ul v-if="hasLimits" class="read-instructions__legend">
        <li v-for="item in legend" :key="item" class="read-instructions__legend-label">
          <span class="read-instructions__legend-icon-container">
            <QuestionIcon v-if="item.type === 'question'" class="read-instructions__legend-icon read-instructions__legend-icon--question" />
            <LimitIcon v-if="item.type === 'limit'" class="read-instructions__legend-icon read-instructions__legend-icon--limit" />
          </span>
          {{ item.label }}
        </li>
      </ul>

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
import ToggleIcon from '@/assets/icons/ToggleIcon';
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionMarkIcon';

export default {
  name: 'ReadInstructions',
  components: {
    ToggleIcon,
    LimitIcon,
    QuestionIcon,
  },
  props: ['content', 'legendData'],
  data() {
    return {
      isCollapsed: false,
    };
  },
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
    handleClick() {
      if (this.showLegend && this.hasLimits) {
        this.isCollapsed = !this.isCollapsed;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.read-instructions {
  border-bottom: $border--ui;

  &--collapsed & {
    &__header-toggle svg {
      transform: rotate(180deg);
    }

    &__body {
      margin-bottom: 0;
      transition: margin-bottom 100ms 350ms linear; // wait for max-height transition of next sibling to finish
    }

    &__reminders {
      max-height: 0;
      opacity: 0;
      transition: max-height 500ms ease, opacity 500ms $ease--fast;
    }
  }

  &--has-legend & {
    &__header {
      cursor: pointer;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;

    &-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $space--md;
      width: $space--md;
      fill: $black;
      border: 1px solid transparent;
      border-radius: $border-radius;
      transition: all 500ms $ease--fast;

      &:hover {
        background-color: $purple--opacity;
        fill: $purple;
      }

      svg {
        transform-origin: center;
        transition: all 500ms $ease--fast;
      }
    }
  }

  &__body {
    transition: margin-bottom 500ms ease;

    &:last-child {
      margin-bottom: 0;
    }

    &--no-margin-bottom {
      margin-bottom: 0;
    }
  }

  &__reminders {
    overflow: hidden;
    max-height: 500px;
    opacity: 1;
    transition: max-height 1500ms ease, opacity 1250ms $ease--fast;
  }

  &__legend {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 10px;
    list-style: none;
    background-color: $gray--light-extra;
    border: 1px solid transparent;
    border-radius: $border-radius;

    &-label {
      display: flex;
      align-items: center;
      margin: $space--xsm 0;
      padding-left: 0;

      &:not(:last-of-type) {
        margin-right: $space--md;
      }
    }

    &-icon {
      &--limit {
        fill: $red;
      }

      &--question {
        fill: $green;
      }

      &-container {
        display: flex;
        justify-content: center;
        width: 15px;
        margin-right: $space--sm;
      }
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
