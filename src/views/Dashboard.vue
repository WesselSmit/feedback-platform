<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <Menu />
      <Profile />
    </div>
  </section>
</template>

<script>
import Menu from '@/pocs/components/Menu';
import Profile from '@/pocs/components/Profile';

export default {
  components: {
    Menu,
    Profile,
  },
};
</script>

<style lang="scss">
@import '@/styles';

.dashboard {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
