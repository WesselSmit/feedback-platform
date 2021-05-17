<template>
  <section class="documentation" >
    <Menu :hasBack="true" :hasLogout="false" />

    <div v-if="!hideDocumentation" class="documentation__inner" :class="{ 'documentation__inner--centered': hideVisualisation }">
      <h1>{{ title }}</h1>

      <!-- <h3 class="documentation__subheading">{{ explanationHeading }}</h3> -->
      <p class="documentation__explanation">{{ explanation }}</p>

      <!-- <h3 class="documentation__subheading">{{ questionsHeading }}</h3>
      <ul class="documentation__question-list">
        <li v-for="(question, index) in questions" :key="index" class="documentation__question">
        <span class="documentation__icon-container">
          <QuestionIcon class="documentation__icon documentation__icon--question" />
        </span>
        {{ question }}
        </li>
      </ul>

      <h3 v-if="hasLimits" class="documentation__subheading">{{ limitsHeading }}</h3>
      <p v-if="hasLimits" class="documentation__limits">
        <span class="documentation__icon-container">
          <LimitIcon class="documentation__icon documentation__icon--limit" />
        </span>
        {{ limits }}
      </p> -->
    </div>

    <div :class="{ 'documentation__inner documentation__inner--centered': hideDocumentation }">
      <Visualisation v-if="!hideVisualisation" :class="{ 'no-documentation': hideDocumentation }" :title="title" :visualisation="visualisation" :pageMode="pageMode" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
// import LimitIcon from '@/assets/icons/LimitIcon';
// import QuestionIcon from '@/assets/icons/QuestionIcon';
import Menu from '@/components/Menu';
import Visualisation from '@/components/Visualisation';

export default {
  name: 'Documentation',
  components: {
    Menu,
    Visualisation,
    // LimitIcon,
    // QuestionIcon,
  },
  props: ['content', 'pageMode'],
  computed: {
    ...mapGetters('sidebar', {
      hideDocumentation: 'hideDocumentation',
      hideVisualisation: 'hideVisualisation',
    }),
    title() {
      return this.content.project.data.title;
    },
    // explanationHeading() {
    //   return this.content.documentation.explanationHeading;
    // },
    explanation() {
      return this.content.project.data.explanation;
    },
    // questionsHeading() {
    //   return this.content.documentation.questionsHeading;
    // },
    // questions() {
    //   return this.content.project.data.questions;
    // },
    // limitsHeading() {
    //   return this.content.documentation.limitsHeading;
    // },
    // hasLimits() {
    //   return this.limits.length > 0;
    // },
    // limits() {
    //   return this.content.project.data.limits;
    // },
    visualisation() {
      return this.content.project.data.visualisation;
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
      max-width: unset;
    }
  }

  &__subheading {
    &:not(:first-of-type) {
      margin-top: $space--lg;
    }
  }

  &__explanation {
    margin-bottom: 0;
  }

  // &__limits {
  //   display: flex;
  //   align-items: center;
  // }

  // &__question {
  //   display: flex;
  //   align-items: center;
  //   padding-left: 0;

  //   &-list {
  //     margin-left: 0;
  //     list-style: none;
  //   }
  // }

  // &__icon {
  //   &--limit {
  //     fill: $red;
  //   }

  //   &--question {
  //     fill: $green;
  //   }

  //   &-container {
  //     display: flex;
  //     align-items: center;
  //     width: 15px;
  //     margin: 0 $space--sm;
  //   }
  // }
}
</style>
