<template>
  <section class="visualisation" :class="{ 'visualisation--marker-overlay': isMarkerOverlay }">
    <div v-if="title" class="visualisation__title-container">
      <h3>{{ title }}</h3>
    </div>

    <div class="visualisation__image-container">
      <img :src="require(`@/blueprints/visualisations/${visualisation}.png`)" class="visualisation__image" @click="addMarker($event)">
      <!-- <Marker v-for="marker in markers" :key="marker" :style="{ left: `${marker.x}%`, top: `${marker.y}%` }" @click="handleMarkerClick(marker.id)" /> -->
    </div>
  </section>
</template>

//todo: als je de markerOverlay cancelled en je had een marker verwijderd dan blijft hij verwijderd, eigenlijk moeten de markers die verwijderd zijn in de sessie weer terugkomen als je cancelled
//todo: je kan niet op 'add' drukken als je alleen iets verwijdert hebt + de labels kloppen niet want als je alleen iets verwijdert dan moet er geen 'add' staan (miss save changes???)
//todo: alleen de markers van de huidige feedback comment moeten zichtbaar zijn (ze moeten dus gereset worden wanneer iemand een comment post) + de markers zijn nu altijd zichtbaar wat niet moet

//todo: markers moeten een hover state hebben waar ze gehighlight worden (voeg in figma een achtergrond cirkel toe, geef deze een opacity-fill in de gebruikers kleur in de hover state)
//todo: markers moeten nog opgeslagen worden in DB (en uitgelezen worden in FeedbackComments visualisation)
//todo: markers moeten de kleur van hun user hebben
//todo: marker hide/show controls moeten zichtbaar zijn als een van de volgende componenten gerendered is: markerOverlay, FeedbackComments

<script>
import Marker from '@/assets/icons/Marker';

export default {
  name: 'Visualisation',
  components: {
    // Marker,
  },
  props: ['title', 'visualisation', 'isMarkerOverlay'],
  computed: {
  },
  methods: {
    addMarker(e) {
      const rect = e.target.getBoundingClientRect();
      const xInPx = e.clientX - rect.left - (16 / 2); // 16 = width of Marker svg element in px
      const yInPx = e.clientY - rect.top - (20 / 2); // 20 = height of Marker svg element in px
      const xInPerc = ((xInPx / rect.width) * 100);
      const yInPerc = ((yInPx / rect.height) * 100);

      const marker = {
        id: Date.now(),
        x: xInPerc,
        y: yInPerc,
      };

      console.log('CONTINUE: add new marker');
    },
    handleMarkerClick(id) {
      if (this.isMarkerOverlay) {
        console.log('CONTINUE: remove marker');
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
    @include zoomIn(300ms, $ease--fast);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(#{100vh} - (2 * #{$space--lg}));

    .marker {
      cursor: pointer;
    }
  }

  &--marker-overlay & {
    &__image {
      border: $border--ui;
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
