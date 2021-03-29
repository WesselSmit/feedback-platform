<template>
  <section class="feedback-input">
      <div class="feedback-input__container">
        <textarea rows="7" placeholder="Lorem ipsum" v-model.trim="textInput" class="feedback-input__input"></textarea>

        <div class="feedback-input__actions">
          <button class="feedback-input__action feedback-input__action-marker" @click="addMarkers()">
              <MarkerIcon class="feedback-input__action-icon" />
              {{ markerLabel }}
            </button>
          <button class="feedback-input__action feedback-input__action-image" @click="addImage()">
              <ImageIcon class="feedback-input__action-icon" />
              {{ imageLabel }}
          </button>
          <button class="feedback-input__action feedback-input__action-comment" :class="{ 'feedback-input__action-comment--disabled': !textInput }" @click="comment()">Comment</button>
        </div>
      </div>
  </section>
</template>

//todo: add comment to post (localStorage of DB)

<script>
import MarkerIcon from '@/assets/icons/MarkerIcon';
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
        marker: 'Add markers',
        image: 'Add image',
      },
    };
  },
  computed: {
    textInput: {
      get() {
        return this.$store.getters['sidebar/textInput'];
      },
      set(value) {
        this.$store.dispatch('sidebar/updateTextInput', value);
      },
    },
    markerLabel() {
      return this.labels.marker;
    },
    imageLabel() {
      return this.labels.image;
    },
  },
  methods: {
    addMarkers() {},
    addImage() {},
    comment() {
      if (this.textInput) {
        console.log('this should be posted');
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
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: 0;
    transition: all 500ms $ease;
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

    &:hover &,
    &:focus & {
      &-icon {
        fill: $purple;
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

    &-icon {
      margin-right: $space--sm;
    }
  }
}
</style>
