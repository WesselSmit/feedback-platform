<template>
  <section class="feedback-input">
      <div class="feedback-input__container">
        <textarea rows="6" placeholder="Hit a wall? Read the tips." v-model.trim="textInput" class="feedback-input__input"></textarea>

        <div class="feedback-input__actions">
          <button class="feedback-input__action feedback-input__action-marker" :class="{ 'feedback-input__action--active': this.numberOfMarkers > 0 }" @click="addMarkers()">
              <MarkerIcon class="feedback-input__action-marker-icon" />
              {{ markerLabel }}
            </button>
          <button class="feedback-input__action feedback-input__action-image" @click="addImage()">
              <ImageIcon class="feedback-input__action-image-icon" />
              {{ imageLabel }}
          </button>
          <button class="feedback-input__action feedback-input__action-comment" :class="{ 'feedback-input__action-comment--disabled': !textInput }" @click="comment()">Comment</button>
        </div>
      </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MarkerIcon from '@/assets/icons/ButtonMarkerIcon';
import ImageIcon from '@/assets/icons/ImageIcon';

export default {
  name: 'FeedbackInput',
  components: {
    MarkerIcon,
    ImageIcon,
  },
  data() {
    return {
      labels: {
        markersZero: 'Add markers',
        image: 'Add image',
      },
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      numberOfMarkers: 'numberOfMarkers',
    }),
    projectId() {
      // return 'poc-give-boxing'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
      return 'poc-give-twitter'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
    },
    textInput: {
      get() {
        return this.$store.getters['sidebar/textInput'];
      },
      set(value) {
        this.updateTextInput(value);
      },
    },
    markerLabel() {
      let label;
      label = (this.numberOfMarkers > 0) ? `${this.numberOfMarkers} marker` : this.labels.markersZero;
      label += (this.numberOfMarkers > 1) ? 's' : '';
      return label;
    },
    imageLabel() {
      return this.labels.image;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateTextInput: 'updateTextInput',
      updateShowMarkerOverlay: 'updateShowMarkerOverlay',
      startNewMarkerSession: 'startNewMarkerSession',
    }),
    ...mapActions('feedback', {
      postComment: 'postComment',
    }),
    addMarkers() {
      this.updateShowMarkerOverlay(true);
      this.startNewMarkerSession();
    },
    addImage() {},
    comment() {
      if (this.textInput) {
        this.postComment({ projectId: this.projectId, comment: this.textInput });
        this.textInput = '';
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-input {
  &__container {
    border: 1px solid $black;
    border-radius: $border-radius;
  }

  &__input {
    width: 100%;
    padding: $space--xsm;
    border: 1px solid transparent;
    border-radius: $border-radius;
  }

  &__actions {
    display: flex;
    align-items: center;
    height: $feedbfack-actions-height;
    border-top: $border--ui;
    border-radius: 0 0 $border-radius $border-radius;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(#{$feedbfack-actions-height} - 1px);
    padding: 0 15px;
    background-color: $white;
    color: $black;
    white-space: nowrap;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: 0;
    transition: all 500ms $ease--fast;
    cursor: pointer;

    &:first-of-type {
      border-radius: 0 0 0 $border-radius;
    }

    &:last-of-type {
      border-radius: 0 0 $border-radius 0;
    }

    &:hover,
    &:focus {
      background-color: $purple--opacity;
      color: $purple;
    }

    &--active {
      color: $purple;
    }

    &--active & {
      &-marker {
        &-icon {
          fill: $purple;
        }
      }
    }

    &-marker {
      &-icon {
        margin-right: $space--sm;

        &-background {
          fill: $white;
        }
      }

      &:hover &,
      &:focus & {
        &-icon {
          &-outline,
          &-dot {
            fill: $purple;
          }

          &-background {
            fill: none;
          }
        }
      }
    }

    &-image {
      &-icon {
        margin-right: $space--sm;
      }

      &:hover &,
      &:focus & {
        &-icon {
          fill: $purple;
        }
      }
    }

    &-comment {
      margin-left: auto;
      color: $purple;

      &--disabled,
      &--disabled:hover,
      &--disabled:focus {
        background-color: $gray--dark-opacity;
        color: $gray--dark;
        cursor: default;
      }
    }
  }
}
</style>
