<template>
  <section class="confirm-sidebar">
    <div class="confirm-sidebar__inner">
      <h1 v-if="title">{{ title }}</h1>
      <p v-if="body">{{ body }}</p>

      <div v-if="showImageSidebar">
        <form v-if="!selectedFile" class="confirm-sidebar__dropzone" ref="feedbackImageForm" @drop.prevent="handleDrop($event)" @dragenter.prevent @dragover.prevent @click="openFilePicker()">
          <input class="confirm-sidebar__dropzone-input" type="file" ref="feedbackImageInput" @change="selectFile($event)">
          <p class="confirm-sidebar__dropzone-label">Drop a file or <span class="confirm-sidebar__dropzone-label--underline">browse</span></p>
        </form>

        <div v-if="selectedFilePreview" class="confirm-sidebar__preview-container">
          <img :src="selectedFilePreview" class="confirm-sidebar__preview">
          <div class="confirm-sidebar__preview-remove">
            <RemoveIcon class="confirm-sidebar__preview-remove-icon" @click="removeSelectedFile()" />
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
  </section>
</template>

//todo: rules showen, errors states, disabled state van button
//todo (preview): preview grootte checken met 'poster' formaat

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
  data() {
    return {
      allowedTypes: ['png', 'jpg', 'jpeg'],
      maxBytes: 1024 * 1024 * 5,
      selectedFile: null,
      selectedFilePreview: null,
      progress: null,
    };
  },
  computed: {
    ...mapGetters('sidebar', {
      markersAreChanged: 'markersAreChanged',
      showImageSidebar: 'showImageSidebar',
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
      const fileNameParts = this.selectedfile.name.split('.');
      return fileNameParts[fileNameParts.length - 1];
    },
    isValidFile() {
      return this.allowedTypes.includes(this.fileExtension) && this.selectedfile.size <= this.maxBytes;
    },
  },
  methods: {
    ...mapActions('sidebar', {
      updateShowMarkerOverlay: 'updateShowMarkerOverlay',
      saveSessionMarkers: 'saveSessionMarkers',
      updateShowImageSidebar: 'updateShowImageSidebar',
    }),
    showDisabledState(hasDisabled) {
      return hasDisabled && !this.markersAreChanged;
    },
    openFilePicker() {
      this.$refs.feedbackImageInput.click();
    },
    async handleDrop(e) {
      if (e.dataTransfer.files.length === 1) {
        this.selectedFile = e.dataTransfer.files[0];
        this.selectedFilePreview = await this.getPreview();
      } else {
        console.log('too many files selected');
      }
    },
    async selectFile(e) {
      this.selectedFile = e.target.files[0];
      this.selectedFilePreview = await this.getPreview();
    },
    removeSelectedFile() {
      this.selectedFile = null;
      this.selectedFilePreview = null;
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
          this.selectedFile = null;
          this.selectedFilePreview = null;
          break;
        case 'saveImage':
          this.upload();
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
        fr.readAsDataURL(this.selectedFile);
      });
    },
    async upload() {
      if (this.selectedfile) {
        if (this.isValidFile()) {
          try {
            const upload = storageRef.child(`feedback/${uuid()}`).put(this.selectedfile);
            upload.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress}% done`);
              },
              (err) => {
                console.error('Error trying to upload file:', err);
              },
              async () => {
                const imageUrl = await upload.snapshot.ref.getDownloadURL();
                this.updateFeedbackImage(imageUrl);
              });
          } catch (err) {
            console.error('Error trying to upload file:', err);
          }
        } else {
          this.$refs.feedbackImageForm.reset();
          console.log('only .png and .jpg files smaller than 5mb allowed');
        }
      } else {
        console.log('no file selected');
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
        background-color: $white
      }
    }
  }
}
</style>
