<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <Menu />
      <Profile />
    </div>

    <h1>Your documentation pages</h1>
    <div class="dashboard__project-list dashboard__project-list--yours">
      <article class="dashboard__project" @click="openProject()">

      </article>
    </div>

    <h1>Documentation pages shared with you</h1>
    <div class="dashboard__project-list dashboard__project-list--shared">
      <article class="dashboard__project" @click="openProject()">

      </article>
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
