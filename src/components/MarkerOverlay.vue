<template>
  <section class="marker-overlay">
    <Visualisation :visualisation="visualisation" :isMarkerOverlay="true" />
    <ConfirmSidebar :content="markerContent" />
  </section>
</template>

<script>
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
    visualisation() {
      return this.content.documentation.visualisation;
    },
    markerContent() {
      return this.content.markerContent;
    },
  },
};
</script>

<style lang="scss">

</style>
