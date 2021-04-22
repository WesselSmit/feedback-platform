<template>
  <div class="project">
    <Avatar v-if="name" :name="name" size="large" class="project__avatar" />
    <h2 class="project__owner">{{ name }}</h2>
    <p class="project__title" :class="{ 'project__title--small' : hasLongText }">{{ title }}</p>
  </div>
</template>

<script>
import Avatar from '@/pocs/components/Avatar';

export default {
  name: 'Project',
  props: ['project'],
  components: {
    Avatar,
  },
  computed: {
    name() {
      return this.project.data.owner.name;
    },
    title() {
      return this.project.data.title;
    },
    hasLongText() {
      const titleTreshold = 60;
      return this.title.length >= titleTreshold;
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.project {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px 15px;
  padding: $space--sm-md;
  width: $project-width;
  height: $project-height;
  background-color: $white;
  border: $border--ui;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all 500ms $ease--fast;

  &:hover {
    background-color: $purple--opacity;
    border-color: $purple;
  }

  &:hover & {
    &__owner,
    &__title {
      color: $purple;
    }
  }

  &__avatar {
    margin: $space--sm auto $space--sm-md;
  }

  &__owner {
    margin-bottom: $space--xsm;
    color: $black;
    font-size: $font-size--md-lg;
    text-transform: capitalize;
    text-align: center;
    transition: all 500ms $ease--fast;
  }

  &__title {
    margin-bottom: 0;
    color: $gray--dark;
    font-size: $font-size--sm-md;
    text-align: center;
    transition: all 500ms $ease--fast;

    &--small {
      font-size: $font-size--sm;
    }
  }
}
</style>
