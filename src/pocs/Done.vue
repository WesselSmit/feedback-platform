<template>
  <!-- Tijdelijk scherm, in de echte app zal dit scherm en niet zijn en wordt de gebruiker naar het dashboard gestuurd -->
  <h1>You finished the demo!</h1>

  <form>
    <input type="file" @change="selectFile($event)">
    <button @click.prevent="upload()">Upload</button>
  </form>
</template>

<script>
import { storageRef } from '@/firebase';
import { v4 as uuid } from 'uuid';

export default {
  name: 'Done',
  data() {
    return {
      selectedFile: null,
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
          const res = storageRef.child(`feedback/${uuid()}`).put(this.selectedFile);
          console.log(await res);
        } catch (err) {
          console.error('Error trying to upload file:', err);
        }
      } else {
        document.querySelector('form').reset();
        console.log('only .png and .jpg files smaller than 5mb allowed');
      }
    },
  },
};
</script>

<style>

</style>
