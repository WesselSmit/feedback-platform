<template>
  <Navigation v-if="isLoggedIn" />
  <router-view />

  <div v-if="isLoggedIn">
    <p>obj: {{ this.user }}</p>
    <p>User: {{ this.user.name }}</p>
    <p>Role: {{ this.userRole }}</p>
    <p>Group: {{ this.userGroup }}</p>
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
      userGroup: 'group',
      userError: 'error',
    }),
    isLoggedIn() {
      // use Object.keys() because this.user returns a Proxy
      return Object.keys(this.user).length > 1;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles";
</style>
