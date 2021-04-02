<template>
  <section class="feedback-comments">
    <h1 v-if="title" class="feedback-comments__title">{{ title }}</h1>
    <p v-if="body" class="feedback-comments__body">{{ body }}</p>

    <ul class="feedback-comments__list">
      <li v-for="comment in commentsByTime" :key="comment" class="feedback-comments__comment">
        <span class="feedback-comments__comment-meta">
          <span class="feedback-comments__comment-avatar">{{ getInitials(comment.data.user.name) }}</span>
          <span class="feedback-comments__comment-user-text">
            <h3 class="feedback-comments__comment-name">{{ comment.data.user.name }}</h3>
            <span class="feedback-comments__comment-role">{{ comment.data.user.role }}</span>
          </span>
        </span>
        {{ comment.data.text }}
      </li>
    </ul>
  </section>
</template>

//todo: empty state

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FeedbackComments',
  props: ['content'],
  computed: {
    ...mapGetters('feedback', {
      comments: 'comments',
    }),
    projectId() {
      // return 'poc-give-boxing'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
      return 'poc-give-twitter'; // todo: projectId moet uit database komen (is nu hardcoded voor POC)
    },
    commentsByTime() {
      return [...this.comments].sort((a, b) => b.data.ts - a.data.ts);
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
    }),
    getInitials(name) {
      const nameParts = name.split(' ');
      const hasMultipleParts = nameParts.length > 1;
      const firstNamePart = nameParts[0][0];
      const lastNamePart = nameParts[nameParts.length - 1][0];
      return hasMultipleParts ? `${firstNamePart}${lastNamePart}` : firstNamePart;
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
  &__title,
  &__body {
    padding: 0 $space--sm-md;
  }

  &__list {
    margin: $space--md 0 0 0;
    list-style: none;

    //todo: add empty state
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
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: $space--sm;
      height: 24px;
      width: 24px;
      background-color: $gray--light;
      font-size: $font-size--sm;
      text-transform: uppercase;
      color: $black;
      border-radius: 50%;
      cursor: default;
    }

    &-user-text {
      display: flex;
      align-items: baseline;
    }

    &-name {
      margin-bottom: 0;
      margin-right: $space--sm;
    }

    &-role {
      color: $gray--dark;
      font-size: $font-size--sm;
    }
  }
}
</style>
