<template>
  <!-- Tijdelijk scherm, in de echte app zal dit scherm en niet zijn en wordt de gebruiker naar het dashboard gestuurd -->
  <h1>You finished the demo!</h1>

  <section>
    <input type="file" @change="onFileSelected($event)">
    <button @click="upload()">Upload</button>
  </section>
</template>

<script>
import { storage } from '@/firebase';

export default {
  name: 'Done',
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    onFileSelected(e) {
      this.selectedFile = e.target.files[0];
    },
    upload() {
      // adds file to storage, todo: since the name is hardcoded all files will overwrite each other, to prevent this the filenames need to be uid's (you can preserve the original filename in the metadata object in storage if you need it later on)
      const ref = storage.ref().child('feedback/test.png');
      ref.put(this.selectedFile).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
      });
    },
  },
  created() {
    // storage.ref().child('feedback/test.png');
  },
};
</script>

<style>

</style>
