<template>
  <main v-if="page === 'setup' && !showMarkerOverlay">
    <!-- TODO: documentatie pagina component -->
  </main>

  <main v-if="pageIsGiveOrView && !showMarkerOverlay" class="base">
    <Documentation :content="documentation" />
    <!-- TODO: hernoem Sidebar naar GiveSidebar -->
    <Sidebar v-if="page === 'give' && !showImageSidebar" :content="{ documentation, sidebar }" :stepIndex="stepIndex" />
    <!-- TODO: maak een viewSidebar component (de huidige Sidebar moet hernoemt worden naar GiveSidebar), deze moet v-if="page === 'view' && !showImageSidebar" hebben -->
    <ConfirmSidebar v-if="showImageSidebar" :content="imageContent" />
  </main>

  <MarkerOverlay v-if="showMarkerOverlay" :content="{ documentation, markerContent}" class="base" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import setupBlueprint from '@/blueprints/setup';
import giveBlueprint from '@/blueprints/give';
import viewBlueprint from '@/blueprints/view';
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
      return this.pageContent.documentation;
    },
    sidebar() {
      return this.pageContent.sidebar;
    },
    imageContent() {
      return this.pageContent.sidebar.imageContent;
    },
    markerContent() {
      return this.pageContent.sidebar.markerContent;
    },
  },
  methods: {
    ...mapActions('project', {
      getProgress: 'getProgress',
    }),
  },
  async created() {
    /*
    ! problemen:
    - firestore /projects is gereset en nu krijg je een error als je een project probeert toe te voegen
    - Project.vue werkt nog niet goed met de de juiste data:
      - this.pageContent werkt alleen als this.page 'give' is (want de setupBlueprint & viewBlueprint moeten nog gemaakt worden)
      - projectStore actions zijn nog niet af/waterproof (zie ook todo)

    * het idee van deze van de projects:
    - Project.vue (deze file) bepaalt welke welke variant van de pagina gerendered moet worden (setup, give feedback, view feedback)
      - beide give en view renderen een andere sidebar (zie ook todo's in template)
    */

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
