<template>
  <section class="visualisation">
    <div class="visualisation__title-container">
      <h2>{{ title }}</h2>
    </div>

    <div class="visualisation__image-container">
      <img :src="require(`@/content/visualisations/${visualisation}.png`)" class="visualisation__image">
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
  margin: $size--lg 0 $size--xl;

  &__title-container {
    margin: auto;
    max-width: $documentation-width;
  }

  &__image {
    display: block;
      margin: auto;
      width: 100%;
      max-height: 95vh;

    &-container {
      margin: 0 $size--sm-md;
    }
  }
}
</style>
