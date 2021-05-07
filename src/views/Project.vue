<template>
  <main v-if="page === 'setup' && !showMarkerOverlay">
    <Setup :content="pageContent" :stepIndex="progress" />
  </main>

  <main v-if="pageIsGiveOrView && !showMarkerOverlay" class="columns">
    <Documentation :pageMode="page" :content="{ project, documentation }" />
    <GiveSidebar v-if="page === 'give' && !showImageSidebar" :content="{ project, documentation, sidebar }" :stepIndex="progress" />
    <ViewSidebar v-if="page === 'view' && !showImageSidebar" :content="{ project, documentation, sidebar }" />
    <ConfirmSidebar v-if="showImageSidebar" :content="imageContent" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="columns" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import setupBlueprint from '@/blueprints/setup';
import documentationBlueprint from '@/blueprints/documentation';
import giveBlueprint from '@/blueprints/give';
import viewBlueprint from '@/blueprints/view';
import Setup from '@/components/Setup';
import Documentation from '@/components/Documentation';
import GiveSidebar from '@/components/GiveSidebar';
import ViewSidebar from '@/components/ViewSidebar';
import ConfirmSidebar from '@/components/ConfirmSidebar';
import MarkerOverlay from '@/components/MarkerOverlay';

export default {
  name: 'Project',
  inheritAttrs: false,
  components: {
    Setup,
    Documentation,
    GiveSidebar,
    ViewSidebar,
    ConfirmSidebar,
    MarkerOverlay,
  },
  data() {
    return {
      page: null,
      progress: null,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      showMarkerOverlay: 'showMarkerOverlay',
      showImageSidebar: 'showImageSidebar',
    }),
    ...mapGetters('project', {
      project: 'project',
      owner: 'owner',
      newProgressAvailable: 'newProgressAvailable',
    }),
    ...mapGetters('user', {
      userId: 'id',
    }),
    pageContent() {
      switch (this.page) {
        case 'setup':
          return setupBlueprint;
        case 'give':
          return giveBlueprint;
        case 'view':
          return viewBlueprint;
        default:
          return null;
      }
    },
    pageIsGiveOrView() {
      return this.page === 'give' || this.page === 'view';
    },
    documentation() {
      return documentationBlueprint;
    },
    sidebar() {
      return this.pageContent;
    },
    imageContent() {
      return this.pageContent.imageContent;
    },
    markerContent() {
      return this.pageContent.markerContent;
    },
  },
  watch: {
    newProgressAvailable(newVal) {
      // get updated progress from the projectStore whenever the newProgressAvailable changes
      // ideally this would be a getters instead of a watcher, but since you both the userId and project are needed it can't be a getter and needs to be an action in the store. Because it's an action in the store it isn't reactive and we need a watcher to react on changes
      if (newVal) {
        this.syncProgress();
        this.resetNewProgressAvailable();
      }
    },
  },
  methods: {
    ...mapActions('project', {
      getProgress: 'getProgress',
      resetNewProgressAvailable: 'resetNewProgressAvailable',
    }),
    async syncProgress() {
      const progress = await this.getProgress();
      this.page = progress.type;
      this.progress = progress.progress;
    },
  },
  created() {
    this.syncProgress();
  },
};
</script>

<style lang="scss">
@import "@/styles";

.columns {
  display: grid;
  grid-template-columns: 1fr $sidebar-width;
}
</style>
