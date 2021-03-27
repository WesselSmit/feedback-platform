<template>
  <section class="read-instructions" :class="{ 'read-instructions--collapsed': isCollapsed }">
    <div class="read-instructions__header" @click="handleClick($event)">
      <h1 v-if="title" class="read-instructions__header-title">{{ title }}</h1>
      <ToggleIcon class="read-instructions__header-toggle" />
    </div>

    <p v-if="body" class="read-instructions__body" :class="{ 'read-instructions__body--no-margin-bottom': !legend }">{{ body }}</p>

    <div v-show="!isCollapsed">
      <ul v-if="legend" class="read-instructions__legend">
        <li v-for="item in legend" :key="item" class="read-instructions__legend-label">
          <span class="read-instructions__legend-icon-container">
            <LimitIcon v-if="item.icon === 'limit'" class="read-instructions__legend-icon read-instructions__legend-icon--limit" />
            <QuestionIcon v-if="item.icon === 'question'" class="read-instructions__legend-icon read-instructions__legend-icon--question" />
          </span>
          {{ item.label }}
        </li>
      </ul>

      <ul v-if="legend" class="read-instructions__points">
        <li v-if="limits" class="read-instructions__points-label">
          <span class="read-instructions__points-icon-container">
            <LimitIcon class="read-instructions__points-icon read-instructions__points-icon--limit" />
          </span>
          {{ limits }}
        </li>
        <li v-for="question in questions" :key="question" class="read-instructions__points-label">
          <span class="read-instructions__points-icon-container">
            <QuestionIcon class="read-instructions__points-icon read-instructions__points-icon--question" />
          </span>
          {{ question }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import ToggleIcon from '@/assets/icons/ToggleIcon';
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionIcon';

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
    limits() {
      return this.legendData.limits;
    },
    questions() {
      return this.legendData.questions;
    },
  },
  methods: {
    handleClick(e) {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.read-instructions {
  border-bottom: 1px solid $gray--light;

  &--collapsed .read-instructions {
    &__header-toggle svg {
      transform: rotate(180deg);
    }

    &__body {
      margin-bottom: 0;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    &-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $space--md;
      width: $space--md;
      fill: $black;
      border: 1px solid transparent;
      border-radius: 5px;
      transition: all 500ms $ease;

      &:hover {
        background-color: $purple--opacity;
        fill: $purple;
      }

      svg {
        transform-origin: center;
        transition: all 500ms $ease;
      }
    }
  }

  &__inner {
    &--hide {
      display: none;
    }
  }

  &__body {
    &--no-margin-bottom {
      margin-bottom: 0;
    }
  }

  &__legend {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 10px;
    list-style: none;
    background-color: $gray--light-extra;
    border: 1px solid $gray--light-extra;
    border-radius: 5px;

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
    margin-left: 10px;

    &-label {
      display: flex;
      padding-left: 0;
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
        margin: 3px $space--sm 0 0;
      }
    }
  }
}
</style>
