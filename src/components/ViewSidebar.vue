<template>
  <section class="view-sidebar">
     <Tabs v-if="tabs" :tabs="tabs" />

    <div class="view-sidebar__inner">
      <transition name="slide-horizontal" mode="out-in">
        <div v-if="activeTab === 'insights'" class="view-sidebar__inner-wrappers anim-side--left">
          <div v-for="(section, name) in sections" :key="section" class="view-sidebar__inner-wrapper">
            <ReadInstructions v-if="name === 'readInstructions'" :content="section" class="view-sidebar__section" />
            <Insights v-if="name === 'insights'" :content="section" class="view-sidebar__section"/>
          </div>
        </div>

        <div v-else-if="activeTab === 'feedback'" class="view-sidebar__inner-wrapper anim-side--right">
          <div v-if="activeTab === 'feedback'" v-for="(section, name) in sections" :key="section" class="view-sidebar__inner-wrapper">
            <ReadInstructions v-if="name === 'readInstructions'" :content="section" class="view-sidebar__section" />
            <FeedbackComments v-if="name === 'feedbackComments'" :content="section" class="view-sidebar__section view-sidebar__section--no-padding-horizontal" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

//todo: sidebar tab transitie ziet er raar uit omdat de navgationButtons geen transitie hebben

<script>
import { mapGetters, mapActions } from 'vuex';
import Tabs from '@/components/Tabs';
import ReadInstructions from '@/components/ReadInstructions';
import Insights from '@/components/Insights';
import FeedbackComments from '@/components/FeedbackComments';

export default {
  name: 'ViewSidebar',
  components: {
    Tabs,
    ReadInstructions,
    FeedbackComments,
    Insights,
  },
  props: ['content'],
  computed: {
    ...mapGetters('sidebar', {
      activeTab: 'activeTab',
    }),
    tabs() {
      return this.content.sidebar.tabs;
    },
    sections() {
      const currentTab = this.tabs.find((tab) => tab.value === this.activeTab);
      return currentTab.content;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateActiveTab: 'updateActiveTab',
    }),
  },
  created() {
    this.updateActiveTab('insights');
  },
};
</script>

<style lang="scss">
@import '@/styles';

.view-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: $sidebar-width;
  min-height: 100vh;
  max-height: 100vh;
  border-left: $border--ui;

  &__inner {
    display: flex;
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: scroll;

    &-wrappers {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  }

  &__section {
    padding: $space--sm-md;

    &--no-padding-horizontal {
      padding: $space--sm-md 0;
    }
  }
}
</style>
