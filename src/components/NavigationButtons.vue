<template>
  <section class="navigation-buttons" :class="{ 'navigation-buttons--multiple': hasMultiple, 'navigation-buttons--big-margin-top': bigMarginTop }">
      <button v-for="(button, name) in buttons"
        :key="name" class="navigation-buttons__button"
        :class="{ 'navigation-buttons__button--outline': button.hasOutline, }"
        @click="handleClick(button.action)">
        {{ button.label }}
      </button>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavigationButtons',
  props: ['buttons', 'bigMarginTop'],
  computed: {
    ...mapGetters('sidebar', {
      insightInput: 'insightInput',
    }),
    hasMultiple() {
      return this.buttons.length > 1;
    },
    projectId() {
      // return 'poc-give-boxing'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
      return 'poc-give-twitter'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateTextInput: 'updateTextInput',
      updateStepIndex: 'updateStepIndex',
      updateHideDocumentation: 'updateHideDocumentation',
    }),
    ...mapActions('feedback', {
      postInsight: 'postInsight',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    handleClick(action) {
      this.updateTextInput('');

      if (action.hasOwnProperty('target')) {
        this.$router.push({ path: `/${action.target}` });

        if (action.target === 'Dashboard') {
          this.message({ message: 'Your feedback is saved', mode: 'succes' });
        }
      } else if (action === 'previousStep' || action === 'nextStep') {
        this.updateStepIndex(action);
      } else if (action === 'saveInsights') {
        if (this.insightInput) {
          this.updateHideDocumentation(false);
          this.postInsight({ insight: this.insightInput, projectId: this.projectId });
          this.updateStepIndex('nextStep');
          this.message({ message: 'Insight saved', mode: 'succes' });
        } else {
          this.message({ message: 'Enter at least one insight' });
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.navigation-buttons {
  display: flex;
  justify-content: flex-end;
  margin: $space--md $space--sm-md $space--sm-md;

  &--multiple {
    justify-content: space-between;
  }

  &--big-margin-top {
    margin-top: $space--lg;
  }

  &__button {
    height: $button-height;
    width: $button-width;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: $border--button;
    }
  }
}
</style>
