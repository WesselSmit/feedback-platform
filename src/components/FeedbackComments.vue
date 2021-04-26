<template>
  <section class="feedback-comments">
    <h1 v-if="title && hasComments" class="feedback-comments__title">{{ title }}</h1>
    <p v-if="body && hasComments" class="feedback-comments__body">{{ body }}</p>

    <ul class="feedback-comments__list">
      <li v-for="comment in commentsByTime" :key="comment" class="feedback-comments__comment">
        <div class="feedback-comments__comment-meta">
          <Avatar v-if="comment.user" :user="comment.user" size="small" class="feedback-comments__comment-avatar" />
          <div class="feedback-comments__comment-credentials">
            <h3 class="feedback-comments__comment-name">{{ comment.user.name }}</h3>
            <p class="feedback-comments__comment-role">{{ comment.user.role }}</p>
          </div>
        </div>
        <FeedbackImage v-if="comment.image" :imageId="comment.image" />
      {{ comment.text }}
        <div class="feedback-comments__agree-container" @click="handleClick(comment)">
          <AgreeIconZero v-if="!isAgreed(comment)" class="feedback-comments__agree-icon feedback-comments__agree-icon--zero" />
          <AgreeIconActive v-if="isAgreed(comment)" class="feedback-comments__agree-icon feedback-comments__agree-icon--active" />
          <p class="feedback-comments__agree-label" :class="{ 'feedback-comments__agree-label--active': isAgreed(comment) }">{{ isAgreed(comment) ? 'Agreed' : 'Agree' }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

// todo: agree button moet aantal agrees zijn in de 'view' pageMode
//todo: laat marker icoon naast avatar zien als er markers bij de feedback horen
//todo: add hover states aan agree feature
//todo: backgroundcolor sidebar vs documentation
//todo: delete eigen comments feature (heeft geen prioriteit)

<script>
import { mapGetters, mapActions } from 'vuex';
import AgreeIconZero from '@/assets/icons/AgreeIconZero';
import AgreeIconActive from '@/assets/icons/AgreeIconActive';
import Avatar from '@/components/Avatar';
import FeedbackImage from '@/components/FeedbackImage';

export default {
  name: 'FeedbackComments',
  components: {
    AgreeIconZero,
    AgreeIconActive,
    Avatar,
    FeedbackImage,
  },
  props: ['content'],
  computed: {
    ...mapGetters('feedback', {
      comments: 'comments',
    }),
    ...mapGetters('user', {
      userId: 'id',
    }),
    ...mapGetters('project', {
      projectId: 'projectId',
    }),
    commentsByTime() {
      const comments = this.comments; // prevent side effects by by assigning 'this.comments' to 'comments'
      return comments.sort((a, b) => b.ts - a.ts);
    },
    hasComments() {
      return this.commentsByTime.length > 0;
    },
    title() {
      return this.content.title;
    },
    body() {
      return this.content.body;
    },
  },
  methods: {
    ...mapActions('feedback', {
      getComments: 'getComments',
      updateAgrees: 'updateAgrees',
    }),
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
  },
  created() {
    this.getComments(this.projectId);
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

  &__list {
    margin: $space--md 0 0 0;
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
    padding: 0 $space--sm-md;
    line-height: 1.2;

    &:not(:last-of-type) {
      margin-bottom: $space--md;
    }

    &-meta {
      display: flex;
      align-items: center;
      margin-bottom: $space--xsm;
    }

    &-avatar {
      margin: 0 $space--sm 0 0;
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
    }

    &-icon {
      margin-right: $space--sm;

      &--zero {
        fill: $black;
      }

      &--active {
        fill: $purple;
      }
    }

    &-label {
      margin-bottom: 0;
      padding-top: 2px;
      color: $black;
      text-transform: uppercase;

      &--active {
        color: $purple;
      }
    }
  }
}
</style>
