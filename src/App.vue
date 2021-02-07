<template>
  <Navigation v-if="showNav" />
  <router-view />

  <div>
    <p>obj: {{ this.user }}</p>
    <p>User: {{ this.user.name }}</p>
    <p>Role: {{ this.userRole }}</p>
    <p>Uid: {{ this.user.uid }}</p>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      userRole: 'role',
      userError: 'error',
    }),
    showNav() {
      return Object.keys(this.user).length > 1;
    },
  },
};
</script>

<style lang="scss">

</style>
