<template>
  <div class="feedback-image">
    <img v-if="source" :src="source" class="feedback-image__image" />
    <Spinner v-if="!source" />
  </div>
</template>

<script>
import { storageRef } from '@/firebase';
import Spinner from './Spinner';

export default {
  name: 'FeedbackImage',
  components: {
    Spinner,
  },
  props: ['imageId'],
  data() {
    return {
      source: null,
    };
  },
  async created() {
    try {
      this.source = await storageRef.child(`feedback/${this.imageId}`).getDownloadURL();
    } catch (err) {
      console.error(`Could not load feedback image ${this.imageId}`);
    }
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-image {
  max-width: 100%;

  &__image {
    @include zoomIn(100ms, ease);
    display: block;
    margin: auto;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 350px;
    border: $border--ui;
  }
}
</style>
