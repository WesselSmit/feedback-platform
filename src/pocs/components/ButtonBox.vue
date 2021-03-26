<template>
  <section class="button-box" :class="{ multiple: hasMultiple  }">
    <Button v-for="(button, name) in buttons" :key="name" :button="button" />
  </section>
</template>

<script>
import Button from './Button';

export default {
  name: 'ButtonBox',
  components: {
    Button,
  },
  props: ['buttons'],
  computed: {
    hasMultiple() {
      return this.buttons.length > 1;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.button-box {
  display: flex;
  justify-content: flex-end;
  margin: $space--lg $space--sm-md $space--sm-md;

  &.multiple {
    justify-content: space-between;
  }
}
</style>
