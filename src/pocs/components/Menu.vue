<template>
  <section class="menu">
    <div class="menu__logout">
      <a @click="handleLogout">logout</a>
    </div>
  </section>
</template>

//todo (see menuOptions in blueprint file)

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Menu',
  methods: {
    ...mapActions('user', {
      logout: 'logout',
    }),
    handleLogout() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.menu {
  min-height: $space--xl;
}
</style>
