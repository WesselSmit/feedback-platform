<template>
  <Navigation v-if="showNav" />
  <router-view />
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Navigation,
  },
  computed: {
    ...mapState(['user']),
    showNav() {
      return Object.keys(this.user).length > 1;
    },
  },
};
</script>

<style lang="scss">

</style>
