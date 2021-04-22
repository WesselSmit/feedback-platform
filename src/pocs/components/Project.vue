<template>
  <div class="project">
    <Avatar v-if="name" :name="name" size="large" class="project__avatar" />
    <h2 class="project__owner">{{ name }}</h2>
    <p class="project__title">{{ title }}</p>
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
  },
};
</script>

<style lang="scss">
@import '@/styles';

.project {
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &__avatar {
    margin: $space--sm auto $space--sm-md;
  }

  &__owner {
    margin-bottom: $space--sm;
    color: $black;
    font-size: $font-size--md-lg;
    text-transform: capitalize;
    transition: all 500ms $ease--fast;
  }

  &__title {
    margin-bottom: 0;
    color: $gray--dark;
    font-size: $font-size--md;
    transition: all 500ms $ease--fast;
  }
}
</style>
