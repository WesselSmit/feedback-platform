<template>
  <p>test component: {{ this.user.name }}</p>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style>

</style>
