<template>
  <main v-if="page === 'setup' && !showMarkerOverlay">
    TODO: documentatie pagina opzetten component
    <!-- TODO: documentatie pagina component -->
  </main>

  <main v-if="pageIsGiveOrView && !showMarkerOverlay" class="base">
    <Documentation :content="documentation" />
    <GiveSidebar v-if="page === 'give' && !showImageSidebar" :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
    <ViewSidebar v-if="page === 'view' && !showImageSidebar" />
    <ConfirmSidebar v-if="showImageSidebar" :content="imageContent" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="base" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import setupBlueprint from '@/blueprints/setup';
import documentationBlueprint from '@/blueprints/documentation';
import giveBlueprint from '@/blueprints/give';
import viewBlueprint from '@/blueprints/view';
import Documentation from '@/components/Documentation';
import GiveSidebar from '@/components/GiveSidebar';
import ViewSidebar from '@/components/ViewSidebar';
import ConfirmSidebar from '@/components/ConfirmSidebar';
import MarkerOverlay from '@/components/MarkerOverlay';

export default {
  name: 'Project',
  inheritAttrs: false,
  components: {
    Documentation,
    GiveSidebar,
    ViewSidebar,
    ConfirmSidebar,
    MarkerOverlay,
  },
  data() {
    return {
      page: null,
      progress: null, // todo: moet nog meegegeven worden als prop in de template + stepIndex moet van sidebarStore naar de projectStore verplaatst worden + de NavigationButtons moeten de stepIndex in de projectStore updaten
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      stepIndex: 'stepIndex',
      showMarkerOverlay: 'showMarkerOverlay',
      showImageSidebar: 'showImageSidebar',
    }),
    ...mapGetters('project', {
      owner: 'owner',
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
  methods: {
    ...mapActions('project', {
      getProgress: 'getProgress',
    }),
  },
  async created() {
    const progress = await this.getProgress();
    this.page = progress.type;
    this.progress = progress.progress;
  },
};
</script>

<style lang="scss">
@import "@/styles";

.base {
  display: grid;
  grid-template-columns: 1fr $sidebar-width;
}
</style>
