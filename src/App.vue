<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: voeg messsages toe aan de route guards (beforeEach)
// todo: loop alle content nog eens door en zorg dat de tips kort, basis niveau engels, toepasbaar en makkelijk te lezen zijn
// todo: of SetupIterations component maken OF SetupIterations stap uit setup.js halen
// todo: de laatste stap van 'setup' moet de progress updaten naar { type: 'view', progress: 1 } --> zie eerst de bovenstaande TODO

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
  },
};
</script>
