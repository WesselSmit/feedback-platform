<template>
  <div class="setup-upload">
    <div v-if="rules && !visualisationPreview" class="setup-upload__rules-container">
      <p class="setup-upload__rules">{{ rules }}</p>
    </div>

    <div>
      <form v-if="!visualisationPreview" class="setup-upload__dropzone" @drop.prevent="handleDrop($event)" @dragenter.prevent @dragover.prevent @click="openFilePicker()">
        <input class="setup-upload__dropzone-input" type="file" ref="feedbackImageInput" @change="selectFile($event)">
        <p class="setup-upload__dropzone-label">Drop a file or <span class="setup-upload__dropzone-label--underline">browse</span></p>
      </form>

      <div v-if="visualisationPreview" class="setup-upload__preview-container">
        <img :src="visualisationPreview" class="setup-upload__preview">
        <div class="setup-upload__preview-remove" @click="removeSelectedFile()">
          <RemoveIcon class="setup-upload__preview-remove-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RemoveIcon from '@/assets/icons/RemoveIcon';

export default {
  name: 'SetupVisualisation',
  components: {
    RemoveIcon,
  },
  props: ['content'],
  computed: {
    ...mapGetters('setup', {
      visualisation: 'visualisation',
      visualisationPreview: 'visualisationPreview',
    }),
    rules() {
      return this.content.rules;
    },
  },
  methods: {
    ...mapActions('setup', {
      updateVisualisation: 'updateVisualisation',
      updateVisualisationPreview: 'updateVisualisationPreview',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    openFilePicker() {
      this.$refs.feedbackImageInput.click();
    },
    async handleDrop(e) {
      if (e.dataTransfer.files.length === 1) {
        this.updateVisualisation(e.dataTransfer.files[0]);
        this.updateVisualisationPreview(await this.getPreview());
      } else {
        this.message({ message: 'too many files selected', mode: 'error' });
      }
    },
    async selectFile(e) {
      this.updateVisualisation(e.target.files[0]);
      this.updateVisualisationPreview(await this.getPreview());
    },
    removeSelectedFile() {
      this.updateVisualisation(null);
      this.updateVisualisationPreview(null);
    },
    getPreview() {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => reject();
        fr.readAsDataURL(this.visualisation);
      });
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.setup-upload {
  &__rules {
    margin: $space--xsm 0;

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0 10px;
      background-color: $gray--light-extra;
      border: 1px solid transparent;
      border-radius: $border-radius;
    }
  }

  &__dropzone {
    display: grid;
    place-items: center;
    height: $dropzone-height;
    border: 1px solid $black;
    border-radius: $border-radius;
    border-style: dashed;
    cursor: pointer;

    &-input {
      display: none;
    }

    &-label {
      color: black;

      &--underline {
        text-decoration: underline;
      }
    }
  }

  &__preview {
    max-width: calc(#{$popup-width--large} - (2 * #{$space--sm-md}));
    max-height: $setup-visualisation-height;
    border: $border--ui;

    &-container {
      @include zoomIn(300ms, $ease--fast);
      position: relative;
      display: grid;
      place-items: center;
      width: min-content;
      margin: auto;

      &:hover {
        .setup-upload__preview-remove {
          opacity: 1;
        }
      }
    }

    &-remove {
      position: absolute;
      top: $space--sm;
      right: $space--sm;
      display: grid;
      place-items: center;
      padding: $space--xsm;
      border: 1px solid transparent;
      border-radius: $border-radius;
      opacity: 0;
      background-color: $white;
      cursor: pointer;
      transition: all 500ms $ease--fast;

      &:hover {
        background-color: $purple--opacity-solid;
      }

      &:hover & {
        &-icon {
          fill: $purple;
        }
      }

      &-icon {
        fill: $black;
        transition: fill 500ms $ease--fast;
      }
    }
  }
}
</style>
