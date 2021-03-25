<template>
  <section class="sidebar">
    <h1>Sidebar</h1>
  </section>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss">
@import "@/styles";

.sidebar {
  min-height: 100vh;
  padding: $size--sm-md;
  border-left: 1px solid $gray--light;
}
</style>
