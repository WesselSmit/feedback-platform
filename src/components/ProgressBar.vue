<template>
  <section class="progress-bar">
    <div class="progress-bar__container">
      <div class="progress-bar__steps">
        <div v-for="step in total - 1" :key="step" class="progress-bar__step"></div>
      </div>
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
      return { width: `calc(${progress}% - 2.5px)` }; // 2.5px = half of $progressbar-gap-width
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.progress-bar {
  &__container {
    height: $progressbar-height;
    width: 100%;
    background-color: $gray--light;
  }

  &__value {
    position: relative;
    top: -#{$progressbar-height};
    height: $progressbar-height;
    background-color: $purple;
    transition: width 1s $ease--fast;
  }

  &__steps {
    position: relative;
    top: -#{$progressbar-height} * 2;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  &__step {
    width: $progressbar-gap-width;
    height: $progressbar-height;
    background-color: $white;
  }
}
</style>
