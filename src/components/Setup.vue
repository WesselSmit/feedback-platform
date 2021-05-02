<template>
  <Menu :hasBack="true" :hasLogout="false" />

  visualisation: {{ this.$store.getters['setup/visualisation'] ? this.$store.getters['setup/visualisation'] : 'null' }} <br>
  explanation: {{ this.$store.getters['setup/explanation'] ? this.$store.getters['setup/explanation'] : 'null' }} <br>
  questions: {{ this.$store.getters['setup/questions'] }} <br>
  limits: {{ this.$store.getters['setup/limits'] }} <br>

  <section class="setup">
    <div class="setup__wrapper">
      <ProgressBar :total="totalSteps" :index="stepIndex" />

      <div class="setup__inner">
        <h1 v-if="title" class="setup__title">{{ title }} <span class="setup__required-indicator">{{ requiredLabel }}</span></h1>
        <p v-if="body" class="setup__body">{{ body }}</p>

        <ul v-if="tips">
          <li v-for="tip in tips" :key="tip">{{ tip }}</li>
        </ul>

        <component :is="component" :content="step" />
      </div>
    </div>
  </section>
</template>

<script>
import Menu from '@/components/Menu';
import ProgressBar from '@/components/ProgressBar';
import SetupUpload from '@/components/SetupUpload';
import SetupLongText from '@/components/SetupLongText';
import SetupQuestions from '@/components/SetupQuestions';
import SetupLimits from '@/components/SetupLimits';
import SetupIterations from '@/components/SetupIterations';

export default {
  name: 'Setup',
  props: ['content', 'stepIndex'],
  components: {
    Menu,
    ProgressBar,
    SetupUpload,
    SetupLongText,
    SetupQuestions,
    SetupLimits,
    SetupIterations,
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
    requiredLabel() {
      return this.step.required ? 'Required' : 'Optional';
    },
    body() {
      return this.step.body;
    },
    tips() {
      return this.step.tips;
    },
    component() {
      return this.step.component;
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

  &__required-indicator {
    margin-left: $space--xsm;
    font-size: $font-size--sm;
    color: $gray--dark;
  }

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
