<template>
  <section class="give-sidebar">
    <ProgressBar :total="totalSteps" :index="stepIndex" />

    <transition name="slide-horizontal" mode="out-in">
      <Tabs v-if="tabs" :tabs="tabs" class="anim-side--right" />
    </transition>

    <transition name="slide-horizontal" mode="out-in" @before-enter="beforeEnter()" @after-enter="afterEnter()">
      <div class="give-sidebar__transition-inner" :class="[{ 'give-sidebar__transition-inner--centered': isCentered }, animSideClass]" :key="stepIndex">

        <div class="give-sidebar__inner" :class="{ 'give-sidebar__inner--centered': isCentered }">
          <transition name="slide-horizontal" mode="out-in">
            <div v-if="activeTab === 'give'" class="give-sidebar__inner-wrappers anim-side--left">
              <div v-for="(section, name) in sections" :key="section"
              class="give-sidebar__inner-wrapper" :class="{ 'give-sidebar__inner-wrapper--grow-bottom': name === 'feedbackInput' }">
                <InputInstructions v-if="name === 'inputInstructions'" :content="section" :hideDocumentation="hideDocumentation" class="give-sidebar__section sidebar__section--no-padding-vertical" />
                <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" :hideVisualisation="hideVisualisation" class="give-sidebar__section" />
                <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="give-sidebar__section" />
                <FeedbackHelper v-if="name === 'feedbackHelper'" :content="section" class="give-sidebar__section" />
                <FeedbackInput v-if="name === 'feedbackInput'" :content="section" class="give-sidebar__section sidebar__section--no-padding-vertical" />
              </div>
            </div>

            <div v-else-if="activeTab === 'view'" class="give-sidebar__inner-wrappers anim-side--right">
              <div v-if="activeTab === 'view'" v-for="(section, name) in sections" :key="section" class="give-sidebar__inner-wrapper">
                <ReadInstructions v-if="name === 'readInstructions'" :content="section" :legendData="legendData" class="give-sidebar__section" />
                <FeedbackComments v-if="name === 'feedbackComments'" :content="section" class="give-sidebar__section give-sidebar__section--no-padding-horizontal" />
              </div>
            </div>
          </transition>

            <NavigationButtons v-if="navigation && isCentered && activeTab === 'give'" class="give-sidebar__navigation" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" @handleNav="setAnimSide" />
          </div>

        <transition name="slide-horizontal" mode="out-in">
          <NavigationButtons v-if="navigation && !isCentered && activeTab === 'give'" :buttons="navigation" :bigMarginTop="!hasFeedbackHelper" @handleNav="setAnimSide" />
        </transition>
      </div>
    </transition>
  </section>

  <PopUp v-if="popUp && showPopUp" :content="popUp" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  name: 'GiveSidebar',
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
  data() {
    return {
      animSide: '',
    };
  },
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
        limits: this.content.project.data.limits,
        questions: this.content.project.data.questions,
      };
    },
    totalSteps() {
      return this.content.sidebar.steps.length;
    },
    tabs() {
      return this.step.isCentered ? null : this.content.sidebar.tabs;
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
    animSideClass() {
      return this.animSide ? `anim-side--${this.animSide}` : '';
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateActiveTab: 'updateActiveTab',
    }),
    setAnimSide(action) {
      // set animSide (used in leave transition)
      if (action === 'previousStep') {
        this.animSide = 'right';
      } else if (action === 'nextStep' || action === 'saveInsights') {
        this.animSide = 'left';
      }
    },
    beforeEnter() { // reverse animSide after the leave transition but before the enter transition
      if (this.animSide === 'left') {
        this.animSide = 'right';
      } else if (this.animSide === 'right') {
        this.animSide = 'left';
      }
    },
    afterEnter() { // rest animSide when transition is done
      this.animSide = '';
    },
  },
  created() {
    this.updateActiveTab('give');
  },
};
</script>

<style lang="scss">
@import "@/styles";

.give-sidebar {
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  max-height: 100vh;
  border-left: $border--ui;

  &__transition-inner {
    min-height: calc(100vh - #{$space--xsm} - (#{$progressbar-height} + #{$tabs-height}));
    display: flex;
    flex-direction: column;

    &--centered {
      display: flex;
      flex-grow: 1;
      min-height: calc(100vh - #{$progressbar-height});
    }
  }

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

    &--centered .give-sidebar__navigation {
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
