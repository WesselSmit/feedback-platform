<template>
  <section class="dashboard">
    <div class="dashboard__header">
      <Menu :hasLogout="true" />
      <Profile />
    </div>

    <div class="dashboard__project-container">
      <h1 class="dashboard__project-title">My documentation pages</h1>
      <div class="dashboard__project-list">
        <ProjectCard v-for="project in myProjectsSorted" :key="project.id" :project="project" isSetup="true" />
        <div class="dashboard__project-create" @click="togglePopUp()">
          <AddIcon class="dashboard__project-create-icon" />
          <p class="dashboard__project-create-text">Create a new documentation page</p>
        </div>
      </div>

      <h1 class="dashboard__project-title">Documentation pages shared with you</h1>
      <div class="dashboard__project-list">
        <ProjectCard v-for="project in sharedProjectsSorted" :key="project.id" :project="project" :isSetup="projectIsCompletelySetup(project.data)" />
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
import Menu from '@/components/Menu';
import Profile from '@/components/Profile';
import ProjectCard from '@/components/ProjectCard';
import AddIcon from '@/assets/icons/AddIconBig';

export default {
  name: 'Dashboard',
  components: {
    Menu,
    Profile,
    ProjectCard,
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
    myProjectsSorted() { // sort projects newest first
      const projects = this.myProjects; // prevent side effects by by assigning 'this.myPojects' to 'projects'
      return projects.sort((a, b) => b.data.ts - a.data.ts);
    },
    sharedProjectsSorted() { // sort projects newest first
      const projects = this.sharedProjects; // prevent side effects by by assigning 'this.sharedProjects' to 'projects'
      return projects.sort((a, b) => b.data.ts - a.data.ts);
    },
  },
  methods: {
    ...mapActions('project', {
      getProjects: 'getProjects',
      addProject: 'addProject',
    }),
    ...mapActions('message', {
      message: 'message',
    }),
    projectIsCompletelySetup(project) {
      const necessaryDocumentationContent = !!((project.visualisation && project.explanation && project.questions.length > 0));
      return necessaryDocumentationContent;
    },
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

    setTimeout(() => {
      this.getProjects(); // get projects again (is necessary if the user has just completed setting up a project to make sure the projects are up to date)
    }, 1000);
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
      margin-bottom: 0;
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
      width: $button-width;
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
