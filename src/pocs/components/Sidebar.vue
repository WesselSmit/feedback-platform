<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="this.stepIndex" />
    <Tabs v-if="tabs" :tabs="tabs" />

    <div class="sidebar__inner">
      <!-- TODO: hier komt de inhoud van de sidebar (instructies + feedback helper etc) -->
    </div>

    <ButtonBox v-if="navigation" :buttons="navigation" />
  </section>
</template>

<script>
import ProgressBar from './ProgressBar';
import Tabs from './Tabs';
import ButtonBox from './ButtonBox';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
    Tabs,
    ButtonBox,
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
    navigation() {
      return this.step.navigation;
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
  }
}
</style>
