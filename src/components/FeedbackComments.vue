<template>
  <section class="feedback-comments">
    <h1 v-if="title && hasComments" class="feedback-comments__title">{{ title }}</h1>
    <p v-if="body && hasComments" class="feedback-comments__body">{{ body }}</p>

    <div v-if="hasComments" class="feedback-comments__filter-container">
      <div class="feedback-comments__filter-header" @click="toggleFilterVisibility">
        <FilterIcon class="feedback-comments__filter-icon" />
        <p class="feedback-comments__filter-label">showing <span class="feedback-comments__filter-label-highlight">"{{ activeFilter }}"</span> comments.</p>
      </div>

      <form class="feedback-comments__filter-options" :class="{ 'feedback-comments__filter-options--collapsed': !showFilterOptions }">
        <fieldset class="feedback-comments__filter-option">
          <input type="radio" name="filter-option" checked :id="`filter-option--default`" :value="defaultFilterOption" class="feedback-comments__filter-option-input" v-model="activeFilter">
          <label :for="`filter-option--default`" class="feedback-comments__filter-option-label">All</label>
        </fieldset>

        <fieldset v-for="(step, index) in feedbackSteps" :key="step" class="feedback-comments__filter-option">
          <input type="radio" name="filter-option" :id="`filter-option--${index}`" :value="step.content.readInstructions.title" class="feedback-comments__filter-option-input" v-model="activeFilter">
          <label :for="`filter-option--${index}`" class="feedback-comments__filter-option-label">{{ step.content.readInstructions.title }}</label>
        </fieldset>
      </form>
    </div>

    <ul class="feedback-comments__list">
      <li v-for="comment in comments" :key="comment" class="feedback-comments__comment" :data-comment-id="comment.id">
        <div class="feedback-comments__comment-meta">
          <Avatar v-if="comment.user" :user="comment.user" size="small" class="feedback-comments__comment-avatar" />
          <MarkerIcon v-if="comment.markers.length > 0" :color="comment.user.color" :showColor="true" class="feedback-comments__comment-marker" @markerClick="highLighMarkers(comment)" />
          <div class="feedback-comments__comment-credentials">
            <h3 class="feedback-comments__comment-name">{{ comment.user.name }}</h3>
            <p class="feedback-comments__comment-role">{{ comment.user.role }}</p>
          </div>
        </div>

        <FeedbackImage v-if="comment.image" :imageId="comment.image" />
        {{ comment.text }}

        <div v-if="!isOwner" class="feedback-comments__agree-container" @click="handleClick(comment)">
          <AgreeIconZero v-if="!isAgreed(comment)" class="feedback-comments__agree-icon feedback-comments__agree-icon--zero" />
          <AgreeIconActive v-if="isAgreed(comment)" class="feedback-comments__agree-icon feedback-comments__agree-icon--active" />
          <p class="feedback-comments__agree-label" :class="{ 'feedback-comments__agree-label--active': isAgreed(comment) }">{{ isAgreed(comment) ? 'Agreed' : 'Agree' }}</p>
        </div>

        <div v-else-if="isOwner && comment.agrees.length > 0" class="feedback-comments__agrees-container">
          <AgreeIconActive class="feedback-comments__agrees-icon" />
          <p class="feedback-comments__agrees-label">{{ comment.agrees.length }} {{ comment.agrees.length === 1 ? 'person' : 'people' }} agreed</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FilterIcon from '@/assets/icons/FilterIcon';
import GiveBluebrint from '@/blueprints/give';
import Avatar from '@/components/Avatar';
import MarkerIcon from '@/assets/icons/OverlayMarkerIcon';
import FeedbackImage from '@/components/FeedbackImage';
import AgreeIconZero from '@/assets/icons/AgreeIconZero';
import AgreeIconActive from '@/assets/icons/AgreeIconActive';

export default {
  name: 'FeedbackComments',
  components: {
    FilterIcon,
    Avatar,
    MarkerIcon,
    FeedbackImage,
    AgreeIconZero,
    AgreeIconActive,
  },
  props: ['content'],
  data() {
    return {
      previousHighlightedMarkerId: null,
      showFilterOptions: false,
      activeFilter: 'All',
    };
  },
  computed: {
    ...mapGetters('feedback', {
      projectComments: 'comments',
    }),
    ...mapGetters('user', {
      userId: 'id',
    }),
    ...mapGetters('project', {
      projectId: 'projectId',
      owner: 'owner',
    }),
    defaultFilterOption() {
      return 'All';
    },
    feedbackSteps() {
      return GiveBluebrint.steps.filter((step) => step.content.readInstructions);
    },
    normalisedFilterOptionLabels() {
      return this.feedbackSteps.map((step) => step.content.readInstructions.title);
    },
    hasComments() {
      return this.projectComments.length > 0;
    },
    comments() {
      const comments = this.isOwner ? this.commentsByAgrees : this.commentsByTime;

      if (this.activeFilter !== this.defaultFilterOption) {
        return comments.filter((comment) => this.normalisedFilterOptionLabels[comment.step - 2] === this.activeFilter);
      }
      return comments;
    },
    commentsByAgrees() {
      const comments = this.projectComments; // prevent side effects by by assigning 'this.comments' to 'comments'
      return comments.sort((a, b) => b.agrees.length - a.agrees.length);
    },
    commentsByTime() {
      const comments = this.projectComments; // prevent side effects by by assigning 'this.comments' to 'comments'
      return comments.sort((a, b) => b.ts - a.ts);
    },
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
    isOwner() {
      return this.owner === this.userId;
    },
  },
  methods: {
    ...mapActions('feedback', {
      getComments: 'getComments',
      updateAgrees: 'updateAgrees',
    }),
    ...mapActions('project', {
      getProgress: 'getProgress',
    }),
    toggleFilterVisibility() {
      this.showFilterOptions = !this.showFilterOptions;
    },
    getInitials(name) {
      const nameParts = name.split(' ');
      const hasMultipleParts = nameParts.length > 1;
      const firstNamePart = nameParts[0][0];
      const lastNamePart = nameParts[nameParts.length - 1][0];
      return hasMultipleParts ? `${firstNamePart}${lastNamePart}` : firstNamePart;
    },
    handleClick(comment) {
      this.updateAgrees({ projectId: this.projectId, commentId: comment.id });
    },
    isAgreed(comment) {
      return comment.agrees.some((id) => id === this.userId);
    },
    highLighMarkers(comment) {
      if (comment.id !== this.previousHighlightedMarkerId) { // this condition allows the user to click the comment-marker icon (next to the avatar) again to stop the highlighted markers from 'glowing' / being highlighted
        const highlightedMarkers = document.querySelectorAll('.visualisation__marker--is-highlighted');
        highlightedMarkers.forEach((marker) => marker.classList.remove('visualisation__marker--is-highlighted'));
      }

      const markers = document.querySelectorAll(`.visualisation__marker[data-marker-id='${comment.id}']`);
      markers.forEach((marker) => marker.classList.toggle('visualisation__marker--is-highlighted'));

      this.previousHighlightedMarkerId = comment.id;
    },
  },
  watch: {
    activeFilter() {
      this.showFilterOptions = false;
    },
  },
  async created() {
    this.getComments(this.projectId);

    const progressObj = await this.getProgress();
    this.activeFilter = progressObj.type === 'give' ? this.normalisedFilterOptionLabels[progressObj.progress - 2] : this.defaultFilterOption; // '-2' is to compensate for: index starting at 0 and progressObj.progress also contains 'insight' step while this step is removed out from this.normalisedFilterOptionLabels/feedbackSteps

    // if filtered comments are empty --> show 'All' (non-filtered) comments
    if (this.comments.length === 0 && this.hasComments) {
      this.activeFilter = this.defaultFilterOption;
    }
  },
};
</script>

<style lang="scss">
@import '@/styles';

.feedback-comments {
  width: $sidebar-width;

  &__title,
  &__body {
    padding: 0 $space--sm-md;
  }

  &__filter {
    &-container {
      padding: 0 $space--sm-md;
    }

    &-header {
      display: flex;
      cursor: pointer;

      &:hover {
        .feedback-comments__filter {
          &-icon {
            fill: $purple;
          }

          &-label {
            color: $purple;
          }
        }
      }
    }

    &-icon {
      margin-right: $space--sm;
      fill: $black;
    }

    &-label {
      margin-bottom: 0;
      color: $black;
      font-size: $font-size--md;
      text-transform: lowercase;

      &-highlight {
        color: $purple;
      }
    }

    &-options {
      overflow: hidden;
      max-height: 200px; // is needed for the height transition (set the max-height to something bigger than the element will ever be)
      transition: max-height 350ms ease;

      &--collapsed {
        max-height: 0;
      }
    }

    &-option {
      display: flex;

      &-input {
        display: none;

        &:checked + label {
          color: $purple;
          background-color: $purple--opacity;
          cursor: default;

          &::before {
            opacity: 1;
            color: $purple;
          }
        }
      }

      &-label {
        display: flex;
        margin: $space--xsm 0 0;
        padding-left: $space--xsm;
        width: 100%;
        color: $black;
        border: 1px solid transparent;
        border-radius: $border-radius;
        cursor: pointer;
        transition: all 350ms $ease--fast;

        &::before {
          content: ">";
          display: block;
          margin: 0 $space--sm 0 4px;
          opacity: 0;
          color: $gray--dark;
          transition: opacity 350ms $ease--fast;
        }

        &:hover {
          color: $purple;

          &::before {
            opacity: 1;
            color: $purple;
          }
        }
      }
    }
  }

  &__list {
    margin: calc(#{$space--md} / 2) 0 0 0; // calc(#{$space--md} / 2) is to compensate for the padding (top) that the comments have
    list-style: none;

    &:empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: $sidebar-width;
      height: calc(#{100vh} - (2 * #{$space--lg}));
      margin: auto;
      padding: 0 $space--lg;

      &::before {
        content: "No feedback found.";
        display: block;
        margin: 0 auto $space--sm;
        font-size: $font-size--xl;
        font-family: $font;
        color: $black;
        text-align: center;
      }

      &::after {
        content: "Everyone's feedback will be visible here.";
        display: block;
        margin: 0 auto;
        text-align: center;
      }
    }
  }

  &__comment {
    display: flex;
    flex-direction: column;
    padding: calc(#{$space--md / 2}) $space--sm-md;
    line-height: 1.2;
    transition: background-color 500ms ease-in-out;

    &--highlighted {
      background-color: $purple--opacity;
    }

    &-meta {
      display: flex;
      align-items: center;
      margin-bottom: $space--xsm;
    }

    &-avatar + .feedback-comments__comment-credentials {
      margin-left: $space--sm;
    }

    &-marker {
      margin-left: -16px;
      padding-top: 3px;
      cursor: pointer;
    }

    &-credentials {
      display: flex;
      align-items: baseline;
    }

    &-name {
      margin-bottom: 0;
      margin-right: $space--sm;
      text-transform: capitalize;
    }

    &-role {
      margin: 0;
      color: $gray--dark;
      font-size: $font-size--sm;
      text-transform: capitalize;
    }
  }

  &__agree {
    &-container {
      display: flex;
      align-items: center;
      margin-top: $space--xsm;
      cursor: pointer;

      &:hover {
        .feedback-comments__agree {
          &-icon {
            fill: $purple;
          }

          &-label {
            color: $purple;
          }
        }
      }
    }

    &-icon {
      margin-right: $space--sm;

      &--zero {
        fill: $black;
      }
    }

    &-label {
      margin-bottom: 0;
      padding-top: 2px;
      color: $black;
      text-transform: uppercase;
    }
  }

  &__agrees {
    &-container {
      display: flex;
      align-items: center;
      margin-top: $space--xsm;
    }

    &-icon {
      margin-right: $space--sm;
      fill: $black;
    }

    &-label {
      margin-bottom: 0;
      color: $black;
      text-transform: uppercase;
    }
  }
}
</style>
