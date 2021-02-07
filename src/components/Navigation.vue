<template>
  <section>
    <div>
      <a @click="logout">logout</a>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>

<style lang="scss">

</style>
