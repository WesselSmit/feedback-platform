<template>
  <div class="avatar" :class="{ 'avatar__avatar--small': isSmall, 'avatar__avatar--large': isLarge }">
    <p class="avatar__avatar" :class="{ 'avatar__avatar--small': isSmall, 'avatar__avatar--large': isLarge, 'avatar__avatar--cursor': cursor }"
    :style="{ 'background-color': avatarColor }">{{ initials }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Avatar',
  props: ['user', 'size', 'cursor'],
  data() {
    return {
      avatarColor: null,
    };
  },
  computed: {
    initials() {
      // abort if user has yet to be fetched by checking for empty proxy
      if (Object.keys(this.user).length === 0) return;

      const nameParts = this.user.name.split(' ');
      const hasMultipleParts = nameParts.length > 1;
      const firstNamePart = nameParts[0][0];
      const lastNamePart = nameParts[nameParts.length - 1][0];
      return hasMultipleParts ? `${firstNamePart}${lastNamePart}` : firstNamePart;
    },
    isSmall() {
      return this.size === 'small';
    },
    isLarge() {
      return this.size === 'large';
    },
  },
  methods: {
    ...mapActions('user', {
      getColorHex: 'getColorHex',
    }),
  },
  async mounted() {
    this.avatarColor = await this.getColorHex(this.user.color);
  },
};
</script>

<style lang="scss">
@import '@/styles';

.avatar {
  height: 30px;

  &--small {
    height: 24px;
  }

  &--large {
    height: 58px;
  }

  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    margin: 0;
    background-color: $gray--light;
    font-size: $font-size--sm-md;
    text-transform: uppercase;
    color: $black;
    border-radius: 50%;
    cursor: default;

    &:empty {
      display: none;
    }

    &--cursor {
      cursor: pointer;
    }

    &--small {
      height: 24px;
      width: 24px;
      font-size: $font-size--sm;
    }

    &--large {
      height: 58px;
      width: 58px;
      font-size: $font-size--lg;
    }
  }
}
</style>
