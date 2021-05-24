<template>
  <router-view />

  <transition name="message">
    <Message v-if="message && !hidePopUp" />
  </transition>
</template>

// todo: progressbar klopt niet helemaal --> de eerste stap moet geen progressie hebben
// todo (documenteer in PB --> niet coderen): vanaf 'view' moet er een knop zijn om terug te gaan naar setup (als die er is moet het teruggaan naar de edit/preview pagina, als die er niet is dan moet het terug naar stap 1)
// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)

<script>
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
    hidePopUp() {
      return this.message.hidePopUp;
    },
  },
};
</script>
