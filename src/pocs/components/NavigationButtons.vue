<template>
  <section class="navigation-buttons" :class="{ 'navigation-buttons--multiple': hasMultiple  }">
      <button v-for="(button, name) in buttons"
        :key="name" class="navigation-buttons__button"
        :class="{ 'navigation-buttons__button--outline': button.hasOutline }"
        @click="handleClick(button)">
        {{ button.label }}
      </button>
  </section>
</template>

<script>

export default {
  name: 'ButtonBox',
  props: ['buttons'],
  computed: {
    hasMultiple() {
      return this.buttons.length > 1;
    },
  },
  methods: {
    handleClick(button) {
      const { action } = button;
      if (action.hasOwnProperty('target')) {
        this.$router.push(action.target);
      } else if (action === 'previousStep' || action === 'nextStep') {
        this.$store.dispatch('step/updateStepIndex', action);
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
  margin: $space--lg $space--sm-md $space--sm-md;

  &--multiple {
    justify-content: space-between;
  }

  &__button {
    height: $button-height;
    width: 150px;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: background-color 500ms $ease;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: 2px solid $purple;
    }
  }
}
</style>
