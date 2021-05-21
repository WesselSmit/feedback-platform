<template>
  <section class="navigation-buttons" :class="{ 'navigation-buttons--multiple': hasMultiple, 'navigation-buttons--big-margin-top': bigMarginTop }">
      <button v-for="(button, name) in buttons"
        :key="name" class="navigation-buttons__button"
        :class="{ 'navigation-buttons__button--outline': button.hasOutline, 'navigation-buttons__button--disabled': isDisabled(button.hasDisabled), }"
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
    ...mapGetters('project', {
      projectId: 'projectId',
    }),
    hasMultiple() {
      return this.buttons.length > 1;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateHideDocumentation: 'updateHideDocumentation',
      updateHideVisualisation: 'updateHideVisualisation',
      resetAllInputs: 'resetAllInputs',
    }),
    ...mapActions('feedback', {
      postInsight: 'postInsight',
    }),
    ...mapActions('project', {
      updateProgress: 'updateProgress',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    isDisabled(hasDisabled) {
      return hasDisabled && this.insightInput === '';
    },
    handleClick(action) {
      this.$emit('handleNav', action); // used for transitions in Sidebar components
      this.resetAllInputs();

      if (action.hasOwnProperty('target')) {
        this.$router.push({ path: `/${action.target}` });

        if (action.target.toLowerCase() === 'dashboard') {
          this.message({ message: 'Feedback saved', mode: 'succes' });
        }
      } else if (action === 'previousStep' || action === 'nextStep') {
        this.updateProgress({ instruction: action });
      } else if (action === 'saveInsights') {
        if (this.insightInput) {
          this.updateHideDocumentation(false);
          this.updateProgress({ instruction: 'nextStep', hideVisualisation: true });
          this.postInsight({ insight: this.insightInput, projectId: this.projectId });
          this.message({ message: 'Insight saved', mode: 'succes' });
        } else {
          this.message({ message: 'Enter at least one insight', mode: 'error' });
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
    background-color: $gray--sidebar;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: $border-radius;
    transition: background-color 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--disabled {
      background-color: $gray--sidebar;
      color: $gray--dark;
      cursor: default;

      &:hover {
        background-color: $gray--sidebar;
        color: $gray--dark;
      }
    }
  }
}
</style>
