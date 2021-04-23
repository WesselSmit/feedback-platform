<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner" :class="{ 'sidebar__inner--centered': isCentered }">
      <transition name="slide-horizontal" mode="out-in">
        <div v-if="activeTab === 'give'" class="sidebar__inner-wrappers anim-side--left">
          <div v-for="(section, name) in sections" :key="section"
          class="sidebar__inner-wrapper" :class="{ 'sidebar__inner-wrapper--grow-bottom': name === 'feedbackInput' }">
            <InputInstructions v-if="name === 'inputInstructions'" :content="section" :hideDocumentation="hideDocumentation" class="sidebar__section sidebar__section--no-padding-vertical" />
            <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" :hideVisualisation="hideVisualisation" class="sidebar__section" />
            <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
            <FeedbackHelper v-if="name === 'feedbackHelper'" :content="section" class="sidebar__section" />
            <FeedbackInput v-if="name === 'feedbackInput'" :content="section" class="sidebar__section sidebar__section--no-padding-vertical" />
          </div>
        </div>

        <div v-else-if="activeTab === 'view'" class="sidebar__inner-wrapper anim-side--right">
          <div v-if="activeTab === 'view'" v-for="(section, name) in sections" :key="section" class="sidebar__inner-wrapper">
            <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="sidebar__section" />
            <FeedbackComments v-if="name === 'feedbackComments'" :content="section" class="sidebar__section sidebar__section--no-padding-horizontal" />
          </div>
        </div>
      </transition>

        <NavigationButtons v-if="navigation && isCentered && activeTab === 'give'" class="sidebar__navigation" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" />
      </div>

    <NavigationButtons v-if="navigation && !isCentered && activeTab === 'give'" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" />
  </section>
  <PopUp v-if="popUp && showPopUp" :content="popUp" />
</template>

//todo: sidebar tab transitie ziet er raar uit odmat de navgationButtons geen transitie hebben

<script>
import { mapGetters } from 'vuex';
import ProgressBar from '@/components/ProgressBar';
import Tabs from '@/components/Tabs';
import InputInstructions from '@/components/InputInstructions';
import ConfirmInstructions from '@/components/ConfirmInstructions';
import ReadInstructions from '@/components/ReadInstructions';
import FeedbackHelper from '@/components/FeedbackHelper';
import FeedbackInput from '@/components/FeedbackInput';
import NavigationButtons from '@/components/NavigationButtons';
import FeedbackComments from '@/components/FeedbackComments';
import PopUp from '@/components/PopUp';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
    Tabs,
    InputInstructions,
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
    hideDocumentation() {
      return this.step.hideDocumentation;
    },
    hideVisualisation() {
      return this.step.hideVisualisation;
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
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &--centered &-wrappers {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    &--centered .sidebar__navigation {
      flex-grow: 1;
    }

    &-wrappers {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
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
