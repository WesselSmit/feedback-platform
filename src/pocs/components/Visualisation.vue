<template>
  <section class="visualisation">
    <div class="visualisation__title-container">
      <h2>{{ title }}</h2>
    </div>

    <div class="visualisation__image-container">
      <img :src="require(`@/blueprints/visualisations/${visualisation}.png`)" class="visualisation__image">
    </div>
  </section>
</template>

<script>
export default {
  name: 'Visualisation',
  props: ['title', 'visualisation'],
};
</script>

<style lang="scss">
@import '@/styles';

.visualisation {
  margin: $space--lg 0 $space--xl;

  &__title-container {
    margin: auto;
    padding: 0 $space--sm-md;
    max-width: calc(#{$documentation-width} - (2 * #{$space--sm-md}));
  }

  &__image {
    display: block;
      margin: auto;
      width: 100%;
      max-height: 95vh;

    &-container {
      margin: 0 $space--sm-md;
    }
  }
}
</style>
