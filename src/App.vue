<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

// todo: als ik bij insights op next klik update de sidebar niet
// todo: loop alle content nog eens door en zorg dat de tips kort, basis niveau engels, toepasbaar en makkelijk te lezen zijn

// todo: progressbar klopt niet helemaal --> de eerste stap moet geen progressie hebben
// todo: vanaf 'view' moet er een knop zijn om terug te gaan naar setup (als die er is moet het teruggaan naar de edit/preview pagina, als die er niet is dan moet het terug naar stap 1)
// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: voeg messsages toe aan de route guards (beforeEach)

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
