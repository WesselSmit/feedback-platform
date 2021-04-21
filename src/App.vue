<template>
  <Navigation v-if="isLoggedIn()" />
  <router-view />

  <div v-if="isLoggedIn()">
    <p>obj: {{ this.user }}</p>
    <p>User: {{ this.user.name }}</p>
    <p>Role: {{ this.userRole }}</p>
    <p>Group: {{ this.userGroup }}</p>
    <p>Uid: {{ this.id }}</p>
  </div>

  <transition name="slide-vertical">
    <Message v-if="message" />
  </transition>
</template>

<script>
// todo: make sure the firebase storage + firestore security rules are secure, they were disabled for the POCs (see clickup for more info)
//* elk project heeft een eigen collection in de firestore, de documenten in deze collection

// todo: alle blueprints/visualisation moeten weg + give-boxing.js moet hernoemt worden
// todo: voeg een favicon toe

import { mapGetters, mapActions } from 'vuex';
import Navigation from '@/components/Navigation';
import Message from '@/pocs/components/Message';

export default {
  components: {
    Navigation,
    Message,
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
      userRole: 'role',
      userGroup: 'group',
      id: 'id',
      hasBeenFetched: 'hasBeenFetched',
    }),
    ...mapGetters('message', {
      message: 'message',
    }),
  },
  methods: {
    ...mapActions('user', {
      isUserLoggedIn: 'isUserLoggedIn',
    }),
    async isLoggedIn() {
      // todo: check of ze allebei werken (en zo ja, waarom? als je ze logged, returnen ze dan hetzelfde?)
      // todo: je moet een oplossing vinden voor de isLoggedIn() in de template, deze kloppen nu nog niet want ze zijn altijd zichtbaar
      // return await this.isUserLoggedIn();
      return this.user;
    },
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
