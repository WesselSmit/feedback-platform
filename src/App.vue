<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

// SUPER BELANGRIJK
// todo: er zijn nog errors met de projecten, test alle mogelijkheden (nieuw project: setup, give, view, comments laden, comments posten (incl. image + markers)) --> vgm zijn er hier nu nog mogelijkheden die een error geven
// ! todo: er zijn nog errors met de projecten, test alle mogelijkheden (nieuw project: setup, give, view, comments laden, comments posten (incl. image + markers)) --> vgm zijn er hier nu nog mogelijkheden die een error geven
// * todo: er zijn nog errors met de projecten, test alle mogelijkheden (nieuw project: setup, give, view, comments laden, comments posten (incl. image + markers)) --> vgm zijn er hier nu nog mogelijkheden die een error geven

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: /blueprints/visualisations moet weggehaald worden en images uit firebase storage ophalen
// todo: voeg een favicon toe
// todo: voeg messsages toe aan de route guards (beforeEach)
// todo: loop alle content nog eens door en zorg dat de tips kort, basis niveau engels, toepasbaar en makkelijk te lezen zijn
// todo: de laatste stap van 'setup' moet de progress updaten naar { type: 'view', progress: 1 }

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
