<template>
  <button class="button" :class="{ button__outline: hasOutline }">
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

  &__outline {
    border: 2px solid $purple;
  }

  &:hover,
  &:focus {
    background-color: $purple--opacity;
  }
}
</style>
