<template>
  <div class="project-card" :class="{ 'project-card--wip': !isSetup }" @click="navigateToProject()">
    <Avatar v-if="user" :user="user" :cursor="isSetup" size="large" class="project-card__avatar" />
    <h2 class="project-card__owner">{{ name }}</h2>
    <p class="project-card__title" :class="{ 'project-card__title--small' : hasLongText }">{{ title }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Avatar from '@/components/Avatar';

export default {
  name: 'ProjectCard',
  props: ['project', 'isSetup'],
  components: {
    Avatar,
  },
  computed: {
    user() {
      return this.project.data.owner;
    },
    name() {
      return this.project.data.owner.name;
    },
    title() {
      return this.project.data.title;
    },
    projectId() {
      return this.project.id;
    },
    hasLongText() {
      const titleTreshold = 45;
      return this.title.length >= titleTreshold;
    },
  },
  methods: {
    ...mapActions('message', {
      message: 'message',
    }),
    navigateToProject() {
      if (this.isSetup) {
        this.$router.push(`/project/${this.projectId}`);
      } else {
        this.message({ message: 'Project is not completely set up yet', mode: 'error' });
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/styles';

.project-card {
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: $space--sm-md;
  width: $project-width;
  height: $project-height;
  background-color: $white;
  border: $border--ui;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all 500ms $ease--fast, padding 0ms, border-width 0ms;

  &:hover {
    padding: calc(#{$space--sm-md - 1px}); // becuase the border-width increases with 1px, the padding needs to decrease 1px
    background-color: $purple--opacity;
    border-color: $purple;
    border-width: 2px;
  }

  &:hover & {
    &__owner,
    &__title {
      color: $purple;
    }
  }

  &--wip {
    filter: grayscale(1);
    cursor: not-allowed;

    &:hover {
      background-color: $gray--dark-opacity;
      border-color: $gray--dark;
    }

    &:hover & {
      &__owner,
      &__title {
        color: $gray--dark;
      }
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
    font-size: $font-size--md;
    text-align: center;
    transition: all 500ms $ease--fast;

    &--small {
      font-size: $font-size--sm;
    }
  }
}
</style>
