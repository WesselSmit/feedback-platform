<template>
  <Navigation v-if="showNav" />
  <router-view />

  <div>
    <p>obj: {{ this.user }}</p>
    <p>User: {{ this.user.name }}</p>
    <p>Role: {{ this.user.role }}</p>
    <p>Uid: {{ this.user.uid }}</p>

    <h1>error: {{ this.error }}</h1>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters('user', ['user', 'error']),
    showNav() {
      return Object.keys(this.user).length > 1;
    },
  },
};
</script>

<style lang="scss">

</style>
