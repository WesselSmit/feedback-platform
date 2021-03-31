<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner" :class="{ 'sidebar__inner--centered': isCentered }">
      <div v-if="activeTab === 'give'" v-for="(section, name) in sections" :key="section"
      class="sidebar__inner-wrapper" :class="{ 'sidebar__inner-wrapper--grow-bottom': name === 'feedbackInput' }">
        <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" class="sidebar__section" />
        <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
        <FeedbackHelper v-if="name === 'feedbackHelper'" :content="section" class="sidebar__section" />
        <FeedbackInput v-if="name === 'feedbackInput'" :content="section" class="sidebar__section sidebar__section--no-padding-vertical" />
      </div>

      <div v-else-if="activeTab === 'view'" class="sidebar__inner-wrapper">
        <div v-if="activeTab === 'view'" v-for="(section, name) in sections" :key="section" class="sidebar__inner-wrapper">
          <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
          <FeedbackComments v-if="name === 'feedbackComments'" :content="section" class="sidebar__section sidebar__section--no-padding-horizontal" />
        </div>
      </div>

      <NavigationButtons v-if="navigation && isCentered && activeTab === 'give'" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" />
    </div>

    <NavigationButtons v-if="navigation && !isCentered && activeTab === 'give'" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" />
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
import FeedbackComments from './FeedbackComments';
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
    FeedbackComments,
    PopUp,
  },
  props: ['content', 'stepIndex'],
  computed: {
    ...mapGetters('sidebar', {
      showPopUp: 'showPopUp',
      activeTab: 'activeTab',
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
      return (this.activeTab === 'give') ? this.step.content : this.content.sidebar.viewFeedbackSections;
    },
    isCentered() {
      return this.step.isCentered;
    },
    navigation() {
      return this.step.navigation;
    },
    hasFeedbackHelper() {
      return Object.keys(this.sections).includes('feedbackHelper');
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";

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

    &--no-padding-horizontal {
      padding: $space--sm-md 0;
    }
  }
}
</style>

//todo: zorg dat je de feedback frenzy hebt voorbereid met een presentatie/miro-board (lees mail Deanna)
//todo: zie todo's in alle marker gerelateerde components
//todo: feedback foto's
//todo: feedback vergelijken
