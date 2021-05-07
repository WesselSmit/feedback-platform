<template>
  <section class="visualisation" :class="{ 'visualisation--marker-overlay': isMarkerOverlay }">
    <div v-if="title" class="visualisation__title-container">
      <h3>{{ title }}</h3>
    </div>

    <div class="visualisation__image-container" :class="{ 'visualisation__image-container--error': sourceHasErrored }">
      <img v-if="source" :src="source" draggable="false" class="visualisation__image" @click="addMarker($event)">
      <Spinner v-if="!source && !sourceHasErrored" />

      <div class="visualisation__comment-markers" v-for="comment in markersPerComment" :key="comment">
        <MarkerIcon v-for="marker in comment" :key="marker" class="visualisation__marker" :style="{ left: `${marker.x}%`, top: `${marker.y}%` }"
        :class="{ 'visualisation__marker--has-hover--overlay': isMarkerOverlay, 'visualisation__marker--has-hover--sidebar': markerIsFeedbackInteractive }"
        :showColor="markerIsFeedbackInteractive" :color="marker.color" @click="handleMarkerClick(marker)" />
      </div>
    </div>
  </section>
</template>

//todo: visualisations worden gestretched/uit hun aspect ratio gehaald als het poster images zijn
//todo: marker hide/show controls toevoegen + ze moeten alleen zichtbaar zijn als een van de volgende componenten gerendered is: markerOverlay, FeedbackComments

<script>
import { mapGetters, mapActions } from 'vuex';
import { storageRef } from '@/firebase';
import Spinner from '@/components/Spinner';
import MarkerIcon from '@/assets/icons/OverlayMarkerIcon';

export default {
  name: 'Visualisation',
  components: {
    Spinner,
    MarkerIcon,
  },
  props: ['title', 'visualisation', 'isMarkerOverlay', 'pageMode'],
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
      activeTab: 'activeTab',
    }),
    ...mapGetters('feedback', {
      comments: 'comments',
    }),
    markersPerComment() {
      if (this.pageMode === 'view' && this.activeTab === 'insights') return null; // markers should not be visible when in 'insights' tab

      let comments;
      if (this.pageMode === 'give' && this.activeTab === 'give' || this.isMarkerOverlay) {
        const markers = this.isMarkerOverlay ? this.sessionMarkers : this.markers; // prevent side effects by by assigning 'this.markers' to 'markers'
        comments = [{ markers }]; // template expects the markers in this structure
      } else if (this.pageMode === 'give' && this.activeTab === 'view' || this.pageMode === 'view' && this.activeTab === 'feedback') {
        comments = this.comments; // prevent side effects by by assigning 'this.comments' to 'comments'
      } else {
        return null; // needed becuase in initial state the getters return undefined and the next code block would throw an error
      }

      return comments.map((comment) => {
        const markers = this.cleanSource(comment.markers); // idk why, but somehow the comment.markers is still reactive so this.cleanSource() is needed
        markers.forEach((marker) => {
          marker.color = comment?.user?.color || null;
          marker.commentId = comment.id;
        });
        return markers;
      });
    },
    markerIsFeedbackInteractive() { // with 'feedback interactive' I mean it interacts with the sidebar when clicked (think: scroll to associated comment in sidebar), this is not the case in markerOverlay or the 'give' tab,
      return !((this.pageMode === 'give' && this.activeTab === 'give' || this.isMarkerOverlay));
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
    handleMarkerClick(marker) {
      if (this.isMarkerOverlay) {
        this.removeSessionMarker(marker.id);
      } else if (this.pageMode === 'give' && this.activeTab === 'view' || this.pageMode === 'view' && this.activeTab === 'feedback') {
        const comment = document.querySelector(`[data-comment-id="${marker.commentId}"]`);

        if (comment) {
          comment.scrollIntoView({ behavior: 'smooth', block: 'end' });
          comment.classList.add('feedback-comments__comment--highlighted');

          setTimeout(() => {
            comment.classList.remove('feedback-comments__comment--highlighted');
          }, 2000);
        }
      }
    },
    cleanSource(source) {
      // use native JSON functions to remove the reactivity so objects (including arrays) can be cloned without mutating the original source
      // also see: https://forum.vuejs.org/t/how-to-remove-array-binding/53751
      return JSON.parse(JSON.stringify(source));
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
      fill: $purple;
      opacity: 0;
      transform: scale(.1);
      transform-origin: center;
      transition: transform 300ms $ease--fast, opacity 1s $ease--fast;
    }

    &--has-hover--overlay:hover &,
    &--has-hover--sidebar:hover & {
      &-glow {
        opacity: .2;
        transform: scale(1);
      }
    }

    &--has-hover--sidebar {
      cursor: pointer;
    }

    &-outline,
    &-dot {
      fill: $black;
    }

    &-background {
      fill: $white;
    }
  }
}
</style>
