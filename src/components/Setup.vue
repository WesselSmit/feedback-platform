<template>
  <Menu :hasBack="true" :hasLogout="false" />

  <section class="setup">
    <div class="setup__wrapper">
      <ProgressBar :total="totalSteps" :index="stepIndex" />

      <transition name="slide-horizontal" mode="out-in" @before-enter="beforeEnter()" @after-enter="afterEnter()">
        <div class="setup__inner" :class="animSideClass" :key="stepIndex">
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
      </transition>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '@/components/Menu';
import ProgressBar from '@/components/ProgressBar';
import SetupVisualisation from '@/components/SetupVisualisation';
import SetupLongText from '@/components/SetupLongText';
import SetupQuestions from '@/components/SetupQuestions';
import SetupLimits from '@/components/SetupLimits';
import { storageRef } from '@/firebase';
import { v4 as uuid } from 'uuid';

export default {
  name: 'Setup',
  props: ['content', 'stepIndex'],
  components: {
    Menu,
    ProgressBar,
    SetupVisualisation,
    SetupLongText,
    SetupQuestions,
    SetupLimits,
  },
  data() {
    return {
      uploading: false,
      animSide: '',
    };
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
    fileExtension() {
      const fileNameParts = this.visualisation.name.split('.');
      return fileNameParts[fileNameParts.length - 1];
    },
    isValidFile() {
      const allowedTypes = ['png', 'jpg', 'jpeg'];
      const maxBytes = 1024 * 1024 * 5;
      return allowedTypes.includes(this.fileExtension) && this.visualisation.size <= maxBytes;
    },
    animSideClass() {
      return this.animSide ? `anim-side--${this.animSide}` : '';
    },
  },
  methods: {
    ...mapActions('project', {
      updateProgress: 'updateProgress',
      updateSetupProp: 'updateSetupProp',
      updateVisualisation: 'updateVisualisation',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    showDisabledState(hasDisabled) {
      if (!hasDisabled || !this.isRequired) return false;

      switch (this.component) {
        case 'SetupVisualisation':
          return !this.visualisation;
        case 'SetupLongText':
          return !this.explanation;
        case 'SetupQuestions':
          return !this.questions.length > 0;
        case 'SetupLimits':
          return !this.limits.length > 0;
        default:
          console.error('Unhandled button disabled state case');
          break;
      }
    },
    handleNavigationButton({ action, hasDisabled }) {
      // set animSide (used in leave transition)
      if (action === 'previousStep') {
        this.animSide = 'right';
      } else if (action === 'nextStep' || action === 'saveSetup') {
        this.animSide = 'left';
      }

      if (!this.showDisabledState(hasDisabled)) {
        if (action.hasOwnProperty('target')) {
          this.$router.push({ path: `/${action.target}` });
        } else if (action === 'previousStep' || action === 'nextStep' || action === 'saveSetup') {
          if (action === 'nextStep' || action === 'saveSetup') {
            switch (this.component) {
              case 'SetupVisualisation':
                if (!this.uploading) { // because upload is async we need to prevent the user from performing the upload task multiple times (as this would also update the user's progress multilple times --> and thus skip setup steps)
                  this.uploading = true;
                  this.uploadVisualisation(action); // upload image + update progress if upload is succesful
                }
                break;
              case 'SetupLongText':
                this.updateSetupProp('explanation');
                this.updateProgress(action);
                break;
              case 'SetupQuestions':
                this.updateSetupProp('questions');
                this.updateProgress(action);
                break;
              case 'SetupLimits':
                this.updateSetupProp('limits');
                this.updateProgress(action);
                break;
              default:
                console.error('Unhandled case');
                break;
            }
          } else if (action === 'previousStep') {
            this.updateProgress('previousStep');
          }
        }
      } else if (action === 'nextStep') {
        this.message({ message: 'Input required', mode: 'error' });
      }
    },
    async uploadVisualisation(navigationAction) {
      // navigationAction is action that should be taken to update progress if upload is succesful
      if (this.visualisation) {
        if (typeof this.visualisation === 'string' || this.visualisation instanceof String) {
          /*
          this.visualisation can have two types of value:
          1. File (object) --> user has selected an file using the FilePicker or Drag and Drop
          2. String --> user navigated from next step back to this step
                this.visualisation holds the ID to the visualisation in the Firebase Storage

          Scenario 2 will result in an error when trying to upload since you need an File to upload,
          so when this.visualisation is a string we skip the upload step because the visualisation already exists in the DB
          */
          this.updateProgress(navigationAction);
          this.uploading = false;
        } else if (this.isValidFile) {
          try {
            const imageId = uuid();
            const upload = storageRef.child(`visualisations/${imageId}`).put(this.visualisation);
            this.message({ message: 'Uploading image', duration: 1000 });
            upload.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (err) => {
                console.error('Error trying to upload file:', err);
                this.message({ message: 'Something went wrong', mode: 'error' });
                this.uploading = false;
              },
              () => {
                this.updateProgress(navigationAction);
                this.updateVisualisation(imageId);
                this.message({ message: 'Visualisation uploaded', mode: 'succes' });
              });
          } catch (err) {
            console.error('Error trying to upload file:', err);
            this.message({ message: 'Something went wrong', mode: 'error' });
            this.uploading = false;
          }
        } else {
          this.message({ message: 'Only .png and .jpg files smaller than 5mb allowed', mode: 'error' });
        }
      } else {
        this.message({ message: 'No file selected to upload', mode: 'error' });
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
