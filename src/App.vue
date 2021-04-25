<template>
  <router-view />

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
// todo: /blueprints/visualisations moet weggehaald worden en images uit firebase storage ophalen
// todo: voeg een favicon toe
// todo: voeg messsages toe aan de route guards (beforeEach)
// todo: de laatste stap van 'setup' moet de progress updaten naar { type: 'view', progress: 1 }

<script>

/*
  todo: PROGRESS
  X 1. je opent een project
  X 2. heb je permissie om dit project te bekijken (zit je in het groepje van het project? ben je admin/docent/expert?)
  X 3. ben je owner ? setup/edit/inzien : give ==> deze data staat in de projects collection --> latere update: dit gebeurt in het Project.vue component
  X 4. setup/edit || give ? get progress : start ==> deze data moet nog in de project collection komen --> latere update: dit gebeurt in het Project.vue component

  X de progress moet aangemaakt als je wel permissie hebt maar nog nooit het project bekeken hebt

  als de bovenstaande functie werkt dan moeten de volgende dingen gebeuren:
  - hardcoded projectId in computed moeten dynamisch worden (ophalen uit store)
  X - alle buttons moeten de progress updaten (let op dit moet in meer components dan alleen NavigationButtons vervangen worden)
  X - in de SidebarStore moet 'stepIndex' uit de DB komen
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
