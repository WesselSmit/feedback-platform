<template>
  <section class="tabs">
    <div v-for="(tab, index) in tabs"
      :key="index" class="tabs__tab"
      :class="{ 'tabs__tab--active': tab.value === activeTab }"
      @click="handleClick(tab.value, index)">
      {{ tab.label }}
    </div>
    <div class="tabs__indicator" :class="tabIndicatorPosition"></div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Tabs',
  props: ['tabs'],
  data() {
    return {
      activeTabIndex: 0,
    };
  },
  computed: {
    ...mapGetters('tab', {
      activeTab: 'activeTab',
    }),
    tabIndicatorPosition() {
      const position = this.activeTabIndex === 0 ? 'left' : 'right';
      return `tabs__indicator--${position}`;
    },
  },
  methods: {
    handleClick(value, index) {
      this.activeTabIndex = index;

      if (this.activeTab !== value) {
        this.$store.dispatch('tab/updateActiveTab', value);
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.tabs {
  position: relative;
  display: flex;
  border-bottom: 1px solid $gray--light;

  &__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 18px;
    background-color: $white;
    color: $black;
    text-transform: uppercase;
    cursor: pointer;

    &::selection {
      background: none;
    }

    &:hover {
      background-color: $purple--opacity;
    }

    &--active {
      color: $purple;
    }
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    width: calc(#{$sidebar-width} / 2);
    height: 2px;
    background-color: $purple;
    transition: left 500ms $ease;

    &--left {
      left: 0;
    }

    &--right {
      left: 50%;
    }
  }
}
</style>
