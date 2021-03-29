<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner" :class="{ 'sidebar__inner--centered': isCentered }">
      <div v-for="(section, name) in sections" :key="section" :class="{ 'sidebar__inner-wrapper--grow-bottom': name === 'feedbackInput' }">
        <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" class="sidebar__section" />
        <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
        <FeedbackHelper v-if="name === 'feedbackHelper'" :content="section" class="sidebar__section" />
        <FeedbackInput v-if="name === 'feedbackInput'" :content="section" class="sidebar__section sidebar__section--no-padding-vertical" />
      </div>

      <NavigationButtons v-if="navigation && isCentered" :buttons="navigation" />
    </div>

    <NavigationButtons v-if="navigation && !isCentered" :buttons="navigation" />
  </section>
  <PopUp v-if="popUp && showPopUp" :content="popUp" />
</template>

<script>
import { mapGetters } from 'vuex';
import ProgressBar from './ProgressBar';
import Tabs from './Tabs';
import ConfirmInstructions from './ConfirmInstructions';
import ReadInstructions from './ReadInstructions';
import FeedbackHelper from './FeedbackHelper';
import FeedbackInput from './FeedbackInput';
import NavigationButtons from './NavigationButtons';
import PopUp from './PopUp';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
    Tabs,
    ConfirmInstructions,
    ReadInstructions,
    FeedbackHelper,
    FeedbackInput,
    NavigationButtons,
    PopUp,
  },
  props: ['content', 'stepIndex'],
  computed: {
    ...mapGetters('sidebar', {
      showPopUp: 'showPopUp',
    }),
    step() {
      return this.content.sidebar.steps[this.stepIndex - 1];
    },
    popUp() {
      return this.step.popUp;
    },
    legendData() {
      return {
        limits: this.content.documentation.limits,
        questions: this.content.documentation.questions,
      };
    },
    hasProgressBar() {
      return this.content.sidebar.hasProgressBar;
    },
    totalSteps() {
      return this.content.sidebar.steps.length;
    },
    tabs() {
      return this.step.tabs;
    },
    sections() {
      return this.step.content;
    },
    isCentered() {
      return this.step.isCentered;
    },
    navigation() {
      return this.step.navigation;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";

*::selection {
  background: none;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  min-height: 100vh;
  max-height: 100vh;
  border-left: $border--ui;

  &__inner {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-wrapper {
      &--grow-bottom {
        margin-top: auto;
      }
    }
  }

  &__section {
    padding: $space--sm-md;

    &--no-padding-vertical {
      padding: 0 $space--sm-md;
    }
  }
}
</style>

//? maandag
//todo: feedback van anderen in kunnen zien (feedback tab)
//todo: feedback markers

//? dinsdag
//todo: feedback foto's
//todo: feedback vergelijken
