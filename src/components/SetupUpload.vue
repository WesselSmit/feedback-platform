<template>
  SetupUpload
  <!-- <div class="setup-upload">
    <div v-if="rules" class="setup-upload__rules-container">
      <p class="setup-upload__rules">{{ rules }}</p>
    </div>

    <div>
      <form v-if="!selectedImagePreview" class="setup-upload__dropzone" @drop.prevent="handleDrop($event)" @dragenter.prevent @dragover.prevent @click="openFilePicker()">
        <input class="setup-upload__dropzone-input" type="file" ref="feedbackImageInput" @change="selectFile($event)">
        <p class="setup-upload__dropzone-label">Drop a file or <span class="setup-upload__dropzone-label--underline">browse</span></p>
      </form>

      <div v-if="selectedImagePreview" class="setup-upload__preview-container">
        <img :src="selectedImagePreview" class="setup-upload__preview">
        <div class="setup-upload__preview-remove" @click="removeSelectedFile()">
          <RemoveIcon class="setup-upload__preview-remove-icon" />
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
// import { storageRef } from '@/firebase';
// import { v4 as uuid } from 'uuid';
// import RemoveIcon from '@/assets/icons/RemoveIcon';

export default {
  name: 'SetupUpload',
  //   components: {
  //     RemoveIcon,
  //   },
  props: ['content'],
  //   data() {
  //     return {
  //       removedImage: null,
  //     };
  //   },
  //   computed: {
  //     ...mapGetters('sidebar', {
  //       showImageSidebar: 'showImageSidebar',
  //       feedbackImage: 'feedbackImage',
  //       selectedImageBackup: 'selectedImageBackup',
  //       selectedImage: 'selectedImage',
  //       selectedImagePreview: 'selectedImagePreview',
  //       imageIsChanged: 'imageIsChanged',
  //     }),
  //     rules() {
  //       return this.content.rules;
  //     },
  //     fileExtension() {
  //       const fileNameParts = this.selectedImage.name.split('.');
  //       return fileNameParts[fileNameParts.length - 1];
  //     },
  //     isValidFile() {
  //       const allowedTypes = ['png', 'jpg', 'jpeg'];
  //       const maxBytes = 1024 * 1024 * 5;
  //       return allowedTypes.includes(this.fileExtension) && this.selectedImage.size <= maxBytes;
  //     },
  //   },
  //   methods: {
  //     ...mapActions('sidebar', {
  //       updateShowImageSidebar: 'updateShowImageSidebar',
  //       updateSelectedImage: 'updateSelectedImage',
  //       updateSelectedImagePreview: 'updateSelectedImagePreview',
  //       updateFeedbackImage: 'updateFeedbackImage',
  //       resetImageState: 'resetImageState',
  //     }),
  //     ...mapActions('message', {
  //       message: 'message',
  //     }),
  //     openFilePicker() {
  //       this.$refs.feedbackImageInput.click();
  //     },
  //     async handleDrop(e) {
  //       if (e.dataTransfer.files.length === 1) {
  //         // this.updateSelectedImage(e.dataTransfer.files[0]);
  //         // this.updateSelectedImagePreview(await this.getPreview());
  //       } else {
  //         this.message({ message: 'too many files selected', mode: 'error' });
  //       }
  //     },
  //     async selectFile(e) {
  //       // this.updateSelectedImage(e.target.files[0]);
  //       // this.updateSelectedImagePreview(await this.getPreview());
  //     },
  //     removeSelectedFile() {
  //       // this.updateSelectedImage(null);
  //       // this.removedImage = this.selectedImagePreview;
  //       // this.updateSelectedImagePreview(null);
  //     },
  //     handleNavigationButton({ action }) {
  //       // if (action.hasOwnProperty('target')) {
  //       //   this.$router.push(action.target);
  //       // }

  //       // switch (action) {
  //       //   case 'cancelImage':
  //       //     this.updateShowImageSidebar(false);
  //       //     if (this.imageIsChanged) {
  //       //       this.resetImageState();
  //       //       this.updateSelectedImagePreview(this.removedImage);
  //       //       if (!this.feedbackImage) {
  //       //         this.updateSelectedImagePreview(null);
  //       //       }
  //       //     }
  //       //     break;
  //       //   case 'saveImage':
  //       //     if (this.imageIsChanged) {
  //       //       this.upload();
  //       //       this.updateShowImageSidebar(false);

//       //       if (!this.selectedImage) { // if there was an image but the user removed it
//       //         this.message({ message: 'Image changes saved', mode: 'succes' });
//       //       }
//       //     }
//       //     break;
//       //   default:
//       //     console.log('switch case not handled');
//       //     this.message({ message: 'Something unexpected happened', mode: 'error' });
//       // }
//     },
//     getPreview() {
//       return new Promise((resolve, reject) => {
//         const fr = new FileReader();
//         fr.onload = () => resolve(fr.result);
//         fr.onerror = () => reject();
//         fr.readAsDataURL(this.selectedImage);
//       });
//     },
//     async upload() {
//       // if (!this.selectedImage) {
//       //   this.updateFeedbackImage(null);
//       //   this.resetImageState();
//       // } else if (this.isValidFile) {
//       //   try {
//       //     const imageId = uuid();
//       //     const upload = storageRef.child(`visualisations/${imageId}`).put(this.selectedImage);
//       //     upload.on('state_changed',
//       //       (snapshot) => {
//       //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       //         console.log(`Upload is ${progress}% done`);
//       //       },
//       //       (err) => {
//       //         console.error('Error trying to upload file:', err);
//       //         this.message({ message: 'Something went wrong', mode: 'error' });
//       //       },
//       //       () => {
//       //         this.updateFeedbackImage({ id: imageId, file: this.selectedImage });
//       //         this.message({ message: 'Image added to feedback', mode: 'succes' });
//       //       });
//       //   } catch (err) {
//       //     console.error('Error trying to upload file:', err);
//       //     this.message({ message: 'Something went wrong', mode: 'error' });
//       //   }
//       // } else {
//       //   this.message({ message: 'only .png and .jpg files smaller than 5mb allowed', mode: 'error' });
//       //   this.updateShowImageSidebar(false);
//       //   this.resetImageState();
//       //   this.updateSelectedImagePreview(null);
//       // }
//     },
//   },
};
</script>

<style lang="scss">
// @import '@/styles';

// .setup-upload {
//   &__rules {
//     margin: $space--xsm 0;

//     &-container {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       margin: 0 0 10px;
//       background-color: $gray--light-extra;
//       border: 1px solid transparent;
//       border-radius: $border-radius;
//     }
//   }

//   &__dropzone {
//     display: grid;
//     place-items: center;
//     height: $dropzone-height;
//     border: 1px solid $black;
//     border-radius: $border-radius;
//     border-style: dashed;
//     cursor: pointer;

//     &-input {
//       display: none;
//     }

//     &-label {
//       color: black;

//       &--underline {
//         text-decoration: underline;
//       }
//     }
//   }

//   &__preview {
//     max-width: calc(#{$sidebar-width} - (2 * #{$space--sm-md}));
//     max-height: $feedback-image-preview-height;
//     border: $border--ui;

//     &-container {
//       @include zoomIn(300ms, $ease--fast);
//       position: relative;
//       display: grid;
//       place-items: center;
//       width: min-content;
//       margin: auto;

//       &:hover {
//         .confirm-sidebar__preview-remove {
//           opacity: 1;
//         }
//       }
//     }

//     &-remove {
//       position: absolute;
//       top: $space--sm;
//       right: $space--sm;
//       display: grid;
//       place-items: center;
//       padding: $space--xsm;
//       border: 1px solid transparent;
//       border-radius: $border-radius;
//       opacity: 0;
//       background-color: $white;
//       cursor: pointer;
//       transition: all 500ms $ease--fast;

//       &:hover {
//         background-color: $purple--opacity-solid;
//       }

//       &:hover & {
//         &-icon {
//           fill: $purple;
//         }
//       }

//       &-icon {
//         fill: $black;
//         transition: fill 500ms $ease--fast;
//       }
//     }
//   }
// }
</style>
