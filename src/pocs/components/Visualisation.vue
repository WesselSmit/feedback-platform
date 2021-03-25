<template>
  <section class="visualisation">
    <h2>{{ title }}</h2>
    <img :src="require(`@/content/visualisations/${visualisation}.png`)" class="visualisation__image">
  </section>
</template>

<script>
export default {
  name: 'Visualisation',
  props: ['title', 'visualisation'],
};
</script>

<style lang="scss">
.visualisation {

  &__image {
    width: 100%;
  }
}
</style>
