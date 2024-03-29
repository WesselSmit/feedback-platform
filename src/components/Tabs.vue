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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Tabs',
  props: ['tabs'],
  data() {
    return {
      activeTabIndex: 0,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      activeTab: 'activeTab',
      activeTabIndexFromStore: 'activeTabIndex',
    }),
    tabIndicatorPosition() {
      const position = this.activeTabIndex === 0 ? 'left' : 'right';
      return `tabs__indicator--${position}`;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateActiveTab: 'updateActiveTab',
      updateActiveTabIndex: 'updateActiveTabIndex',
    }),
    handleClick(value, index) {
      this.activeTabIndex = index;

      if (this.activeTab !== value) {
        this.updateActiveTab(this.tabs[index].value);
      }
    },
  },
  watch: {
    activeTabIndexFromStore(newVal) { // watch for manual state triggers (only use this when updating state from other components)
      if (newVal === 0 || newVal === 1) {
        this.activeTabIndex = this.activeTabIndexFromStore;
        this.updateActiveTabIndex(null); // reset immediately
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
  border-bottom: $border--ui;

  &__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    padding: 18px;
    background-color: $gray--sidebar;
    color: $black;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--active {
      color: $purple;
      cursor: default;

      &:hover {
        background-color: $gray--sidebar;
      }
    }
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    width: calc(#{$sidebar-width} / 2);
    height: 2px;
    background-color: $purple;
    transition: left 500ms $ease--fast;

    &--left {
      left: 0;
    }

    &--right {
      left: 50%;
    }
  }
}
</style>
