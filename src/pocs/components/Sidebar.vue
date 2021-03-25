<template>
  <section class="sidebar">
    <ProgressBar v-if="hasProgressBar" :total="totalSteps" :index="this.stepIndex" />
  </section>
</template>

<script>
import ProgressBar from './ProgressBar';

export default {
  name: 'Sidebar',
  components: {
    ProgressBar,
  },
  props: ['content', 'stepIndex'],
  computed: {
    hasProgressBar() {
      return this.content.hasProgressBar;
    },
    totalSteps() {
      return this.content.steps.length;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";

.sidebar {
  position: fixed;
  right: 0;
  width: $sidebar-width;
  min-height: 100vh;
  padding: 0 $size--sm-md $size--sm-md;
  border-left: 1px solid $gray--light;
}
</style>
