<template>
  <!-- Tijdelijk scherm, in de echte app zal dit scherm en niet zijn en wordt de gebruiker naar het dashboard gestuurd -->
  <h1>You finished the demo!</h1>

  <form ref="feedbackImageForm">
    <input type="file" ref="feedbackImageInput" @change="selectFile($event)">
    <button @click.prevent="openFilePicker()">Browse</button>
  </form>

  <button @click.prevent="upload()">Upload</button>
</template>

<script>
import { storage, storageRef } from '@/firebase';
import { v4 as uuid } from 'uuid';

export default {
  name: 'Done',
  data() {
    return {
      selectedFile: null,
      progress: 0,
    };
  },
  methods: {
    openFilePicker() {
      this.$refs.feedbackImageInput.click();
    },
    selectFile(e) {
      this.selectedFile = e.target.files[0];
    },
    async upload() {
      if (this.selectedFile) {
        const fileNameParts = this.selectedFile.name.split('.');
        const extension = fileNameParts[fileNameParts.length - 1];
        const allowedTypes = ['png', 'jpg', 'jpeg'];
        const maxBytes = 1024 * 1024 * 5;

        if (allowedTypes.includes(extension) && this.selectedFile.size <= maxBytes) {
          try {
            const upload = storageRef.child(`feedback/${uuid()}`).put(this.selectedFile);
            upload.on('state_changed',
              (snapshot) => {
                this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${this.progress}% done`);
              },
              (err) => {
                console.error('Error trying to upload file:', err);
              },
              async () => {
                const downloadURL = await upload.snapshot.ref.getDownloadURL();
                console.log('File available at', downloadURL);
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

<style>

</style>
