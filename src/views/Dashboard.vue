<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <Menu />
      <Profile />
    </div>

    <div class="dashboard__project-container">
      <h1 class="dashboard__project-title">My documentation pages</h1>
      <div class="dashboard__project-list">
        <Project v-for="project in myProjects" :key="project.id" :project="project" />
        <div class="dashboard__project-create" @click="togglePopUp()">
          <AddIcon class="dashboard__project-create-icon" />
          <p class="dashboard__project-create-text">Create a new documentation page</p>
        </div>
      </div>

      <h1 class="dashboard__project-title">Documentation pages shared with you</h1>
      <div class="dashboard__project-list">
        <Project v-for="project in sharedProjects" :key="project.id" :project="project" />
      </div>
    </div>
  </section>

  <div v-if="showProjectInput" class="dashboard__pop-up">
    <div class="dashboard__pop-up-inner">
      <h1 class="dashboard__pop-up-title">Enter a title</h1>
      <p class="dashboard__pop-up-body">Give your documentation page a title that informs others about your topic doesn't spoil the conclusions.</p>
      <input class="dashboard__pop-up-input" v-model.trim="projectTitle" type="text" placeholder="Enter a title" autocomplete="off" autofocus @keyup.enter="createProject()">

      <div class="dashboard__pop-up-buttons">
        <button class="dashboard__pop-up-button" @click="togglePopUp()">Cancel</button>
        <button type="submit" class="dashboard__pop-up-button dashboard__pop-up-button--outline" @click="createProject()">Create</button>
      </div>
    </div>
  </div>
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
  data() {
    return {
      showProjectInput: false,
      projectTitle: '',
    };
  },
  computed: {
    ...mapGetters('project', {
      myProjects: 'myProjects',
      sharedProjects: 'sharedProjects',
    }),
  },
  methods: {
    ...mapActions('project', {
      getProjects: 'getProjects',
      addProject: 'addProject',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    togglePopUp() {
      this.showProjectInput = !this.showProjectInput;

      if (!this.showProjectInput) {
        this.projectTitle = '';
      }
    },
    createProject() {
      if (this.projectTitle) {
        this.addProject(this.projectTitle);
      } else {
        this.message({ message: 'Enter a title' });
      }
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
      max-width: calc((5 * #{$project-width}) + (5 * #{$space--md} + (2 * #{$space--md}))); // 5x width of project + 5x project margin + 2x project list padding
    }

    &-title {
      padding: 0 15px;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: $space--lg;

      &:empty {
        display: grid;
        place-content: center;
        margin: $space--xl 0;
        padding: 0 15px;
        width: 100%;

        &::after {
          content: "No documentation pages have been shared with you yet.";
          display: block;
          margin: auto;
          color: $gray--dark;
        }
      }
    }

    &-create {
      display: flex;
      flex-direction: column;
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
        &-icon {
          fill: $purple;
        }

        &-text {
          color: $purple;
        }
      }

      &-icon {
        margin: $space--sm auto 45px;
        fill: $black;
        transition: all 500ms $ease--fast;
      }

      &-text {
        margin: 0;
        color: $gray--dark;
        font-size: $font-size--md;
        text-align: center;
        transition: all 500ms $ease--fast;
      }
    }
  }

  &__pop-up {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background-color: $white--overlay;

    &-inner {
      @include zoomIn(300ms, $ease--fast);
      width: $popup-width--small;
      padding: $space--sm-md;
      background-color: $white;
      border: $border--ui;
      border-radius: $border-radius;
    }

    &-input {
      padding: $space--xsm;
      width: 100%;
      font-size: $font-size--md;
      border: 1px solid $black;
      border-radius: $border-radius;
    }

    &-buttons {
      display: flex;
      justify-content: space-between;
    }

    &-button {
      display: block;
      margin: $space--lg 0 0 0;
      height: $button-height;
      width: 150px;
      background-color: $white;
      color: $purple;
      text-transform: uppercase;
      border: 1px solid transparent;
      border-radius: $border-radius;
      transition: background-color 500ms $ease--fast;
      cursor: pointer;

      &:hover {
        background-color: $purple--opacity;
      }

      &--outline {
        border: $border--button;
      }
    }
  }
}
</style>
