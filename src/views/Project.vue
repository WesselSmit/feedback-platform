<template>
  <main v-if="!showMarkerOverlay" class="base">
    <Documentation :content="documentation" />
    <Sidebar v-if="!showImageSidebar" :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
    <ConfirmSidebar v-if="showImageSidebar" :content="imageContent" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="base" />
</template>

//todo: adhv het id + de progress + ownership van de gebruiker wordt bepaald welke view gerendered wordt (setup/edit, give, view)

<script>
import { mapGetters } from 'vuex';
import content from '@/blueprints/give-twitter';
import Documentation from '@/components/Documentation';
import Sidebar from '@/components/Sidebar';
import ConfirmSidebar from '@/components/ConfirmSidebar';
import MarkerOverlay from '@/components/MarkerOverlay';

export default {
  name: 'Project',
  inheritAttrs: false,
  components: {
    Documentation,
    Sidebar,
    ConfirmSidebar,
    MarkerOverlay,
  },
  data() {
    return {
      projectId: null,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      stepIndex: 'stepIndex',
      showMarkerOverlay: 'showMarkerOverlay',
      showImageSidebar: 'showImageSidebar',
    }),
    documentation() {
      return content.documentation;
    },
    sidebar() {
      return content.sidebar;
    },
    imageContent() {
      return content.sidebar.imageContent;
    },
    markerContent() {
      return content.sidebar.markerContent;
    },
  },
  created() {
    this.projectId = this.$route.params.id;
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
