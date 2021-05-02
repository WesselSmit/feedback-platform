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

        <component :is="component" :content="step" class="setup__input" />

      <div class="setup__buttons">
        <button v-for="(button, name) in navigation" :key="name" class="setup__button" :class="{ 'setup__button--outline': button.hasOutline, 'setup__button--disabled': showDisabledState(button.hasDisabled)}"
          @click="handleNavigationButton(button)">
          {{ button.label }}
        </button>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
    ...mapGetters('setup', {
      visualisation: 'visualisation',
      explanation: 'explanation',
      questions: 'questions',
      limits: 'limits',
    }),
    totalSteps() {
      return this.content.steps.length;
    },
    step() {
      return this.content.steps[this.stepIndex - 1];
    },
    title() {
      return this.step.title;
    },
    isRequired() {
      return this.step.required;
    },
    requiredLabel() {
      return this.isRequired ? 'Required' : 'Optional';
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
  methods: {
    ...mapActions('project', {
      updateProgress: 'updateProgress',
      updateSetupProp: 'updateSetupProp',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    showDisabledState(hasDisabled) {
      if (!hasDisabled || !this.isRequired) return false;

      switch (this.component) {
        case 'SetupUpload':
          return !this.visualisation;
        case 'SetupLongText':
          return !this.explanation;
        case 'SetupQuestions':
          return !this.questions.length > 0;
        case 'SetupLimits':
          return !this.limits.length > 0;
        case 'SetupIterations':
          return; // todo
        default:
          console.error('Unhandled button disabled state case');
          break;
      }
    },
    handleNavigationButton({ action, hasDisabled }) {
      if (!this.showDisabledState(hasDisabled)) {
        if (action.hasOwnProperty('target')) {
          this.$router.push({ path: `/${action.target}` });
        } else if (action === 'previousStep' || action === 'nextStep') {
          this.updateProgress(action);

          switch (this.component) {
            case 'SetupUpload':
              this.updateSetupProp('visualisation');
              break;
            case 'SetupLongText':
              this.updateSetupProp('explanation');
              break;
            case 'SetupQuestions':
              this.updateSetupProp('questions');
              break;
            case 'SetupLimits':
              this.updateSetupProp('limits');
              break;
            case 'SetupIterations':
              break; // todo
            default:
              console.error('Unhandled case');
              break;
          }
        }
      } else if (action === 'nextStep') {
        this.message({ message: 'Input required', mode: 'error' });
      }
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

  &__input {
    margin-top: $space--md;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    margin: $space--lg 0 0;
  }

  &__button {
    height: $button-height;
    width: $button-width;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: $border-radius;
    transition: all 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: $border--button;
    }

    &--disabled {
      color: $gray--dark;
      border-color: $gray--dark-opacity;
      cursor: default;

      &:hover {
        background-color: $white;
      }
    }
  }
}
</style>
