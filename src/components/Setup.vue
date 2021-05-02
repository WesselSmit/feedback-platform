<template>
  <Menu :hasBack="true" :hasLogout="false" />

  <section class="setup">
    <div class="setup__wrapper">
      <ProgressBar :total="totalSteps" :index="stepIndex" />

      <div class="setup__inner">
        <h1 v-if="title" class="setup__title">{{ title }}</h1>
        <p v-if="body" class="setup__body">{{ body }}</p>

        <ul v-if="tips">
          <li v-for="tip in tips" :key="tip">{{ tip }}</li>
        </ul>

        <NavigationButtons :buttons="navigation" bigMarginTop="true" />
      </div>
    </div>
  </section>
</template>

<script>
import Menu from '@/components/Menu';
import ProgressBar from '@/components/ProgressBar';
import NavigationButtons from '@/components/NavigationButtons';

export default {
  name: 'Setup',
  props: ['content', 'stepIndex'],
  components: {
    Menu,
    ProgressBar,
    NavigationButtons,
  },
  computed: {
    totalSteps() {
      return this.content.steps.length;
    },
    step() {
      return this.content.steps[this.stepIndex - 1];
    },
    title() {
      return this.step.title;
    },
    body() {
      return this.step.body;
    },
    tips() {
      return this.step.tips;
    },
    navigation() {
      return this.step.navigation;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup {
  display: grid;
  place-items: center;
  height: calc(100vh - (#{$space--xl} * 2));

  &__wrapper {
    overflow: hidden;
    width: $popup-width--large;
    border: $border--ui;
    border-radius: $border-radius;
  }

  &__inner {
    padding: $space--sm-md;
  }
}
</style>
