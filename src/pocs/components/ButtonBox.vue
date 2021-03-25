<template>
  <section class="button-box">
    <Button v-for="(button, name) in buttons" :key="name" :button="button" :importance="name" />
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
};
</script>

<style lang="scss">
@import '@/styles';

.button-box {
  display: flex;
  justify-content: space-between;
  margin: $space--lg $space--sm-md $space--sm-md;
}
</style>
