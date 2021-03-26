<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="this.stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner" :class="{ 'sidebar__inner--centered': isCentered }">
      <div v-for="(section, name) in sections" :key="section">
        <ConfirmInstructions v-if="name === 'confirmInstructions'" :content="section" />
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
import NavigationButtons from './NavigationButtons';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
    Tabs,
    ConfirmInstructions,
    NavigationButtons,
  },
  props: ['content', 'stepIndex'],
  computed: {
    step() {
      return this.content.steps[this.stepIndex - 1];
    },
    hasProgressBar() {
      return this.content.hasProgressBar;
    },
    totalSteps() {
      return this.content.steps.length;
    },
    tabs() {
      return this.step.tabs;
    },
    sections() {
      return this.step.content;
    },
    navigation() {
      return this.step.navigation;
    },
    isCentered() {
      return this.step.isCentered;
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
  border-left: 1px solid $gray--light;

  &__inner {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: $space--sm-md;

    &--centered {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>

//todo: overlay/pop-up moet niet een aparte stap zijn maar moet een pop-up property op de step zijn
