<template>
  <!-- Tijdelijk scherm, in de echte app zal dit scherm en niet zijn en wordt de gebruiker naar het dashboard gestuurd -->
  <h1>You finished the demo!</h1>

  <form ref="feedbackImageForm">
    <input type="file" ref="feedbackImageInput" @change="selectFile($event)">
    <button @click.prevent="$refs.feedbackImageInput.click()">Browse</button>
    <button @click.prevent="upload()">Upload</button>
  </form>
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
    selectFile(e) {
      this.selectedFile = e.target.files[0];
    },
    async upload() {
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
              switch (snapshot.state) {
                case storage.TaskState.PAUSED:
                  console.log('Upload is paused');
                  break;
                case storage.TaskState.RUNNING:
                  console.log('Upload is running');
                  break;
                default:
                  console.log('switch case not handled');
              }
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
    },
  },
};
</script>

<style>

</style>
