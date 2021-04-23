<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

<script>

// todo: deel de componenten in mappen op + haal ze uit de 'pocs' map + gebruik altijd '@/components' voor imports (ipv './')

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: alle blueprints/visualisation moeten weg + give-boxing.js moet hernoemt worden
// todo: voeg een favicon toe

import { mapGetters } from 'vuex';
import Message from '@/pocs/components/Message';

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

.slide-vertical-enter-from,
.slide-vertical-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.slide-vertical-enter-active {
  transition: transform 200ms ease-in-out, opacity 350ms ease-in-out;
}

.slide-vertical-leave-active {
  transition: transform 200ms ease-in-out, opacity 350ms ease-in-out;
}
</style>
