<template>
  <section class="feedback-input">
      <div class="feedback-input__container">
        <textarea rows="7" placeholder="Lorem ipsum" v-model.trim="textInput" class="feedback-input__input"></textarea>
        <div class="feedback-input__actions">
          <button class="feedback-input__action feedback-input__action--marker" @click="addMarkers()">
              <MarkerIcon class="feedback-input__action-icon" />
              {{ markerLabel }}
            </button>
          <button class="feedback-input__action feedback-input__action--image" @click="addImage()">
              <ImageIcon class="feedback-input__action-icon" />
              {{ imageLabel }}
            </button>
          <!-- <button class="feedback-input__action feedback-input__action--comment" @click="comment()">Comment</button> -->
        </div>
      </div>
  </section>
</template>

//todo: sla de comments op in een DB
//todo: commenten moet disabled zijn als de textArea leeg is
//todo: als dit component focus heeft dan moet de FeedbackHelper helper state ipv de zero state getoond worden

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
      textInput: '',
      labels: {
        marker: 'Add markers',
        image: 'Add image',
      },
    };
  },
  computed: {
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
    comment() {},
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

    &--comment {
      margin-left: auto;
      background-color: $purple--opacity;
      color: $purple;
    }

    &-icon {
      margin-right: $space--sm;
    }
  }
}
</style>
