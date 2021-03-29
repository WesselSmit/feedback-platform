<template>
  <section class="visualisation" :class="{ 'visualisation--marker-overlay': isMarkerOverlay }">
    <div v-if="title" class="visualisation__title-container">
      <h2>{{ title }}</h2>
    </div>

    <div class="visualisation__image-container">
      <img :src="require(`@/blueprints/visualisations/${visualisation}.png`)" class="visualisation__image" @click="handleClick($event)">
      <Marker v-for="marker in markers" :key="marker" :style="{ left: marker.x, top: marker.y }" />
    </div>
  </section>
</template>

//todo: marker hide/show controls moeten zichtbaar zijn als een van de volgende componenten gerendered is: markerOverlay, FeedbackComments
//todo: markers moeten nog opgeslagen worden in DB

<script>
import { mapGetters } from 'vuex';
import Marker from '@/assets/icons/Marker';

export default {
  name: 'Visualisation',
  components: {
    Marker,
  },
  props: ['title', 'visualisation', 'isMarkerOverlay'],
  computed: {
    ...mapGetters('sidebar', {
      markers: 'markers',
    }),
  },
  methods: {
    handleClick(e) {
      const rect = e.target.getBoundingClientRect();
      const coords = {
        x: e.clientX - rect.left - (16 / 2), // 16 = width of Marker svg element in px
        y: e.clientY - rect.top - (20 / 2), // 20 = height of Marker svg element in px
      };

      this.$store.dispatch('sidebar/updateMarkers', coords);
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.visualisation {
  margin: $space--lg 0;

  &--marker-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(#{100vh} - (2 * #{$space--lg}));
  }

  &--marker-overlay & {
    &__image {
      cursor: crosshair;
    }
  }

  &__title-container {
    margin: auto;
    padding: 0 $space--sm-md;
    max-width: calc(#{$documentation-width} - (2 * #{$space--sm-md}));
  }

  &__image {
    display: block;
      margin: auto;
      width: 100%;
      max-height: 95vh;

    &-container {
      position: relative;
      margin: 0 $space--sm-md;

      .marker {
        position: absolute;

        &__outline,
        &__dot {
          fill: $black;
        }

        &__background {
          fill: $white;
        }
      }
    }
  }
}
</style>
