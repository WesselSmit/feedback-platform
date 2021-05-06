<template>
  <section class="menu">
    <div v-if="hasBack" class="menu__item" @click="handleBack">
      <BackIcon class="menu__item-icon" />
      <p class="menu__item-link">Home</p>
    </div>
    <div v-if="hasLogout" class="menu__item" @click="handleLogout">
      <LogoutIcon class="menu__item-icon" />
      <p class="menu__item-link">Logout</p>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import BackIcon from '@/assets/icons/BackIcon';
import LogoutIcon from '@/assets/icons/LogoutIcon';

export default {
  name: 'Menu',
  components: {
    BackIcon,
    LogoutIcon,
  },
  props: ['hasBack', 'hasLogout'],
  methods: {
    ...mapActions('user', {
      user: 'user',
      logout: 'logout',
    }),
    ...mapActions('sidebar', {
      updateActiveTab: 'updateActiveTab',
    }),
    handleBack() {
      this.$router.push('/dashboard');
      this.updateActiveTab(null);
    },
    handleLogout() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.menu {
  overflow: auto;
  min-height: $space--xl;

  &__item {
    display: flex;
    align-items: center;
    height: 28px;
    max-width: max-content;
    padding: $space--xsm $space--sm;
    cursor: pointer;

    &:first-of-type {
      margin-top: $space--xsm;
    }

    &:last-of-type {
      margin-bottom: $space--xsm;
    }

    &:hover & {
      &-icon {
        fill: $purple;
      }

      &-link {
        color: $purple;
      }
    }

    &-icon {
      margin-right: $space--sm;
      width: 18px;
      height: 18px;
      fill: $black;
      transition: fill 500ms $ease--fast;
    }

    &-link {
      margin: 0;
      color: $black;
      font-size: $font-size--sm-md;
      transition: color 500ms $ease--fast;
    }
  }
}
</style>
