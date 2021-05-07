<template>
  <div class="markers">
    <MarkerIcon v-for="marker in currentMarkers" :key="marker" class="visualisation__marker" :class="{ 'visualisation__marker--has-hover': isMarkerOverlay }"
    :style="{ left: `${marker.x}%`, top: `${marker.y}%` }" @click="handleMarkerClick(marker.id)" />
  </div>
</template>

<script>
import MarkerIcon from '@/assets/icons/OverlayMarkerIcon';

export default {
  name: 'Markers',
  components: {
    MarkerIcon,
  },
  props: ['comments'],
};
</script>

<style lang="scss">
@import '@/styles';

.markers {

}
</style>
