<template>
  <section class="visualisation" :class="{ 'visualisation--marker-overlay': isMarkerOverlay }">
    <div v-if="title" class="visualisation__title-container">
      <h3>{{ title }}</h3>
    </div>

    <div class="visualisation__image-container" :class="{ 'visualisation__image-container--error': sourceHasErrored }">
      <img v-if="source" :src="source" draggable="false" class="visualisation__image" @click="addMarker($event)">
      <Spinner v-if="!source && !sourceHasErrored" />

      <MarkerIcon v-for="marker in currentMarkers" :key="marker" class="visualisation__marker" :class="{ 'visualisation__marker--has-hover': isMarkerOverlay }"
      :style="{ left: `${marker.x}%`, top: `${marker.y}%` }" @click="handleMarkerClick(marker.id)" />
    </div>
  </section>
</template>

//todo: markers moeten nog uitgelezen worden in FeedbackComments visualisation
//todo: markers moeten de kleur van hun user hebben
//todo: marker hide/show controls toevoegen + ze moeten alleen zichtbaar zijn als een van de volgende componenten gerendered is: markerOverlay, FeedbackComments

<script>
import { mapGetters, mapActions } from 'vuex';
import { storageRef } from '@/firebase';
import MarkerIcon from '@/assets/icons/OverlayMarkerIcon';
import Spinner from '@/components/Spinner';

export default {
  name: 'Visualisation',
  components: {
    MarkerIcon,
    Spinner,
  },
  props: ['title', 'visualisation', 'isMarkerOverlay'],
  data() {
    return {
      source: null,
      sourceHasErrored: false,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      markers: 'markers',
      sessionMarkers: 'sessionMarkers',
    }),
    currentMarkers() {
      return this.isMarkerOverlay ? this.sessionMarkers : this.markers;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      removeSessionMarker: 'removeSessionMarker',
      addSessionMarker: 'addSessionMarker',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    addMarker(e) {
      if (this.isMarkerOverlay) {
        const rect = e.target.getBoundingClientRect();
        const xInPx = e.clientX - rect.left - (45 / 2); // 45 = width of Marker svg element in px
        const yInPx = e.clientY - rect.top - (45 / 2); // 45 = height of Marker svg element in px
        const xInPerc = ((xInPx / rect.width) * 100);
        const yInPerc = ((yInPx / rect.height) * 100);

        const marker = {
          id: Date.now(),
          x: xInPerc,
          y: yInPerc,
        };

        this.addSessionMarker(marker);
      }
    },
    handleMarkerClick(id) {
      if (this.isMarkerOverlay) {
        this.removeSessionMarker(id);
      }
    },
  },
  async created() {
    try {
      const source = await storageRef.child(`visualisations/${this.visualisation}`).getDownloadURL();
      this.source = source;
    } catch (err) {
      console.error('Error when trying to get downloadableURL for image:', err);
      this.message({ message: 'Could not load visualisation', mode: 'error', duration: 5000 });
      this.sourceHasErrored = true;
    }
  },
};
</script>

<style lang="scss">
@import '@/styles';

.visualisation {
  margin: $space--lg 0;

  &.no-documentation {
    margin: 0 0 $space--xl 0;
  }

  &--marker-overlay {
    @include zoomIn(300ms, $ease--fast);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(#{100vh} - (2 * #{$space--lg}));
  }

  &--marker-overlay & {
    &__image {
      border: $border--ui;
      cursor: crosshair;
    }

    &__marker {
      cursor: pointer;
    }
  }

  &__title-container {
    margin: auto;
    padding: 0 $space--sm-md;
    max-width: calc(#{$documentation-width} - (2 * #{$space--sm-md}));
  }

  &__image {
    @include zoomIn(250ms, $ease--fast);
    display: block;
    margin: auto;
    width: 100%;
    max-height: 95vh;

    &-container {
      position: relative;
      margin: 0 $space--sm-md;

      &--error {
        display: grid;
        place-items: center;
        height: $feedback-image-preview-height;

        &::after {
          content: 'Visualisation could not be loaded.';
        }
      }
    }
  }

  &__marker {
    position: absolute;

    &-glow {
      fill: $purple; //todo: moet user kleur worden
      opacity: 0;
      transform: scale(.1);
      transform-origin: center;
      transition: transform 300ms $ease--fast, opacity 1s $ease--fast;
    }

    &--has-hover:hover & {
      &-glow {
        opacity: .2;
        transform: scale(1);
      }
    }

    &-outline,
    &-dot {
      fill: $black;
    }

    &-background {
      fill: $white; //todo: moet user kleur worden
    }
  }
}
</style>
