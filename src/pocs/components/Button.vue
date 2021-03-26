<template>
  <button class="button" :class="{ 'button--outline': hasOutline }" @click="handleClick()">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: ['button'],
  computed: {
    label() {
      return this.button.label;
    },
    hasOutline() {
      return this.button.hasOutline;
    },
    action() {
      return this.button.action;
    },
  },
  methods: {
    handleClick() {
      if (this.action.hasOwnProperty('target')) {
        this.$router.push(this.action.target);
      } else if (this.action === 'previousStep' || this.action === 'nextStep') {
        this.$store.dispatch('step/updateStepIndex', this.action);
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.button {
  height: $button-height;
  width: 150px;
  background-color: $white;
  color: $purple;
  text-transform: uppercase;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: $purple--opacity;
  }

  &--outline {
    border: 2px solid $purple;
  }
}
</style>
