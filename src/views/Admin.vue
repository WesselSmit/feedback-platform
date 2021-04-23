<template>
  <p>admin</p>

  <div v-if="isAdmin">
    <p>you are a ADMIN!!</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  computed: {
    ...mapGetters('user', {
      userRole: 'role',
    }),
    isAdmin() {
      return this.userRole === 'admin';
    },
  },
};
</script>

<style lang="scss">

</style>
