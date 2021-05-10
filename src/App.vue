<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

// todo: wanneer de gebruiker naar Project in 'view' mode gaat moet alle documentatie altijd zichtbaar zijn. Dit is niet het geval als je een 'give' Project in gaat en terug gaat naar het Dashboard in een state waar de visualisation of documentation verstopt is --> om dit te voorkomen moet de sidebar state volledig gereset worden wanneer de gebruiker in Dashboard.vue komt

// todo: FeedbackInput verdwijnt uit beeld wanneer gebruiker aan het typen is
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
