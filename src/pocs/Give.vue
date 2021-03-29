<template>
  <main v-if="!showMarkerOverlay" class="base">
    <Documentation :content="documentation" />
    <Sidebar :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="base" />
</template>

<script>
import { mapGetters } from 'vuex';
import content from '@/blueprints/give-boxing';
import Documentation from '@/pocs/components/Documentation';
import Sidebar from '@/pocs/components/Sidebar';
import MarkerOverlay from '@/pocs/components/MarkerOverlay';

export default {
  name: 'Give',
  components: {
    Documentation,
    Sidebar,
    MarkerOverlay,
  },
  computed: {
    ...mapGetters('sidebar', {
      stepIndex: 'stepIndex',
      showMarkerOverlay: 'showMarkerOverlay',
    }),
    documentation() {
      return content.documentation;
    },
    sidebar() {
      return content.sidebar;
    },
    markerContent() {
      return content.sidebar.markerContent;
    },
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
