<template>
  <main v-if="!showMarkerOverlay" class="base">
    <Documentation :content="documentation" />
    <Sidebar v-if="!showImageSidebar" :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
    <ConfirmSidebar v-if="showImageSidebar" :content="imageContent" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="base" />
</template>

//todo: een mini-popup (zonder overlay) die kort in beeld verschijnt om te informeren dat een actie gedaan is (net zoals gdrive het meld als je een document verwijdert), deze pop-up kan je gebruiken om abrubte scherm transities toe te lichten (bij. 'markers opgeslage' of 'afbeelding opgeslagen')
//todo: 'agree with feedback' feature

<script>
import { mapGetters } from 'vuex';
// import content from '@/blueprints/give-boxing';
import content from '@/blueprints/give-twitter';
import Documentation from '@/pocs/components/Documentation';
import Sidebar from '@/pocs/components/Sidebar';
import ConfirmSidebar from '@/pocs/components/ConfirmSidebar';
import MarkerOverlay from '@/pocs/components/MarkerOverlay';

export default {
  name: 'Give',
  components: {
    Documentation,
    Sidebar,
    ConfirmSidebar,
    MarkerOverlay,
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
};
</script>

<style lang="scss">
@import "@/styles";

.base {
  display: grid;
  grid-template-columns: 1fr $sidebar-width;
}
</style>
