<template>
  <section class="feedback-input" id="input">
    <transition name="short-slide-vertical" mode="out-in">
      <div v-if="hasMessage" class="feedback-input__message-container">
        <p :class="{ 'feedback-input__message--confirmation': hasMessage && messageMode === 'succes', 'feedback-input__message--error': hasMessage && messageMode === 'error' }"
        class="feedback-input__message" @click="handleMessageClick()">{{ message.text }}</p>
      </div>
    </transition>

    <div class="feedback-input__container" :class="{ 'feedback-input__container--confirmation': hasMessage && messageMode === 'succes', 'feedback-input__container--error': hasMessage && messageMode === 'error' }">
      <textarea rows="6" placeholder="Don't know what to do? Read the tips above." v-model.trim="textInput" class="feedback-input__input"></textarea>

      <div class="feedback-input__actions">
        <button class="feedback-input__action feedback-input__action-marker" :class="{ 'feedback-input__action--active': numberOfMarkers > 0 }" @click="addMarkers()">
            <MarkerIcon class="feedback-input__action-marker-icon" />
            {{ markerLabel }}
          </button>
        <button class="feedback-input__action feedback-input__action-image" :class="{ 'feedback-input__action--active': feedbackImage }" @click="addImage()">
            <ImageIconZero v-if="!feedbackImage" class="feedback-input__action-image-icon" />
            <ImageIconActive v-if="feedbackImage" class="feedback-input__action-image-icon" />
            {{ imageLabel }}
        </button>
        <button class="feedback-input__action feedback-input__action-comment" :class="{ 'feedback-input__action-comment--disabled': !textInput }" @click="comment()">
          <SendIcon class="feedback-input__action-comment-icon" />
          Comment
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MarkerIcon from '@/assets/icons/ButtonMarkerIcon';
import ImageIconZero from '@/assets/icons/ImageIconZero';
import ImageIconActive from '@/assets/icons/ImageIconActive';
import SendIcon from '@/assets/icons/SendIcon';

export default {
  name: 'FeedbackInput',
  components: {
    MarkerIcon,
    ImageIconZero,
    ImageIconActive,
    SendIcon,
  },
  data() {
    return {
      labels: {
        markersZero: 'Add markers',
        imageZero: 'Add image',
        imageActive: 'Change image',
      },
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      numberOfMarkers: 'numberOfMarkers',
      feedbackImage: 'feedbackImage',
    }),
    ...mapGetters('project', {
      projectId: 'projectId',
    }),
    ...mapGetters('message', {
      message: 'message',
    }),
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
      return this.feedbackImage ? this.labels.imageActive : this.labels.imageZero;
    },
    hasMessage() {
      return this.message && this.message?.hidePopUp;
    },
    messageMode() {
      return this.message.mode;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateTextInput: 'updateTextInput',
      updateShowMarkerOverlay: 'updateShowMarkerOverlay',
      startNewMarkerSession: 'startNewMarkerSession',
      resetAllMarkers: 'resetAllMarkers',
      updateShowImageSidebar: 'updateShowImageSidebar',
      updateFeedbackImage: 'updateFeedbackImage',
      resetImageState: 'resetImageState',
      updateSelectedImagePreview: 'updateSelectedImagePreview',
      updateActiveTab: 'updateActiveTab',
      updateActiveTabIndex: 'updateActiveTabIndex',
    }),
    ...mapActions('feedback', {
      postComment: 'postComment',
    }),
    ...mapActions('message', {
      setMessage: 'message',
    }),
    addMarkers() {
      this.updateShowMarkerOverlay(true);
      this.startNewMarkerSession();
    },
    addImage() {
      this.updateShowImageSidebar(true);
      this.resetImageState();
    },
    async comment() {
      if (this.textInput) {
        await this.postComment({ projectId: this.projectId, comment: this.textInput });
        this.resetAllMarkers();
        this.updateFeedbackImage(null);
        this.resetImageState();
        this.updateSelectedImagePreview(null);
        this.textInput = '';
        this.setMessage({ message: 'Feedback saved, find it back in the "view feedback" tab.', mode: 'succes', hidePopUp: true });
      } else {
        this.setMessage({ message: 'Don\'t forget to enter feedback', mode: 'error', hidePopUp: true });
      }
    },
    handleMessageClick() {
      if (this.messageMode === 'succes') {
        this.updateActiveTab('view');
        this.updateActiveTabIndex(1);
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-input {
  &__message {
    margin-bottom: $space--xsm;
    padding: $space--xsm;
    text-align: center;
    font-size: $font-size--md;
    border: 1px solid transparent;
    border-radius: $border-radius;
    transition: all 500ms $ease--fast;

    &--confirmation {
      background-color: $green--light;
      color: $green;
      cursor: pointer;
    }

    &--error {
      background-color: $red--light;
      color: $red;
      cursor: default;
    }

    &-container {
      transition: height;
    }
  }

  &__container {
    position: relative;
    z-index: 10;
    border: 1px solid $black;
    border-radius: $border-radius;
    transition: all 500ms $ease--fast;

    &--confirmation {
      border-color: $green;

      .feedback-input__actions {
        border-color: $green;
      }
    }

    &--error {
      border-color: $red;

      .feedback-input__actions {
        border-color: $red;
      }
    }
  }

  &__input {
    width: 100%;
    padding: $space--xsm;
    background-color: $gray--sidebar;
    border: 1px solid transparent;
    border-radius: $border-radius;
  }

  &__actions {
    display: flex;
    align-items: center;
    height: $feedbfack-actions-height;
    border-top: $border--ui;
    border-radius: 0 0 $border-radius $border-radius;
    transition: all 500ms $ease--fast;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(#{$feedbfack-actions-height} - 1px);
    padding: 0 $space--sm;
    background-color: $gray--sidebar;
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
      &-marker,
      &-image {
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
      box-sizing: content-box;
      height: calc(100% - 2px);
      margin-right: -1px;
      margin-left: auto;
      color: $purple;
      background-color: $gray--sidebar;
      border: 2px solid $purple;
      border-radius: $border-radius !important;

      &:hover,
      &:focus {
        background-color: $purple--opacity;
      }

      &--disabled,
      &--disabled:hover,
      &--disabled:focus {
        background-color: $gray--dark-opacity;
        color: $gray--dark;
        border-color: transparent;
        cursor: default;
      }

      &-icon {
        margin-right: $space--sm;
      }
    }
  }
}
</style>
