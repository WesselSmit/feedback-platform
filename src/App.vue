<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

<script>

// todo: 'Done' component kan weg --> dashboard + message
// todo: deel de componenten in mappen op + haal ze uit de 'pocs' map + gebruik altijd '@/components' voor imports (ipv './')

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: alle blueprints/visualisation moeten weg + give-boxing.js moet hernoemt worden
// todo: voeg een favicon toe

import { mapGetters } from 'vuex';
import Message from '@/components/Message';

export default {
  name: 'App',
  components: {
    Message,
  },
  computed: {
    ...mapGetters('message', {
      message: 'message',
    }),
  },
};
</script>

<style lang="scss">
@import '@/styles';
</style>
