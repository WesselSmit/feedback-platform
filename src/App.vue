<template>
  <Navigation v-if="showNav" />
  <router-view />

  <p>{{ this.user.name }}</p>
  <Test />
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Test from '@/components/Test.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Navigation,
    Test,
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
