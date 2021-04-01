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

export default {
  name: 'NavigationButtons',
  props: ['buttons', 'bigMarginTop'],
  computed: {
    hasMultiple() {
      return this.buttons.length > 1;
    },
  },
  methods: {
    handleClick(action) {
      this.$store.dispatch('sidebar/updateTextInput', '');

      if (action.hasOwnProperty('target')) {
        this.$router.push(action.target);
      } else if (action === 'previousStep' || action === 'nextStep') {
        this.$store.dispatch('sidebar/updateStepIndex', action);
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
    width: 150px;
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
