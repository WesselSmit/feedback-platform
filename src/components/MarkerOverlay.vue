<template>
  <section class="marker-overlay">
    <Visualisation :visualisation="visualisation" :isMarkerOverlay="true" />
    <ConfirmSidebar :content="markerContent" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Visualisation from '@/components/Visualisation';
import ConfirmSidebar from '@/components/ConfirmSidebar';

export default {
  name: 'MarkerOverlay',
  components: {
    Visualisation,
    ConfirmSidebar,
  },
  props: ['content'],
  computed: {
    ...mapGetters('project', {
      project: 'project',
    }),
    visualisation() {
      return this.project.data.visualisation;
    },
    markerContent() {
      return this.content.markerContent;
    },
  },
};
</script>

<style lang="scss">

</style>
