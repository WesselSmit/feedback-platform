<template>
  <div class="avatar">
    <p class="avatar__avatar">{{ initials }}</p>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: ['name'],
  computed: {
    initials() {
      const nameParts = this.name.split(' ');
      const hasMultipleParts = nameParts.length > 1;
      const firstNamePart = nameParts[0][0];
      const lastNamePart = nameParts[nameParts.length - 1][0];
      return hasMultipleParts ? `${firstNamePart}${lastNamePart}` : firstNamePart;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.avatar {
  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    margin: 0;
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
