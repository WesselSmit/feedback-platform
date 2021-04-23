<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

<script>

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: alle blueprints/visualisation moeten weg + give-boxing.js moet hernoemt worden & hernoem blueprints/ naar content/
// todo: voeg een favicon toe

/*
  todo: PROGRESS
  1. je opent een project
  2. heb je permissie om dit project te bekijken (zit je in het groepje van het project? ben je admin/docent/expert?)
  3. ben je owner ? setup/edit/inzien : give ==> deze data staat in de projects collection
  4. setup/edit || give ? get progress : start ==> deze data moet nog in de project collection komen

  de progress moet aangemaakt als je wel permissie hebt maar nog nooit het project bekeken hebt

  als de bovenstaande functie werkt dan moeten de volgende dingen gebeuren:
  - hardcoded projectId in computed moeten dynamisch worden (ophalen uit store)
  - alle buttons moeten de progress updaten (let op dit moet in meer components dan alleen NavigationButtons vervangen worden)
  - in de SidebarStore moet 'stepIndex' uit de DB komen
*/

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
