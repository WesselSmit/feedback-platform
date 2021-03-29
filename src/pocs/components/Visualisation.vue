<template>
  <section class="visualisation" :class="{ 'visualisation--marker-overlay': isMarkerOverlay }">
    <div v-if="title" class="visualisation__title-container">
      <h2>{{ title }}</h2>
    </div>

    <div class="visualisation__image-container">
      <img :src="require(`@/blueprints/visualisations/${visualisation}.png`)" class="visualisation__image" @click="addMarker($event)">
      <Marker v-for="marker in markers" :key="marker" :style="{ left: marker.x, top: marker.y }" @click="handleMarkerClick(marker.id)" />
    </div>
  </section>
</template>

//todo: markers moeten nog opgeslagen worden in DB (en uitgelezen worden in FeedbackComments visualisation)
//todo: alleen de markers van de huidige feedback comment moeten zichtbaar zijn (ze moeten dus gereset worden wanneer iemand een comment post) + de markers zijn nu altijd zichtbaar wat niet moet
//todo: in FeedbackInput moet 'addMarkers' veranderen naar 'X markers' als er markers zijn
//todo: markers moeten de kleur van hun user hebben
//todo: markers moeten een hover state hebben waar ze gehighlight worden (voeg in figma een achtergrond cirkel toe, geef deze een opacity-fill in de gebruikers kleur in de hover state)
//todo: marker hide/show controls moeten zichtbaar zijn als een van de volgende componenten gerendered is: markerOverlay, FeedbackComments

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
    addMarker(e) {
      const rect = e.target.getBoundingClientRect();
      const marker = {
        id: Date.now(),
        x: e.clientX - rect.left - (16 / 2), // 16 = width of Marker svg element in px
        y: e.clientY - rect.top - (20 / 2), // 20 = height of Marker svg element in px
      };

      this.$store.dispatch('sidebar/addMarker', marker);
    },
    handleMarkerClick(id) {
      if (this.isMarkerOverlay) {
        this.$store.dispatch('sidebar/removeMarker', id);
      }
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
        cursor: pointer;

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
