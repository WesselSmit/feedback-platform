<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="this.stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner" :class="{ 'sidebar__inner--centered': isCentered }">
      <div v-for="(section, name) in sections" :key="section">
        <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" class="sidebar__section" />
        <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
        <FeedbackHelper v-if="name === 'feedbackHelper'" :content="section" class="sidebar__section" />
      </div>

      <NavigationButtons v-if="navigation && isCentered" :buttons="navigation" />
    </div>

    <NavigationButtons v-if="navigation && !isCentered" :buttons="navigation" />
  </section>
</template>

<script>
import ProgressBar from './ProgressBar';
import Tabs from './Tabs';
import ConfirmInstructions from './ConfirmInstructions';
import ReadInstructions from './ReadInstructions';
import FeedbackHelper from './FeedbackHelper';
import NavigationButtons from './NavigationButtons';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
    Tabs,
    ConfirmInstructions,
    ReadInstructions,
    FeedbackHelper,
    NavigationButtons,
  },
  props: ['content', 'stepIndex'],
  computed: {
    step() {
      return this.content.sidebar.steps[this.stepIndex - 1];
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
  border-left: 1px solid $gray--light;

  &__inner {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &__section {
    padding: $space--sm-md;
  }
}
</style>

//todo: overlay/pop-up moet niet een aparte stap zijn maar moet een pop-up property op de step zijn
//todo: de headings moeten een zwaarder font hebben
