<template>
  <section class="progress-bar">
    <div class="progress-bar__container">
      <div class="progress-bar__value" :style="progress"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: ['total', 'index'],
  computed: {
    progress() {
      const progress = (this.index / this.total) * 100;
      return { width: `${progress}%` };
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.progress-bar {
  &__container {
    height: 5px;
    width: $sidebar-width;
    background-color: $gray--light;
  }

  &__value{
    height: 5px;
    background-color: $purple;
    transition: width 1s $ease--fast;
  }
}
</style>
