<template>
  <section class="confirm-sidebar">
    <div class="confirm-sidebar__inner">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>

      <div v-if="showImageSidebar">
        <form v-if="!selectedImage" class="confirm-sidebar__dropzone" ref="feedbackImageForm" @drop.prevent="handleDrop($event)" @dragenter.prevent @dragover.prevent @click="openFilePicker()">
          <input class="confirm-sidebar__dropzone-input" type="file" ref="feedbackImageInput" @change="selectFile($event)">
          <p class="confirm-sidebar__dropzone-label">Drop a file or <span class="confirm-sidebar__dropzone-label--underline">browse</span></p>
        </form>

        <div v-if="selectedImagePreview" class="confirm-sidebar__preview-container">
          <img :src="selectedImagePreview" class="confirm-sidebar__preview">
          <div class="confirm-sidebar__preview-remove" @click="removeSelectedFile()">
            <RemoveIcon class="confirm-sidebar__preview-remove-icon" />
          </div>
        </div>
      </div>

      <div class="confirm-sidebar__buttons" :class="{ 'confirm-sidebar__buttons--multiple': hasMultiple }">
        <button v-for="(button, name) in navigation"
          :key="name" class="confirm-sidebar__button"
          :class="{ 'confirm-sidebar__button--outline': button.hasOutline, 'confirm-sidebar__button--disabled': showDisabledState(button.hasDisabled)}"
          @click="handleNavigationButton(button)">
          {{ button.label }}
        </button>
      </div>
    </div>
    <p>feedbackImage: {{ this.feedbackImage }}</p>
    <p>selectedImage: {{ this.selectedImage }}</p>
    <p>selectedImagePreview: {{ this.selectedImagePreview }}</p>
    <p>is changed: {{ this.imageIsChanged }}</p>
  </section>
</template>

//todo: als er een afbeelding toegevoegd is en de gebruiker opnieuw de ConfirmSidebar opent en vervolgens de image removed; als je cancelled blijft de (selectedImage) image weg (deze moet ge-restored worden)
//todo: de states/interacties wanneer een afbeelding al toegevoegd is en je opnieuw de image-ConfirmSidebar opent kloppen nog niet
//todo: laatste check: check alle mogelijkheden --> kloppen de states en bijhroende data? zijn de buttons goed disabled? wordt de image daadwerkelijk opgeslagen in firebase?
//todo: rules showen
//todo: errors states (in een pop-up links onderin het beeld)

<script>
import { mapGetters, mapActions } from 'vuex';
import { storageRef } from '@/firebase';
import { v4 as uuid } from 'uuid';
import RemoveIcon from '@/assets/icons/RemoveIcon';

export default {
  name: 'ConfirmSidebar',
  components: {
    RemoveIcon,
  },
  props: ['content'],
  computed: {
    ...mapGetters('sidebar', {
      showMarkerOverlay: 'showMarkerOverlay',
      markersAreChanged: 'markersAreChanged',
      showImageSidebar: 'showImageSidebar',
      selectedImage: 'selectedImage',
      selectedImagePreview: 'selectedImagePreview',
      imageIsChanged: 'imageIsChanged',
      feedbackImage: 'feedbackImage',
    }),
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    navigation() {
      return this.content.navigation;
    },
    hasMultiple() {
      return this.content.navigation.length > 1;
    },
    fileExtension() {
      const fileNameParts = this.selectedImage.name.split('.');
      return fileNameParts[fileNameParts.length - 1];
    },
    isValidFile() {
      const allowedTypes = ['png', 'jpg', 'jpeg'];
      const maxBytes = 1024 * 1024 * 5;
      return allowedTypes.includes(this.fileExtension) && this.selectedImage.size <= maxBytes;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateShowMarkerOverlay: 'updateShowMarkerOverlay',
      saveSessionMarkers: 'saveSessionMarkers',
      updateShowImageSidebar: 'updateShowImageSidebar',
      updateFeedbackImage: 'updateFeedbackImage',
      updateSelectedImage: 'updateSelectedImage',
      updateSelectedImagePreview: 'updateSelectedImagePreview',
      resetFeedbackImage: 'resetFeedbackImage',
    }),
    showDisabledState(hasDisabled) {
      if (this.showMarkerOverlay) {
        return hasDisabled && !this.markersAreChanged;
      }
      if (this.showImageSidebar) {
        return hasDisabled && !this.imageIsChanged;
      }
    },
    openFilePicker() {
      this.$refs.feedbackImageInput.click();
    },
    async handleDrop(e) {
      if (e.dataTransfer.files.length === 1) {
        this.updateSelectedImage(e.dataTransfer.files[0]);
        this.updateSelectedImagePreview(await this.getPreview());
      } else {
        console.log('too many files selected');
      }
    },
    async selectFile(e) {
      this.updateSelectedImage(e.target.files[0]);
      this.updateSelectedImagePreview(await this.getPreview());
    },
    removeSelectedFile() {
      this.updateSelectedImage(null);
      this.updateSelectedImagePreview(null);
    },
    handleNavigationButton({ action }) {
      if (action.hasOwnProperty('target')) {
        this.$router.push(action.target);
      }

      switch (action) {
        case 'cancelMarkers':
          this.updateShowMarkerOverlay(false);
          break;
        case 'saveMarkers':
          if (this.markersAreChanged) {
            this.updateShowMarkerOverlay(false);
            this.saveSessionMarkers();
          }
          break;
        case 'cancelImage':
          this.updateShowImageSidebar(false);
          if (this.imageIsChanged) {
            this.updateSelectedImage(null);
            this.updateSelectedImagePreview(null);
          }
          break;
        case 'saveImage':
          if (this.imageIsChanged) {
            this.upload();
            this.updateShowImageSidebar(false);
          }
          break;
        default:
          console.log('switch case not handled');
      }
    },
    getPreview() {
      return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => reject();
        fr.readAsDataURL(this.selectedImage);
      });
    },
    async upload() {
      if (this.isValidFile) {
        try {
          const imageId = uuid();
          const upload = storageRef.child(`feedback/${imageId}`).put(this.selectedImage);
          upload.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (err) => {
              console.error('Error trying to upload file:', err);
            },
            () => {
              this.updateFeedbackImage({ id: imageId, file: this.selectedImage });
            });
        } catch (err) {
          console.error('Error trying to upload file:', err);
        }
      } else {
        this.$refs.feedbackImageForm.reset();
        console.log('only .png and .jpg files smaller than 5mb allowed');
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.confirm-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: $space--sm-md;
  width: $sidebar-width;
  min-height: 100vh;
  max-height: 100vh;
  border-left: $border--ui;

  &__dropzone {
    display: grid;
    place-items: center;
    height: $dropzone-height;
    border: $border--drop;
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
    max-width: calc(#{$sidebar-width} - (2 * #{$space--sm-md}));
    max-height: $feedback-image-preview-height;
    border: $border--ui;

    &-container {
      position: relative;
      display: grid;
      place-items: center;
      width: min-content;
      margin: auto;

      &:hover {
        .confirm-sidebar__preview-remove {
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

  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin: $space--lg 0 0;

    &--multiple {
      justify-content: space-between;
    }
  }

  &__button {
    height: $button-height;
    width: 150px;
    background-color: $white;
    color: $purple;
    text-transform: uppercase;
    border: 2px solid transparent;
    border-radius: $border-radius;
    transition: all 500ms $ease--fast;
    cursor: pointer;

    &:hover {
      background-color: $purple--opacity;
    }

    &--outline {
      border: $border--button;
    }

    &--disabled {
      color: $gray--dark;
      border-color: $gray--dark-opacity;
      cursor: default;

      &:hover {
        background-color: $white;
      }
    }
  }
}
</style>
