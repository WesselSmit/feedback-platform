<template>
  <section v-if="user" class="profile">
    <div class="profile__credentials">
        <h3 class="profile__name">{{ name }}</h3>
        <p class="profile__role">{{ role }}</p>
    </div>
    <Avatar v-if="name" :name="name" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Avatar from './Avatar';

export default {
  name: 'Profile',
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters('user', {
      user: 'user',
    }),
    name() {
      // abort if user has yet to be fetched by checking for empty proxy
      if (Object.keys(this.user).length === 0) return;
      return this.user.name;
    },
    role() {
      // abort if user has yet to be fetched by checking for empty proxy
      if (Object.keys(this.user).length === 0) return;
      return this.user.role;
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import '@/styles';

.profile {
  display: flex;
  max-width: max-content;
  height: min-content;
  padding: $space--xsm $space--sm;
  cursor: default;

  &__credentials {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: $space--sm;
  }

  &__name {
    margin: 0;
    text-transform: capitalize;
    font-size: $font-size--sm-md;
  }

  &__role {
    margin: 0;
    text-transform: capitalize;
    font-size: $font-size--sm;
  }
}
</style>
