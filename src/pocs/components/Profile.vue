<template>
  <section v-if="user" class="profile">
    <div class="profile__credentials">
        <h3 class="profile__name">{{ name }}</h3>
        <p class="profile__role">{{ role }}</p>
    </div>
    <p class="profile__avatar">{{ initials }}</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
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
    initials() {
      // abort if user has yet to be fetched by checking for empty proxy
      if (Object.keys(this.user).length === 0) return;

      const nameParts = this.user.name.split(' ');
      const hasMultipleParts = nameParts.length > 1;
      const firstNamePart = nameParts[0][0];
      const lastNamePart = nameParts[nameParts.length - 1][0];
      return hasMultipleParts ? `${firstNamePart}${lastNamePart}` : firstNamePart;
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

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: 30px;
    width: 30px;
    background-color: $gray--light; //todo: avatar moet user kleur hebben
    font-size: $font-size--sm-md;
    text-transform: uppercase;
    color: $black;
    border-radius: 50%;
    cursor: default;

    &:empty {
      display: none;
    }
  }
}
</style>
