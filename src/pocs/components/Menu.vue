<template>
  <section class="menu">
    <div class="menu__item" @click="handleLogout">
      <LogoutIcon class="menu__item-icon" />
      <p class="menu__item-link">logout</p>
    </div>
  </section>
</template>

//todo (see menuOptions in blueprint file)

<script>
import { mapActions } from 'vuex';
import LogoutIcon from '@/assets/icons/LogoutIcon';

export default {
  name: 'Menu',
  components: {
    LogoutIcon,
  },
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

  &__item {
    display: flex;
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
      fill: $black;
      transition: fill 500ms $ease--fast;
    }

    &-link {
      margin: 0;
      color: $black;
      transition: color 500ms $ease--fast;
    }
  }
}
</style>
