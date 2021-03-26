<template>
  <section class="read-instructions">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>
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
  </section>
</template>

<script>
import LimitIcon from '@/assets/icons/LimitIcon';
import QuestionIcon from '@/assets/icons/QuestionIcon';

export default {
  name: 'ReadInstructions',
  props: ['content', 'legendData'],
  components: {
    LimitIcon,
    QuestionIcon,
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
};
</script>

<style lang="scss">
@import '@/styles';

.read-instructions {
  border-bottom: 1px solid $gray--light;

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

//todo: de icon + label kunnen weg in de js file als je ze vervangt met de documentation data
//todo: als er geen legenda/content na de body komt dan moet de body geen margin-bottom hebben
