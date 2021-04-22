<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <Menu />
      <Profile />
    </div>

    <div class="dashboard__project-container">
      <h1>My documentation pages</h1>
      <div class="dashboard__project-list dashboard__project-list--yours">
        <Project v-for="project in myProjects" :key="project.id" :project="project" />
        <div class="dashboard__project-create" @click="showNameInput()">
          <AddIcon class="dashboard__project-create-icon" />
          <p class="dashboard__project-create-text">Create a new documentation page</p>
        </div>
      </div>

      <h1>Documentation pages shared with you</h1>
      <div class="dashboard__project-list dashboard__project-list--shared">
        <Project v-for="project in sharedProjects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Menu from '@/pocs/components/Menu';
import Profile from '@/pocs/components/Profile';
import Project from '@/pocs/components/Project';
import AddIcon from '@/assets/icons/AddIcon';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    Profile,
    Project,
    AddIcon,
  },
  computed: {
    ...mapGetters('project', {
      projects: 'projects',
      myProjects: 'myProjects',
      sharedProjects: 'sharedProjects',
    }),
  },
  methods: {
    ...mapActions('project', {
      getProjects: 'getProjects',
      addProject: 'addProject',
    }),
    createProject() {
      this.addProject();
    },
  },
  created() {
    this.getProjects();
  },
};
</script>

<style lang="scss">
@import '@/styles';

.dashboard {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__project {
    &-container {
      margin: auto;
      padding: 0 $space--md;
      width: 100%;
      max-width: calc((5 * #{$project-width}) + (4 * #{$space--md} + (2 * #{$space--md}))); // todo: kijk of dit klopt
    }

    &-list {
      display: flex;
      margin-bottom: $space--xl;
    }

    &-create {
      //todo: add hover state
      display: flex;
      flex-direction: column;
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

      &-icon {
        margin: $space--sm auto 40px;
        fill: $black;
        transition: all 500ms $ease--fast;
      }

      &-text {
        margin: 0;
        text-align: center;
        color: $gray--dark;
        transition: all 500ms $ease--fast;
      }
    }
  }
}
</style>
